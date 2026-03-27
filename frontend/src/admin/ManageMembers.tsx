import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/client";
import { apiErrorMessage } from "../api/client";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { TableSkeleton } from "../components/Skeleton";

type Member = {
  id: number;
  full_name: string;
  email: string | null;
  phone: string | null;
  status: "Active" | "Blocked" | "Expired" | string;
  membership_date: string | null;
};

export function ManageMembers() {
  const [rows, setRows] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get("/api/admin/members");
      setRows(res.data.data);
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Card title="Manage Members" actions={<Button variant="secondary" onClick={load}>Làm mới</Button>}>
      {loading ? (
        <TableSkeleton rows={7} />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Họ tên</th>
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Trạng thái</th>
                <th className="py-2 pr-3">Ngày đăng ký</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((m) => (
                <tr key={m.id}>
                  <td className="py-3 pr-3">{m.id}</td>
                  <td className="py-3 pr-3">{m.full_name}</td>
                  <td className="py-3 pr-3">{m.email || "—"}</td>
                  <td className="py-3 pr-3">{m.status}</td>
                  <td className="py-3 pr-3">
                    {m.membership_date ? new Date(m.membership_date).toLocaleDateString("vi-VN") : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

