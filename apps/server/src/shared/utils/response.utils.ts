import type { ApiResponse, PaginatedResponse } from "../types/api.types";

// Response utilities
export const createSuccessResponse = <T>(
  data: T,
  metadata?: ApiResponse["metadata"],
): ApiResponse<T> => ({
  success: true,
  data,
  metadata: {
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    ...metadata,
  },
});

export const createErrorResponse = (
  code: string,
  message: string,
  details?: unknown,
  metadata?: ApiResponse["metadata"],
): ApiResponse => ({
  success: false,
  error: {
    code,
    message,
    details,
  },
  metadata: {
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    ...metadata,
  },
});

export const createPaginatedResponse = <T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
): PaginatedResponse<T> => ({
  ...createSuccessResponse(data),
  pagination: {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1,
  },
});
