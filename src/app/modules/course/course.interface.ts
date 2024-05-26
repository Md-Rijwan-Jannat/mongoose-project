import { Model } from 'mongoose';

export interface IInstructor {
  id: number;
  name: string;
  bio?: string;
  photoUrl?: string;
  contactEmail: string;
}

export interface ISchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface IContent {
  title: string;
  description: string;
  duration: string;
  resources?: string[];
}

export interface ICourse {
  id: number;
  password: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  startDate: string;
  endDate: string;
  price: number;
  instructor: IInstructor;
  schedule: ISchedule[];
  contents: IContent[];
  rating?: number;
  reviews?: string[];
  prerequisites?: string[];
  maxParticipants?: number;
  currentParticipants?: number;
}

// creating a static methods
export interface ICourseModel extends Model<ICourse> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<ICourse | null>;
}
