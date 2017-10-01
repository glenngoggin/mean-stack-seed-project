import { User } from './user.interface';

export interface Task {
  _id: string,
  description: string,
  status: string,
  users: User[],
  __v:number,
  created_at: string,
  updated_at: string
}

