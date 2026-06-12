export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: number;
  updatedAt?: number;
}

export interface Photo {
  id: string;
  imageUrl: string;
  caption?: string;
  createdAt: number;
}
