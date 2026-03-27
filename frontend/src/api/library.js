import { api } from "./client";

export async function fetchStats() {
  const res = await api.get("/statistics");
  return res.data.data;
}

export async function listBooks({ q } = {}) {
  const res = await api.get("/books", { params: q ? { q } : undefined });
  return res.data.data;
}

export async function createBook(payload) {
  const res = await api.post("/books", payload);
  return res.data.data;
}

export async function borrowBook({ bookId, loanDays = 7 }) {
  const res = await api.post("/borrow", { bookId, loanDays });
  return res.data.data;
}

export async function listBorrows() {
  const res = await api.get("/borrows");
  return res.data.data;
}

export async function returnLoan({ loanId }) {
  const res = await api.post("/return", { loanId });
  return res.data.data;
}