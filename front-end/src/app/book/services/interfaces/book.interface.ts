import { Author } from './author.interface';

export interface Book {
  _id: string,
  title: string,
  description: string,
  price: string,
  is_live: boolean,
  authors: Author[],
  __v:number,
  created_at: string,
  updated_at: string
}

