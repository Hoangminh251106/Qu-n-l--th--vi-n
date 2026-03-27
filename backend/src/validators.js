const { z } = require("zod");

const bookCreateSchema = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  categoryId: z.number().int().positive(),
  isbn: z.string().trim().max(20).optional(),
  publisher: z.string().trim().max(100).optional().nullable(),
  publishYear: z.number().int().optional().nullable(),
  totalQuantity: z.number().int().min(0).default(1),
  availableQuantity: z.number().int().min(0).optional(),
  price: z.number().nonnegative().optional().nullable(),
  location: z.string().trim().max(50).optional().nullable(),
  status: z
    .enum(["Available", "Out of Stock", "Maintenance"])
    .optional()
    .default("Available"),
});

const borrowSchema = z.object({
  bookId: z.number().int().positive(),
  memberId: z.number().int().positive(),
  loanDays: z.number().int().min(1).max(365).optional(),
  staffId: z.number().int().positive().optional().nullable(),
});

const returnSchema = z.object({
  loanId: z.number().int().positive(),
});

module.exports = {
  bookCreateSchema,
  borrowSchema,
  returnSchema,
};
