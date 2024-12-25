import { store } from '@/store';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: Record<string, unknown> | string;
  queryParams?: Record<string, string | number>;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    endpoint: string,
    queryParams?: Record<string, string | number>
  ): string {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) =>
        url.searchParams.append(key, value.toString())
      );
    }
    return url.toString();
  }

  private handleResponse(response: Response): Promise<unknown> {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.message || 'API request failed');
      });
    }
    return response.json();
  }

  public async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers: defaultHeaders = {},
      body,
      queryParams
    } = options;

    const state = store.getState();
    const token = state.auth.token;

    const headers = {
      ...defaultHeaders,
      ...(token && { Authorization: `Bearer ${token}` })
    };

    const url = this.buildUrl(endpoint, queryParams);
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      fetchOptions.body =
        typeof body === 'string' ? body : JSON.stringify(body);
    }

    const response = await fetch(url, fetchOptions);
    return this.handleResponse(response) as Promise<T>;
  }

  public get<T>(
    endpoint: string,
    queryParams?: Record<string, string | number>
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', queryParams });
  }

  public post<T>(
    endpoint: string,
    body?: Record<string, unknown> | string
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  public put<T>(
    endpoint: string,
    body?: Record<string, unknown> | string
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  public delete<T>(
    endpoint: string,
    queryParams?: Record<string, string | number>
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', queryParams });
  }
}

export default ApiClient;
