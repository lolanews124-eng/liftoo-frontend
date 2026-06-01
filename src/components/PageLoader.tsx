export function PageLoader({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="page-loader">
      <div className="page-loader-spinner" />
      <p>{message}</p>
    </div>
  );
}
