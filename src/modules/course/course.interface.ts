export interface Instructor {
  id: number;
  name: string;
  bio?: string;
  photoUrl?: string;
  contactEmail: string;
}

export interface Schedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Content {
  title: string;
  description: string;
  duration: string;
  resources?: string[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  startDate: Date;
  endDate: Date;
  price: number;
  instructor: Instructor;
  schedule: Schedule[];
  contents: Content[];
  rating?: number;
  reviews?: string[];
  prerequisites?: string[];
  maxParticipants?: number;
  currentParticipants?: number;
}
