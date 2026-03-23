# CronEase API

> Convert plain English to cron expressions and back. Validate cron syntax. Predict next run times. All in one simple API.

---

## 🚀 What It Does

Developers waste time writing and decoding cron expressions. CronEase API solves this with 4 simple endpoints:

| Endpoint               | Input                   | Output                 |
| ---------------------- | ----------------------- | ---------------------- |
| `POST /api/to-cron`    | `"every Monday at 9am"` | `0 9 * * 1`            |
| `POST /api/to-english` | `0 9 * * 1`             | `"At 09:00 on Monday"` |
| `POST /api/validate`   | `0 9 * * 1`             | `{ valid: true }`      |
| `POST /api/next-runs`  | `0 9 * * 1`             | Next 5 run times       |

---

## 📦 Tech Stack

- **Framework:** Next.js 16 + TypeScript
- **AI:** Groq API (Llama 3.3) — for plain English parsing
- **Cron Logic:** `cronstrue` + `cron-parser`
- **Rate Limiting:** Upstash Redis
- **Hosting:** Vercel
- **Distribution:** RapidAPI

---

## 🔧 API Reference

### POST /api/to-cron

Convert plain English to a cron expression.

**Request:**

```json
{
  "text": "every weekday at 9am"
}
```

**Response:**

```json
{
  "cron": "0 9 * * 1-5",
  "description": "At 09:00, Monday through Friday",
  "valid": true
}
```

---

### POST /api/to-english

Convert a cron expression to plain English.

**Request:**

```json
{
  "cron": "0 9 * * 1-5"
}
```

**Response:**

```json
{
  "cron": "0 9 * * 1-5",
  "description": "At 09:00, Monday through Friday"
}
```

---

### POST /api/validate

Validate a cron expression.

**Request:**

```json
{
  "cron": "0 9 * * 1-5"
}
```

**Response:**

```json
{
  "cron": "0 9 * * 1-5",
  "valid": true,
  "description": "At 09:00, Monday through Friday"
}
```

---

### POST /api/next-runs

Get the next N run times for a cron expression.

**Request:**

```json
{
  "cron": "0 9 * * 1-5",
  "count": 3
}
```

**Response:**

```json
{
  "cron": "0 9 * * 1-5",
  "nextRuns": [
    "2026-03-23T09:00:00.000Z",
    "2026-03-24T09:00:00.000Z",
    "2026-03-25T09:00:00.000Z"
  ]
}
```

---

## 🛠 Local Development

### Prerequisites

- Node.js 18+
- A free [Groq API key](https://console.groq.com)
- A free [Upstash Redis](https://upstash.com) instance

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/cronease-api.git
cd cronease-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your GROQ_API_KEY and UPSTASH credentials

# Run the development server
npm run dev
```

The API will be available at `http://localhost:3000`

---

## ⚙️ Environment Variables

Create a `.env.local` file with the following:

```env
GROQ_API_KEY=your_groq_api_key_here
UPSTASH_REDIS_REST_URL=your_upstash_url_here
UPSTASH_REDIS_REST_TOKEN=your_upstash_token_here
```

---

## 📊 Rate Limits

| Plan  | Requests/month | Price  |
| ----- | -------------- | ------ |
| Free  | 50             | $0     |
| Basic | 1,000          | $9/mo  |
| Pro   | 10,000         | $29/mo |
| Ultra | 100,000        | $79/mo |

Available on [RapidAPI](#) _(link coming soon)_

---

## 👤 Author

**Natnael Demelash**
React Developer & n8n Automation Specialist

- Upwork: [View Profile](https://www.upwork.com/freelancers/~01ddf1eafb3a557e61)

---
