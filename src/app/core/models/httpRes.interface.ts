export interface HttpRes<T> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}
