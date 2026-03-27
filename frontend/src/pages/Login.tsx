import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { apiErrorMessage, setAuthToken } from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { token } = await login({ email: email.trim(), password });
      auth.login(token);
      setAuthToken(token);
      toast.success("Đăng nhập thành công");
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(apiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <Card title="Đăng nhập">
        <form className="space-y-4" onSubmit={onSubmit}>
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
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

