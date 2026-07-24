"use client";

import { useCallback, useEffect, useState } from "react";

import PortfolioSummary from "@/components/PortfolioSummary";
import PortfolioTable from "@/components/PortfolioTable";
import SectorSummary from "@/components/SectorSummary";

import { getPortfolio } from "@/services/portfolioApi";
import { PortfolioResponse } from "@/types/portfolio";

interface PortfolioDashboardProps {
  initialPortfolio: PortfolioResponse;
}

const REFRESH_INTERVAL = 15_000;

const formatLastUpdated = (value: string): string => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

export default function PortfolioDashboard({
  initialPortfolio,
}: PortfolioDashboardProps) {
  const [portfolio, setPortfolio] =
    useState<PortfolioResponse>(initialPortfolio);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const [refreshError, setRefreshError] = useState<string | null>(null);

  const refreshPortfolio = useCallback(async () => {
    try {
      setIsRefreshing(true);

      const latestPortfolio = await getPortfolio();

      setPortfolio(latestPortfolio);
      setRefreshError(null);
    } catch (error) {
      console.error("Failed to refresh portfolio:", error);
      setRefreshError("Unable to refresh market data.");
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      refreshPortfolio();
    }, REFRESH_INTERVAL);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [refreshPortfolio]);

  return (
    <>
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Investment Portfolio</p>

          <h1>Portfolio Dashboard</h1>

          <p className="dashboard-subtitle">
            Track portfolio performance, market value and sector allocation.
          </p>
        </div>

        <div className="last-updated">
          <span>Last updated</span>

          <strong>{formatLastUpdated(portfolio.lastUpdated)}</strong>

          {isRefreshing && <p className="refresh-status">Refreshing...</p>}

          {refreshError && <p className="refresh-error">{refreshError}</p>}
        </div>
      </header>

      <PortfolioSummary summary={portfolio.summary} />

      <SectorSummary sectors={portfolio.sectors} />

      <PortfolioTable stocks={portfolio.stocks} />
    </>
  );
}
