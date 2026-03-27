import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { Button } from "../components/Button";

const items = [
  { to: "/admin/books", label: "Manage Books" },
  { to: "/admin/loans", label: "Manage Loans" },
  { to: "/admin/members", label: "Manage Members" },
];

export function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="grid min-h-[calc(100svh-80px)] grid-cols-1 gap-4 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm font-semibold text-slate-900">Admin Dashboard</div>
          <div className="mt-3 space-y-1">
            {items.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {i.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="secondary" onClick={logout} className="w-full">
              Đăng xuất
            </Button>
          </div>
        </div>
      </aside>
      <section className="lg:col-span-9">
        <Outlet />
      </section>
    </div>
  );
}

