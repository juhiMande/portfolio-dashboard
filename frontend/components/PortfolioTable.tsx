import { Stock } from "@/types/portfolio";

interface PortfolioTableProps {
  stocks: Stock[];
}

const formatCurrency = (value: number | null): string => {
  if (value === null) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatNumber = (value: number | null): string => {
  if (value === null) {
    return "N/A";
  }

  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
};

export default function PortfolioTable({ stocks }: PortfolioTableProps) {
  return (
    <section className="portfolio-table-section">
      <div className="section-heading">
        <div>
          <p className="section-label">Holdings</p>

          <h2>Portfolio Holdings</h2>
        </div>

        <p className="stock-count">{stocks.length} stocks</p>
      </div>

      <div className="portfolio-table-wrapper">
        <table className="portfolio-table">
          <thead>
            <tr>
              <th>Particulars</th>
              <th>Purchase Price</th>
              <th>Qty</th>
              <th>Investment</th>
              <th>Portfolio %</th>
              <th>Exchange</th>
              <th>CMP</th>
              <th>Present Value</th>
              <th>Gain / Loss</th>
              <th>P/E Ratio</th>
              <th>Latest Earnings</th>
              <th>Sector</th>
            </tr>
          </thead>

          <tbody>
            {stocks.map((stock, index) => {
              const getGainLossClass = (gainLoss: number | null): string => {
                if (gainLoss === null) {
                  return "unavailable-value";
                }

                if (gainLoss > 0) {
                  return "table-positive";
                }

                if (gainLoss < 0) {
                  return "table-negative";
                }

                return "table-neutral";
              };

              return (
                <tr key={`${stock.exchangeCode}-${index}`}>
                  <td>
                    <div className="stock-name-cell">
                      <strong>{stock.particulars}</strong>

                      <span>{stock.exchangeCode || "N/A"}</span>
                    </div>
                  </td>

                  <td>{formatCurrency(stock.purchasePrice)}</td>

                  <td>{formatNumber(stock.quantity)}</td>

                  <td>{formatCurrency(stock.investment)}</td>

                  <td>{stock.portfolioPercentage.toFixed(2)}%</td>

                  <td>
                    {stock.exchange ? (
                      <span className="exchange-badge">{stock.exchange}</span>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td>{formatCurrency(stock.cmp)}</td>

                  <td>{formatCurrency(stock.presentValue)}</td>

                  <td>
                    {stock.gainLoss === null ? (
                      <span className="unavailable-value">N/A</span>
                    ) : (
                      <span className={getGainLossClass(stock.gainLoss)}>
                        {stock.gainLoss > 0 ? "+" : ""}
                        {formatCurrency(stock.gainLoss)}
                      </span>
                    )}
                  </td>

                  <td>{formatNumber(stock.peRatio)}</td>

                  <td>{formatNumber(stock.latestEarnings)}</td>

                  <td>
                    <span className="sector-badge">
                      {stock.sector || "Uncategorized"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
