import { CreateListingRequest, listingService } from '@/services/listingService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useListings(filters?: { status?: string }) {
    return useQuery({
        queryKey: ['listings', filters],
        queryFn: () => listingService.getListings(filters),
    });
}

export function useListingById(id: string) {
    return useQuery({
        queryKey: ['listing', id],
        queryFn: () => listingService.getListingById(id),
        enabled: !!id,
    });
}

export function useMyListings() {
    return useQuery({
        queryKey: ['my-listings'],
        queryFn: () => listingService.getMyListings(),
    });
}

export function useCreateListing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateListingRequest) => listingService.createListing(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listings'] });
            queryClient.invalidateQueries({ queryKey: ['my-listings'] });
        },
    });
}

export function useUpdateListing(id: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Partial<CreateListingRequest>) => listingService.updateListing(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listings'] });
            queryClient.invalidateQueries({ queryKey: ['listing', id] });
            queryClient.invalidateQueries({ queryKey: ['my-listings'] });
        },
    });
}

export function useDeleteListing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => listingService.deleteListing(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listings'] });
            queryClient.invalidateQueries({ queryKey: ['my-listings'] });
        },
    });
}
