export interface IBaseBackendResponse<T> {
  message: string;
  data?: T;
  detail?: string;
}
