import api from './api';

export interface Booking {
    id: string;
    listingId: string;
    renterId: string;
    startTime: string;
    endTime: string;
    totalPrice: number;
    status: 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
    licensePlate: string;
    vehicleModel?: string;
    listing?: {
        id: string;
        title: string;
        address: string;
        pricePerHour: number;
    };
}

export interface CreateBookingRequest {
    listingId: string;
    startTime: string;
    endTime: string;
    licensePlate: string;
    vehicleModel?: string;
}

export interface CreateBookingResponse {
    booking: Booking;
    clientSecret: string; // For Stripe payment
}

export const bookingService = {
    async createBooking(data: CreateBookingRequest): Promise<CreateBookingResponse> {
        const response = await api.post('/bookings', data);
        return response.data;
    },

    async getMyBookings(role?: 'host' | 'renter'): Promise<Booking[]> {
        const response = await api.get('/bookings', { params: { role } });
        return response.data;
    },

    async getBookingById(id: string): Promise<Booking> {
        const response = await api.get(`/bookings/${id}`);
        return response.data;
    },

    async updateBooking(id: string, data: Partial<CreateBookingRequest>): Promise<Booking> {
        const response = await api.put(`/bookings/${id}`, data);
        return response.data;
    },

    async cancelBooking(id: string): Promise<{ message: string }> {
        const response = await api.post(`/bookings/${id}/cancel`);
        return response.data;
    },

    async confirmBooking(id: string): Promise<Booking> {
        const response = await api.post(`/bookings/${id}/confirm`);
        return response.data;
    },
};
