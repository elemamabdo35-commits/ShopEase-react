/**
 * Generic wrapper for DummyJSON's list endpoints, which return
 * { <resource>: T[], total, skip, limit } rather than a plain array.
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  skip: number;
  limit: number;
}

/** Query params accepted by paginated list requests. */
export interface PaginationParams {
  limit?: number;
  skip?: number;
}

/** Normalized shape for a failed request, produced by the axios interceptor. */
export interface ApiError {
  message: string;
  status?: number;
}
