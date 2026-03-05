# Kimi Agent 2.5 — AI Chat Widget

AI-powered chat widget with lead scoring, sentiment analysis, PDF proposal generation, and Bitrix24 integration.

## 🚀 Features

- **AI Assistant** — Powered by Claude 3.5 Sonnet via OpenRouter
- **Lead Scoring** — Automatic HOT/WARM/COLD classification based on budget and timeline
- **Sentiment Analysis** — Detects negative sentiment and triggers escalation
- **PDF Proposal Generation** — Dynamic commercial proposals with selected services
- **Guardrails** — Protection against abuse, spam, and unwanted content
- **Analytics Dashboard** — Detailed statistics at `/admin` with charts and metrics
- **Bitrix24 Integration** — Automatic lead creation and task escalation
- **Knowledge Base (RAG)** — FAQ and documentation search

## 📁 Project Structure

```
march/
├── app/
│   ├── api/                    # API routes
│   │   ├── agent/route.ts      # AI responses
│   │   ├── lead/route.ts       # Lead creation
│   │   ├── sentiment/route.ts  # Sentiment analysis
│   │   ├── proposal/route.ts   # PDF generation
│   │   └── analytics/route.ts  # Dashboard stats
│   ├── admin/                  # Admin dashboard
│   │   └── page.tsx
│   ├── page.tsx               # Landing page
│   └── layout.tsx
├── components/
│   ├── ChatWidget.tsx         # Main chat UI
│   ├── LeadForm.tsx           # Lead form modal
│   ├── ProposalViewer.tsx     # PDF proposal UI
│   └── admin/                 # Dashboard components
│       ├── StatsCards.tsx
│       ├── LeadTable.tsx
│       └── SentimentChart.tsx
├── lib/
│   ├── scoring.ts             # Lead scoring logic
│   ├── guardrails.ts          # Safety checks
│   ├── sentiment.ts           # Sentiment analysis
│   ├── bitrix24.ts            # Bitrix24 SDK
│   ├── pdf-generator.ts       # PDF generation
│   └── rag.ts                 # Knowledge base search
├── data/
│   ├── faq.json               # Knowledge base
│   ├── pricing.json           # Service pricing
│   └── proposal-template.json # Proposal template
└── .env.example               # Environment variables
```

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/timoshinoleg-eng/march.git
cd march
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
# OpenRouter API
OPENROUTER_API_KEY="your_openrouter_key"
OPENROUTER_SITE_URL="https://your-site.com"
OPENROUTER_SITE_NAME="Kimi Agent Demo"

# Bitrix24 Webhook
BITRIX24_WEBHOOK_URL="https://your-company.bitrix24.ru/rest/1/xxxxxx/"
BITRIX24_MANAGER_ID="1"
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 🌐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENROUTER_API_KEY` | OpenRouter API key | Yes |
| `OPENROUTER_SITE_URL` | Your site URL | No |
| `OPENROUTER_SITE_NAME` | Site name for OpenRouter | No |
| `BITRIX24_WEBHOOK_URL` | Bitrix24 webhook URL | Yes |
| `BITRIX24_MANAGER_ID` | Manager ID for notifications | No |
| `RATE_LIMIT_PER_MINUTE` | Rate limit per minute | No |
| `MAX_MESSAGE_LENGTH` | Max message length | No |

## 📊 Lead Scoring

Leads are automatically scored based on:

| Budget | Score |
|--------|-------|
| до 50 000₽ | 20 |
| 50 000₽ - 100 000₽ | 40 |
| 100 000₽ - 250 000₽ | 60 |
| 250 000₽+ | 90 |

| Timeline | Score |
|----------|-------|
| Срочно | 30 |
| 1 неделя | 25 |
| 1 месяц | 20 |
| Не определено | 5 |

**Status:**
- HOT: 70+ points
- WARM: 40-69 points
- COLD: <40 points

## 🛡️ Guardrails

The system blocks:
- Password/secret requests
- Hacking attempts
- Spam/bulk messages
- Malware/virus mentions
- Credit card data
- Personal documents (passport, INN, SNILS)
- DDoS/phishing attempts

## 📈 API Endpoints

### POST /api/agent
Send message to AI assistant.

```json
{
  "messages": [{"role": "user", "content": "Hello"}],
  "userId": "session_123",
  "context": {"name": "John", "company": "Acme"}
}
```

### POST /api/lead
Create a new lead.

```json
{
  "name": "Иван Петров",
  "company": "ООО Техно",
  "phone": "+79991234567",
  "email": "ivan@example.com",
  "budget": "100 000₽ - 250 000₽",
  "timeline": "1 месяц"
}
```

### POST /api/proposal
Generate PDF proposal.

```json
{
  "name": "Иван Петров",
  "company": "ООО Техно",
  "email": "ivan@example.com",
  "phone": "+79991234567",
  "selectedServices": ["Веб-разработка", "Дизайн UI/UX"]
}
```

### GET /api/analytics
Get dashboard statistics.

Query params: `period=24h|7d|30d`

## 🎨 Customization

### Knowledge Base
Edit `data/faq.json` to add/modify Q&A pairs:

```json
{
  "id": "1",
  "question": "Какие услуги вы предлагаете?",
  "answer": "Мы предлагаем...",
  "category": "Услуги",
  "tags": ["услуги", "сервис"]
}
```

### Pricing
Edit `data/pricing.json` to update service prices.

### Proposal Template
Edit `data/proposal-template.json` to customize PDF layout.

## 📦 Deployment

### Static Export
```bash
npm run build
```

Output will be in `dist/` directory.

### Vercel
```bash
npm i -g vercel
vercel
```

## 🧪 Testing

Run type checking:
```bash
npm run type-check
```

## 📄 License

MIT License

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📞 Support

For support, email info@company.ru or open an issue on GitHub.

---

Made with ❤️ by ВебСтудия Про
