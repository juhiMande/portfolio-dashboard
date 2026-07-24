import { getPortfolio } from "@/services/portfolioApi";
import PortfolioDashboard from "@/components/PortfolioDashboard";

export default async function Home() {
  const portfolio = await getPortfolio();

  return (
    <main className="dashboard-container">
      <PortfolioDashboard
        initialPortfolio={portfolio}
      />
    </main>
  );
}
