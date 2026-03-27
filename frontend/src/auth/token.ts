import type { JwtPayload, Role } from "../types";

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const [, payloadB64] = token.split(".");
    if (!payloadB64) return null;
    const json = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function isRole(payload: JwtPayload | null, role: Role) {
  return Boolean(payload && payload.role === role);
}

