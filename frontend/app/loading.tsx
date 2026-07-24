export default function Loading() {
  return (
    <main className="dashboard-container">
      <div className="page-state">
        <div className="loading-spinner" />

        <h2>Loading portfolio...</h2>

        <p>
          Fetching portfolio and market data.
        </p>
      </div>
    </main>
  );
}