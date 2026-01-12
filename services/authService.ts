import api from './api';

export interface LoginRequest {
    email: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    role?: 'RENTER' | 'OWNER';
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    token: string;
}

export const authService = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post('/auth/login', data);
        return response.data;
    },

    async signup(data: SignupRequest): Promise<AuthResponse> {
        const response = await api.post('/auth/signup', data);
        return response.data;
    },

    async sendOtp(contact: string, type: 'EMAIL' | 'PHONE'): Promise<{ message: string }> {
        const response = await api.post('/auth/send-otp', { contact, type });
        return response.data;
    },

    async verifyOtp(contact: string, code: string, type: 'EMAIL' | 'PHONE'): Promise<{ message: string }> {
        const response = await api.post('/auth/verify-otp', { contact, code, type });
        return response.data;
    },
};
