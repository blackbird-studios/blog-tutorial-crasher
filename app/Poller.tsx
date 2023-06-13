import {
  isRouteErrorResponse,
  useRevalidator,
  useRouteError,
} from "@remix-run/react";
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Error) {
    return <div>Poller: An unexpected error occurred: {error.message}</div>;
  }

  if (!isRouteErrorResponse(error)) {
    return <h1>Poller: Unknown Error</h1>;
  }

  if (error.status === 404) {
    return <div>Poller: Note not found</div>;
  }

  return <div>Poller: An unexpected error occurred: {error.statusText}</div>;
}
