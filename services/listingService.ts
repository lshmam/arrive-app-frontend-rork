import api from './api';

export interface Listing {
    id: string;
    title: string;
    description: string;
    pricePerHour: number;
    pricePerDay?: number;
    pricePerMonth?: number;
    address: string;
    latitude: number;
    longitude: number;
    previewImageUrl?: string;
    photos?: string[];
    evCharger?: boolean;
    covered?: boolean;
    security?: boolean;
    shortTerm?: boolean;
    longTerm?: boolean;
    host?: {
        id: string;
        name: string;
    };
}

export interface CreateListingRequest {
    title: string;
    description: string;
    photos: string[];
    pricePerHour: number;
    pricePerDay?: number;
    pricePerMonth?: number;
    latitude: number;
    longitude: number;
    address: string;
    evCharger?: boolean;
    covered?: boolean;
    security?: boolean;
    shortTerm?: boolean;
    longTerm?: boolean;
}

export const listingService = {
    async getListings(filters?: { status?: string }): Promise<Listing[]> {
        const response = await api.get('/listings', { params: filters });
        return response.data;
    },

    async getListingById(id: string): Promise<Listing> {
        const response = await api.get(`/listings/${id}`);
        return response.data;
    },

    async createListing(data: CreateListingRequest): Promise<Listing> {
        const response = await api.post('/listings', data);
        return response.data;
    },

    async updateListing(id: string, data: Partial<CreateListingRequest>): Promise<Listing> {
        const response = await api.put(`/listings/${id}`, data);
        return response.data;
    },

    async deleteListing(id: string): Promise<{ message: string }> {
        const response = await api.delete(`/listings/${id}`);
        return response.data;
    },

    async getMyListings(): Promise<Listing[]> {
        const response = await api.get('/listings/host/my-listings');
        return response.data;
    },

    async getPriceRecommendation(lat: number, lng: number): Promise<{
        recommendedPricePerHour: number;
        recommendedPricePerDay?: number;
        competitorCount: number;
    }> {
        const response = await api.get(`/listings/price-recommendation/${lat}/${lng}`);
        return response.data;
    },
};
