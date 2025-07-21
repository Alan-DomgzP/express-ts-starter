export interface PostRequestOptions {
  url: string;
  headers?: Record<string, string>;
  rejectUnauthorized?: boolean;
  data?: any;
  auth?: {
    username: string;
    password: string;
  };
}
