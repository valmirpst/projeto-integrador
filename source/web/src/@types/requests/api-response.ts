type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

type ErrorResponse = {
  success: false;
  message: string;
  data?: null;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
