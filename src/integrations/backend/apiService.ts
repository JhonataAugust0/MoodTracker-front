import axios from 'axios';
import type { 
  LoginRequest, 
  RegisterRequest, 
  Habit, 
  CreateHabitDto, 
  Mood, 
  CreateMoodDto, 
  QuickNote, 
  CreateQuickNoteDto,
  Tag,
  CreateTagDto,
  HabitCompletion,
  ChangePasswordRequestDTO,
  ForgotPasswordRequestDTO
} from '../../types/api';
import Cookies from 'js-cookie'

const BASE_URL = import.meta.env.VITE_API_URL;


class ApiService {
  private axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': Cookies.get('auth_token'),
    },
  });

  // Authentication Endpoints
  async login(loginData: LoginRequest) {
    const response = await this.axiosInstance.post('/auth/login', loginData);
    return response.data;
  }

  async register(registerData: RegisterRequest) {
    const response = await this.axiosInstance.post('/users', registerData);
    return response;
  }

  async refreshToken(refreshToken: string) {
    const response = await this.axiosInstance.post('/auth/refresh-token', { refreshToken });
    return response.data;
  }

  async logout(refreshToken: string) {
    const response = await this.axiosInstance.delete('/auth/session', { 
      data: { refreshToken } 
    });
    return response.data;
  }

  // Password Endpoints
  async changePasswordRequest(changePasswordData: ChangePasswordRequestDTO) {
    const response = await this.axiosInstance.post('/password/change', changePasswordData);
    return response.data;
  }

  async sendRecoverPasswordEmail(email: ForgotPasswordRequestDTO) {
    const response = await this.axiosInstance.post('/password/forgot', email);
    console.log(response)
    return response.data;
  }

  // Habit Endpoints
  async createHabit(habitData: CreateHabitDto): Promise<Habit> {
    const response = await this.axiosInstance.post('/habits/create', habitData);
    return response.data;
  }

  async getHabits(): Promise<Habit[]> {
    const response = await this.axiosInstance.get('/habits');
    return response.data;
  }

  async getHabitById(id: number): Promise<Habit> {
    const response = await this.axiosInstance.get(`/habits/${id}`);
    return response.data;
  }

  async getHabitHistory(id: number): Promise<HabitCompletion[]> {
    const response = await this.axiosInstance.get(`/habits/history?habitId=${id}`);
    return response.data;
  }

  async updateHabit(id: number, habitData: CreateHabitDto): Promise<Habit> {
    const response = await this.axiosInstance.put(`/habits/${id}`, habitData);
    return response.data;
  }

  async deleteHabit(id: number) {
    const response = await this.axiosInstance.delete(`/habits/${id}`);
    return response.data;
  }

  async logHabitCompletion(habitId: number, completedAt: string, notes?: string) {
    const response = await this.axiosInstance.post('/habits/log', { 
      habitId, 
      completedAt, 
      notes 
    });
    return response.data;
  }

  // Mood Endpoints
  async createMood(moodData: CreateMoodDto): Promise<Mood> {
    const response = await this.axiosInstance.post('/moods', moodData);
    return response.data;
  }

  async getMoods(): Promise<Mood[]> {
    const response = await this.axiosInstance.get('/moods');
    return response.data;
  }

  async getMoodById(id: number): Promise<Mood> {
    const response = await this.axiosInstance.get(`/moods/${id}`);
    return response.data;
  }

  async updateMood(id: number, moodData: CreateMoodDto): Promise<Mood> {
    const response = await this.axiosInstance.put(`/moods/${id}`, moodData);
    return response.data;
  }

  async deleteMood(id: number) {
    const response = await this.axiosInstance.delete(`/moods/${id}`);
    return response.data;
  }

  // Quick Notes Endpoints
  async createQuickNote(noteData: CreateQuickNoteDto): Promise<QuickNote> {
    const response = await this.axiosInstance.post('/notes', noteData);
    return response.data;
  }

  async getQuickNotes(): Promise<QuickNote[]> {
    const response = await this.axiosInstance.get('/notes');
    return response.data;
  }

  async getQuickNoteById(id: number): Promise<QuickNote> {
    const response = await this.axiosInstance.get(`/notes/${id}`);
    return response.data;
  }

  async updateQuickNote(id: number, noteData: CreateQuickNoteDto): Promise<QuickNote> {
    const response = await this.axiosInstance.put(`/notes/${id}`, noteData);
    return response.data;
  }

  async deleteQuickNote(id: number) {
    const response = await this.axiosInstance.delete(`/notes/${id}`);
    return response.data;
  }

  // Tag Endpoints
  async createTag(tagData: CreateTagDto): Promise<Tag> {
    const response = await this.axiosInstance.post('/tags', tagData);
    return response.data;
  }

  async getTags(): Promise<Tag[]> {
    const response = await this.axiosInstance.get('/tags');
    return response.data;
  }

  async getTagById(id: number): Promise<Tag> {
    const response = await this.axiosInstance.get(`/tags/${id}`);
    return response.data;
  }

  async updateTag(id: number, tagData: CreateTagDto): Promise<Tag> {
    const response = await this.axiosInstance.put(`/tags/${id}`, tagData);
    return response.data;
  }

  async deleteTag(id: number) {
    const response = await this.axiosInstance.delete(`/tags/${id}`);
    return response.data;
  }
}

export default new ApiService();