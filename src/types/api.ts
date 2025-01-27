export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface HabitCompletion {
  id: number;
  habitId: number;
  completedAt: string;
  createdAt: string;
  notes?: string;
}

export interface Habit {
  id: number;
  userId: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  completions: HabitCompletion[];
  tags?: Tag[];
  frequencyTarget: number;
  frequencyType: number;
  color: string;
}

export enum HabitFrequency {
  DAILY = 1,
  WEEKLY = 2,
  MONTHLY = 3,
  YEARLY = 4, 
  CUSTOM = 5,
}

export interface CreateHabitDto {
  name?: string;
  description?: string;
  isActive?: boolean;
  tagIds?: number[];
  createdAt?: string;
  frequencyTarget: number;
  FrequencyType: HabitFrequency,
  color: string;
}

export interface Mood {
  id: number;
  moodType: string | null;
  intensity: number;
  notes: string | null;
  timestamp: string;
  tagIds?: number[];
}

export interface CreateMoodDto {
  moodType?: string;
  intensity: number;
  notes?: string;
  timestamp?: string;
  tagIds?: number[];
}

export interface QuickNote {
  id: number;
  userId: number;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  tags?: Tag[];
}

export interface CreateQuickNoteDto {
  content?: string;
  tagIds?: number[];
}

export interface Tag {
  id: number;
  userId: number;
  name: string | null;
  color: string | null;
  createdAt: string;
}

export interface CreateTagDto {
  name?: string;
  color?: string;
  timestamp?: string;
}