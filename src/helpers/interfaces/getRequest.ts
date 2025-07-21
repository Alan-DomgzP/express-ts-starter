export interface GetRequestOptions {
  url: string;
  headers?: Record<string, string>;
  rejectUnauthorized?: boolean;
  params?: Record<string, string | number>,
  auth?: {
    username: string;
    password: string;
  };
}
