"use client";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({
  reset,
}: ErrorPageProps) {
  return (
    <main className="dashboard-container">
      <div className="page-state error-state">
        <h2>Unable to load portfolio data.</h2>

        <p>
          Please try again.
        </p>

        <button
          type="button"
          className="retry-button"
          onClick={() => reset()}
        >
          Try Again
        </button>
      </div>
    </main>
  );
}