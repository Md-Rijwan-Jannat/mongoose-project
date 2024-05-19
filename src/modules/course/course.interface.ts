export interface TInstructor {
  id: number;
  name: string;
  bio?: string;
  photoUrl?: string;
  contactEmail: string;
}

export interface TSchedule {
  day: string;
  startTime: string;
  endTime: string;
}

export interface TContent {
  title: string;
  description: string;
  duration: string;
  resources?: string[];
}

export interface TCourse {
  id: number;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  startDate: string;
  endDate: string;
  price: number;
  instructor: TInstructor;
  schedule: TSchedule[];
  contents: TContent[];
  rating?: number;
  reviews?: string[];
  prerequisites?: string[];
  maxParticipants?: number;
  currentParticipants?: number;
}
