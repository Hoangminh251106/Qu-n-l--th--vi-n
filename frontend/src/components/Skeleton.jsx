export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-md bg-slate-200 ${className}`} />;
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-12 gap-3">
          <Skeleton className="col-span-4 h-4" />
          <Skeleton className="col-span-3 h-4" />
          <Skeleton className="col-span-3 h-4" />
          <Skeleton className="col-span-2 h-4" />
        </div>
      ))}
    </div>
  );
}
