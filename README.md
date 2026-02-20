📈 UW Small Cap SMS Bot

A real-time Node.js bot that monitors unusual small-cap options flow and instantly sends qualifying alerts directly to your phone via SMS.

Built for traders who want small cap unusual activity delivered immediately — without staring at dashboards all day.

🚀 What It Does

This bot:

Connects to the Unusual Whales flow alerts API

Filters for:

Small-cap stocks (market cap below a configurable threshold)

Large premium trades (above a configurable minimum)

Pulls live market cap data

Instantly sends a formatted SMS alert via Twilio

Runs continuously in the cloud (Railway-ready)

If a qualifying trade hits, you get a text immediately.

📲 Example SMS Alert
NVTS CALL 5.00 03/15/2026
Premium: $145,000
MC: $420M
🧠 How It Works

Polls Unusual Whales flow alerts endpoint on a schedule

Filters by:

Minimum premium

Maximum market cap

Fetches live market cap data

Sends SMS alert through Twilio API

Runs every few minutes via cron scheduler

⚙️ Environment Variables Required

Set these in Railway (or your hosting provider):

Unusual Whales

UW_TOKEN — Your Unusual Whales API token

Twilio

TWILIO_ACCOUNT_SID

TWILIO_AUTH_TOKEN

TWILIO_FROM — Your Twilio phone number

TO_NUMBER — Your personal phone number

Optional Filters

MIN_PREMIUM (default: 25000)

SMALL_CAP_MAX (default: 2000000000)

🛠 Tech Stack

Node.js (ES Modules)

Axios

node-cron

Twilio API

Railway deployment

☁️ Deployment

Designed to deploy easily via:

GitHub

Railway

Any Node-compatible cloud platform

Push to GitHub → Railway auto-deploys → Bot runs 24/7.

🔒 Security

All API keys are stored as environment variables.
No secrets are stored in the repository.

🎯 Who This Is For

Small cap traders

Options flow traders

Momentum traders

Anyone who wants unusual activity sent directly to their phone

⚠️ Disclaimer

This tool is for informational purposes only. It is not financial advice. Always do your own research before trading.
