export type ApiResponse<TData> = {
  status_code: number;
  message: string;
  data?: TData;
  count?: number;
  meta?: {
    page: number;
    limit: number;
    total: number;
  };
};

export type PaginationDTO = {
  page?: number;
  limit?: number;
};
