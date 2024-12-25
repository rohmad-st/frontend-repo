export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserData extends User {
  _id: string;
}

export type UserStatuses = 'idle' | 'loading' | 'succeeded' | 'failed';
