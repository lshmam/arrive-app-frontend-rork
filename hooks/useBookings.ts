import { bookingService, CreateBookingRequest } from '@/services/bookingService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useMyBookings(role?: 'host' | 'renter') {
    return useQuery({
        queryKey: ['bookings', role],
        queryFn: () => bookingService.getMyBookings(role),
    });
}

export function useBookingById(id: string) {
    return useQuery({
        queryKey: ['booking', id],
        queryFn: () => bookingService.getBookingById(id),
        enabled: !!id,
    });
}

export function useCreateBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBookingRequest) => bookingService.createBooking(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}

export function useCancelBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => bookingService.cancelBooking(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}

export function useConfirmBooking() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => bookingService.confirmBooking(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
        },
    });
}
