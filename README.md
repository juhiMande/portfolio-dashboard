# Portfolio Dashboard

A full-stack portfolio monitoring dashboard built as part of the 8byte Full Stack technical assignment.

The application reads portfolio holdings from the provided Excel file, enriches them with current market information, calculates portfolio performance metrics, and presents the results through a responsive dashboard.

---

## Features

- Reads portfolio holdings from the provided Excel file
- Calculates investment value for each holding
- Fetches Current Market Price (CMP) using Yahoo Finance
- Fetches available fundamental information from Google Finance
- Calculates:
  - Present Value
  - Gain / Loss
  - Portfolio Allocation %
- Displays portfolio-level summary
- Displays sector-wise portfolio summary
- Groups holdings by sector
- Shows positive and negative gain/loss indicators
- Handles unavailable market data gracefully
- Uses caching to reduce repeated external requests
- Limits concurrent market-data requests
- Automatically refreshes portfolio data every 15 seconds
- Displays the last updated timestamp
- Responsive layout for desktop, tablet, and mobile devices

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS

### Backend

- Node.js
- Express.js
- TypeScript

### Data & External Sources

- XLSX for reading the portfolio Excel file
- Yahoo Finance for Current Market Price (CMP)
- Google Finance for available fundamental information

---

## Project Structure

```text
portfolio-dashboard/
│
├── backend/
│   ├── data/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── types/
│   └── package.json
│
└── README.md
```

## External Data Source Limitations

Yahoo Finance does not provide an official public API for this
use case. This project uses the `yahoo-finance2` library to retrieve
market prices.

Google Finance also does not expose an official public API for
the required fundamentals, so the backend retrieves and parses
publicly available Google Finance pages.

Because these sources are unofficial, responses may occasionally
be unavailable or change structure. The application therefore
implements caching, concurrency limiting and graceful fallback
handling.
