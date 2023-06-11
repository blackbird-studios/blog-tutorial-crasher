import { useRevalidator } from "@remix-run/react";
import { useEffect } from "react";

interface Props {
  frequencyMs: number;
}

export const Poller = ({ frequencyMs }: Props) => {
  usePolling(frequencyMs);

  return null;
};

const usePolling = (frequencyMs: number) => {
  const revalidator = useRevalidator();

  useEffect(() => {
    const interval = setInterval(() => {
      if (revalidator.state === "idle") {
        console.log("Revalidating page...");
        revalidator.revalidate();
      }
    }, frequencyMs);

    return () => clearInterval(interval);
  }, [revalidator, frequencyMs]);
};

export const ErrorBoundary = ({ error }: { error: Error }) => (
  <div>
    <h1>Oops, something went wrong in Poller</h1>
    <pre>{error.message}</pre>
  </div>
);
