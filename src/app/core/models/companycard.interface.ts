export interface ICompanyCardData {
  id: number;
  name: string;
  logoUrl: string;
  reviewsCount: number;
  reviews: IReview[];
  description: string;
  averageRating: number;
  readonly: boolean;
}

export interface IReview {
  companyId: number;
  content: string;
  createdAt: string;
  id: number;
  rating: number;
  timestamp: string;
  title: string;
  updatedAt: string;
  user: User;
  userId: number;
}

interface User {
  createdAt: string;
  email: string;
  id: number;
  password: string;
  updatedAt: string;
  username: string;
}
