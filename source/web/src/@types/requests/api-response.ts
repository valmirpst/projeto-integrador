type SuccessResponse<T> = {
  success: true;
  errors?: undefined;
  data: T;
};

type ErrorResponse = {
  success: false;
  errors: string[];
  data?: null;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
