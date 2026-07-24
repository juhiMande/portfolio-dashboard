import { SectorSummary as SectorSummaryType } from "@/types/portfolio";

interface SectorSummaryProps {
    sectors: SectorSummaryType[];
}

const formatCurrency = (
    value: number
): string => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(value);
};

const getGainLossClass = (
    gainLoss: number
): string => {
    if (gainLoss > 0) {
        return "sector-positive";
    }

    if (gainLoss < 0) {
        return "sector-negative";
    }

    return "sector-neutral";
};

export default function SectorSummary({
    sectors,
}: SectorSummaryProps) {
    return (
        <section className="sector-summary-section">
            <div className="section-heading">
                <div>
                    <p className="section-label">
                        Allocation
                    </p>

                    <h2>Sector Summary</h2>
                </div>

                <p className="sector-count">
                    {sectors.length} sectors
                </p>
            </div>

            {sectors.length === 0 ? (
                <div className="sector-empty-state">
                    No sector data available.
                </div>
            ) : (
                <div className="sector-grid">
                    {sectors.map((sector) => (
                        <article
                            className="sector-card"
                            key={sector.sector}
                        >
                            <div className="sector-card-header">
                                <div>
                                    <h3>
                                        {sector.sector}
                                    </h3>

                                    <p>
                                        {sector.stockCount}{" "}
                                        {sector.stockCount === 1
                                            ? "stock"
                                            : "stocks"}
                                    </p>
                                </div>
                            </div>

                            <div className="sector-values">
                                <div className="sector-value-row">
                                    <span>
                                        Investment
                                    </span>

                                    <strong>
                                        {formatCurrency(
                                            sector.totalInvestment
                                        )}
                                    </strong>
                                </div>

                                <div className="sector-value-row">
                                    <span>
                                        Present Value
                                    </span>

                                    <strong>
                                        {formatCurrency(
                                            sector.totalPresentValue
                                        )}
                                    </strong>
                                </div>

                                <div className="sector-value-row">
                                    <span>
                                        Gain / Loss
                                    </span>

                                    <strong
                                        className={getGainLossClass(
                                            sector.totalGainLoss
                                        )}
                                    >
                                        {sector.totalGainLoss > 0
                                            ? "+"
                                            : ""}

                                        {formatCurrency(
                                            sector.totalGainLoss
                                        )}
                                    </strong>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}