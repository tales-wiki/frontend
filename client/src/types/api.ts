export interface ApiError {
  response?: {
    status: number;
    data: {
      code: string;
      message: string;
    };
  };
}
