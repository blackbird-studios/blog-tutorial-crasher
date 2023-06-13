import { Poller } from "./Poller";

export const HeirarchyForFun = () => {
  return (
    <div>
      <span>hola</span>
      <Poller frequencyMs={1000} />
    </div>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => (
  <div>
    <h1>Oops, something went wrong in HeirarchyForFun</h1>
    <pre>{error.message}</pre>
  </div>
);
