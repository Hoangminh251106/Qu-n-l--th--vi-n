import { api } from "./client";

export async function register(payload: {
  fullName: string;
  email: string;
  password: string;
}) {
  const res = await api.post("/api/auth/register", payload);
  return res.data.data as { token: string };
}

export async function login(payload: { email: string; password: string }) {
  const res = await api.post("/api/auth/login", payload);
  return res.data.data as { token: string };
}

