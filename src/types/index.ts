export interface UserProfile {
  id: string;
  name: string;
  nickname: string;
  location: string;
  school: string;
  birthday: string;
  age: string;
  submittedAt: string;
  updatedAt: string;
  isSubmitted: boolean;
}

export interface UserInterests {
  userId: string;
  hobbies: string;
  favoriteFood: string;
  favoriteMusic: string;
  favoriteMovies: string;
  favoriteColor: string;
  favoritePlace: string;
}

export interface UserPersonality {
  userId: string;
  introvertOrExtrovert: string;
  beachOrMountains: string;
  coffeeOrMilkTea: string;
  freeTimeActivity: string;
  morningOrNight: string;
  catOrDog: string;
  stayInOrGoOut: string;
}

export interface UserDeeper {
  userId: string;
  dreams: string;
  goals: string;
  whatMakesHappy: string;
  whatMakesComfortable: string;
  lifePhilosophy: string;
  idealDay: string;
}

export interface CustomQuestion {
  id: string;
  category: 'basic' | 'interests' | 'personality' | 'deeper';
  question: string;
  type: 'text' | 'textarea' | 'choice';
  options?: string[];
  isRequired: boolean;
  isActive: boolean;
  createdAt: string;
  fieldKey: string;
}

export interface UserResponse {
  profile: UserProfile;
  interests: UserInterests;
  personality: UserPersonality;
  deeper: UserDeeper;
  customAnswers: Record<string, string>;
}

export interface AdminNote {
  id: string;
  userId: string;
  note: string;
  createdAt: string;
}

export type Category = 'basic' | 'interests' | 'personality' | 'deeper';
