import axios from "axios";
import cron from "node-cron";
import Twilio from "twilio";

// ---- REQUIRED ENV VARS (define it!)
const required = [
  "UW_TOKEN",
  "TWILIO_ACCOUNT_SID",
  "TWILIO_AUTH_TOKEN",
  "TWILIO_FROM",
  "TO_NUMBER",
];

// ---- DEBUG (prints only keys/names, no secrets)
console.log(
  "ENV HAS TWILIO_ACCOUNT_SID?",
  Object.prototype.hasOwnProperty.call(process.env, "TWILIO_ACCOUNT_SID")
);
console.log(
  "ENV KEYS (sample):",
  Object.keys(process.env).filter((k) => k.includes("TWILIO") || k.includes("UW")).sort()
);

// ---- FAIL FAST
for (const k of required) {
  if (!process.env[k]) {
    console.error("Missing env var:", k);
    process.exit(1);
  }
}

const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const UW_URL = "https://api.unusualwhales.com/api/option-trades/flow-alerts";

async function getMarketCap(symbol) {
  const res = await axios.get(
    `https://financialmodelingprep.com/api/v3/profile/${symbol}`,
    { params: { apikey: process.env.FMP_KEY } }
  );
  return res.data?.[0]?.mktCap || null;
}

async function poll() {
  try {
    const res = await axios.get(UW_URL, {
  headers: { Authorization: `Bearer ${process.env.UW_TOKEN}` },
  params: { limit: 100 }
});

    const alerts = res.data?.data || [];

    for (const a of alerts) {
      const premium = Number(a.premium || 0);
      if (premium < Number(MIN_PREMIUM)) continue;

      const symbol = a.symbol;
      const mc = await getMarketCap(symbol);
      if (!mc || mc > Number(SMALL_CAP_MAX)) continue;

      const message = `${symbol} ${a.option_type} ${a.strike} ${a.expiration}
Premium: $${premium.toLocaleString()}
MC: $${Math.round(mc/1e6)}M`;

      await client.messages.create({
        from: TWILIO_FROM,
        to: TO_NUMBER,
        body: message
      });
    }
  } catch (e) {
    console.log(e.message);
  }
}

cron.schedule("*/2 * * * *", poll);
poll();
