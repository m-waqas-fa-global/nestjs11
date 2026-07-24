export interface BrowserInfo {
    browser: string;
    version: string;
    os: string;
    device: string;
  }
  
  export interface ApiLogObject extends BrowserInfo {
    requestId: string;
    timestamp: string;
    method: string;
    url: string;
    statusCode: number;
    responseTime: string;
    ip: string | string[] | undefined;
    query: Record<string, any> | null;
    params: Record<string, any> | null;
    reqBody: Record<string, any> | null;
    error: unknown | null;
  }