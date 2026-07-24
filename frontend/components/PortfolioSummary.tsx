import { PortfolioSummary as PortfolioSummaryType } from "@/types/portfolio";

interface PortfolioSummaryProps {
  summary: PortfolioSummaryType;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
};

export default function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  const gainLossClass =
    summary.totalGainLoss > 0
      ? "positive-value"
      : summary.totalGainLoss < 0
        ? "negative-value"
        : "neutral-value";

  const coveragePercentage =
    summary.totalStocks > 0
      ? ((summary.stocksWithMarketData / summary.totalStocks) * 100).toFixed(1)
      : "0.0";

  return (
    <section className="summary-section">
      <div className="section-heading">
        <div>
          <p className="section-label">Overview</p>

          <h2>Portfolio Summary</h2>
        </div>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <p className="summary-card-label">Total Investment</p>

          <h3>{formatCurrency(summary.totalInvestment)}</h3>

          <p className="summary-card-description">Total amount invested</p>
        </article>

        <article className="summary-card">
          <p className="summary-card-label">Present Value</p>

          <h3>{formatCurrency(summary.totalPresentValue)}</h3>

          <p className="summary-card-description">
            Current available market value
          </p>
        </article>

        <article className="summary-card">
          <p className="summary-card-label">Total Gain / Loss</p>

          <h3 className={gainLossClass}>
            {summary.totalGainLoss > 0 ? "+" : ""}
            {formatCurrency(summary.totalGainLoss)}
          </h3>

          <p className="summary-card-description">Based on available CMP</p>
        </article>

        <article className="summary-card">
          <p className="summary-card-label">Total Stocks</p>

          <h3>{summary.totalStocks}</h3>

          <p className="summary-card-description">Holdings in portfolio</p>
        </article>

        <article className="summary-card">
          <p className="summary-card-label">Market Data Coverage</p>

          <h3>
            {summary.stocksWithMarketData}
            {" / "}
            {summary.totalStocks}
          </h3>

          <p className="summary-card-description">
            {coveragePercentage}% with live CMP
          </p>
        </article>
      </div>
    </section>
  );
}
