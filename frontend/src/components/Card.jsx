export function Card({ title, children, actions }) {
  return (
    <section className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      {title ? (
        <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </header>
      ) : null}
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

