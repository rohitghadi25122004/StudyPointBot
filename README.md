# Study Point WhatsApp Bot

A WhatsApp Cloud API bot for **Study Point**, a tuition center in Diva offering classes for
Grade 5–12 (SSC & HSC). Content is sourced from [studypointofficial.in](https://www.studypointofficial.in/).

## Features

- Welcome + main menu (interactive buttons)
- Classes offered (5–7, 8–10 SSC, 11–12 HSC)
- Results / track record
- Contact & address lookup
- Multi-step **admission enquiry** flow that captures student name, parent name,
  class, and message, then saves it as a lead (`data/leads.json`)
- Webhook signature verification (`X-Hub-Signature-256`)
- Command-based routing — adding a new topic never touches existing handlers

## Folder Structure

```
StuyPointBot/
├── data/
│   └── leads.json            # admission enquiries captured via chat (gitignored)
├── src/
│   ├── commands/              # one file per bot command (Open/Closed Principle)
│   │   ├── start.command.js
│   │   ├── menu.command.js
│   │   ├── classes.command.js
│   │   ├── results.command.js
│   │   ├── contact.command.js
│   │   ├── help.command.js
│   │   ├── admission.command.js   # multi-step lead capture
│   │   ├── unknown.command.js
│   │   └── index.js               # dispatcher: routes incoming messages to commands
│   ├── config/
│   │   ├── env.js             # loads & validates environment variables
│   │   └── whatsapp.config.js # Graph API URL/version
│   ├── constants/
│   │   ├── commands.constant.js   # button ids / keywords
│   │   └── messages.constant.js   # all bot copy (scraped site content lives here)
│   ├── controllers/
│   │   └── webhook.controller.js  # thin: verify, parse, delegate, ack
│   ├── middlewares/
│   │   ├── verifySignature.middleware.js
│   │   └── errorHandler.middleware.js
│   ├── repositories/
│   │   └── lead.repository.js     # JSON-file persistence for admission leads
│   ├── routes/
│   │   └── webhook.routes.js
│   ├── services/
│   │   ├── whatsapp.service.js    # low-level Graph API calls (text/buttons)
│   │   ├── message.service.js     # high-level "send X message" helpers
│   │   └── session.service.js     # in-memory per-user conversation state
│   ├── utils/
│   │   ├── logger.js
│   │   ├── apiClient.js       # axios wrapper with retry
│   │   ├── phoneFormatter.js
│   │   └── messageParser.js   # raw webhook payload -> normalized message
│   ├── app.js                 # express app assembly
│   └── server.js              # entrypoint
├── .env / .env.example
└── package.json
```

## Configuration

| Variable | Description |
|---|---|
| `PORT` | Local server port (default `10000`) |
| `VERIFY_TOKEN` | Arbitrary string you also enter in the Meta webhook config |
| `WHATSAPP_TOKEN` | WhatsApp Cloud API access token |
| `PHONE_NUMBER_ID` | Your WhatsApp Business phone number ID |
| `API_VERSION` | Graph API version (default `v21.0`) |
| `APP_SECRET` | Meta App Secret, used to verify webhook payload signatures. If left empty, signature verification is skipped (fine for dev, **set it in production**) |
| `BUSINESS_PHONE` | Human-facing business number, used only in copy |

Never commit `.env` — it's already gitignored.

## Running Locally

```bash
npm install
npm run dev        # nodemon, restarts on file changes
```

Expose it publicly for Meta to reach (e.g. with ngrok):

```bash
ngrok http 10000
```

In Meta's App Dashboard → WhatsApp → Configuration, set the Callback URL to
`https://<ngrok-id>.ngrok.io/webhook` and the Verify Token to match `VERIFY_TOKEN`.

## Testing

**Webhook verification (GET):**
```bash
curl "http://localhost:10000/webhook?hub.mode=subscribe&hub.verify_token=<VERIFY_TOKEN>&hub.challenge=12345"
# should echo back 12345
```

**Simulate an incoming message (POST):**
```bash
curl -X POST http://localhost:10000/webhook \
  -H "Content-Type: application/json" \
  -d '{"entry":[{"changes":[{"value":{"messages":[{"from":"91XXXXXXXXXX","id":"wamid.test","type":"text","text":{"body":"hi"}}]}}]}]}'
# should respond 200 instantly; bot reply is sent async via the Graph API
```

Try the full flow on a real WhatsApp chat: send `hi`, tap **Admission**, and walk through
student name → parent name → class → message → confirm. Check `data/leads.json` afterward.

## Deployment

Works on any Node host (Railway, Render, a VPS, or Docker). Set the same environment
variables from `.env.example` in your host's config, ensure the process binds to `PORT`,
and point Meta's webhook at `https://<your-domain>/webhook`.

## Troubleshooting

- **Webhook verification fails**: `VERIFY_TOKEN` in `.env` must exactly match what you typed in Meta's dashboard.
- **Messages not sending**: check `WHATSAPP_TOKEN` hasn't expired and `PHONE_NUMBER_ID` is correct; server logs the Graph API error response.
- **401 on POST /webhook**: `APP_SECRET` is set but doesn't match your Meta app, or the request isn't actually from Meta.
- **Admission flow feels "stuck"**: session state is in-memory — restarting the server clears all in-progress enquiries.

## Future Improvements

- Move `session.service.js` to Redis for multi-instance deployments
- Move `lead.repository.js` from JSON file to a real database (SQLite/MongoDB/Postgres)
- Add a WhatsApp list message for the main menu once >3 options are needed
- Rate limiting on the webhook route
- Admin notification (email/Slack) on new admission lead
