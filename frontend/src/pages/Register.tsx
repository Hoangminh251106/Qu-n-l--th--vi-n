import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { apiErrorMessage, setAuthToken } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Register() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Mật khẩu tối thiểu 6 ký tự");
      return;
    }
    setLoading(true);
    try {
      const { token } = await register({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
      });
      auth.login(token);
      setAuthToken(token);
      toast.success("Đăng ký thành công");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <Card title="Đăng ký tài khoản">
        <form className="space-y-4" onSubmit={onSubmit}>
          <Input
            label="Họ tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Mật khẩu"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <Button disabled={loading} type="submit">
              {loading ? "Đang tạo..." : "Tạo tài khoản"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

