export type ListingStatus = 'active' | 'pending' | 'draft' | 'inactive';
export type SpaceType = 'outdoor' | 'indoor' | 'garage' | 'driveway' | 'street' | 'lot';
export type VehicleType = 'sedan' | 'suv' | 'truck' | 'motorcycle' | 'van';
export type AccessType = 'key' | 'code' | 'app' | 'attendant' | 'open';
export type BookingStatus = 'upcoming' | 'active' | 'Past' | 'cancelled';

export interface ParkingListing {
    id: string;
    title: string;
    address: string;
    latitude: number;
    longitude: number;
    photos: string[];
    spaceType: SpaceType;
    maxVehicleType: VehicleType;
    hourlyRate: number;
    dailyRate: number;
    dimensions?: string;
    accessType: AccessType;
    accessInstructions?: string;
    description: string;
    amenities: string[];
    status: ListingStatus;
    totalEarnings: number;
    activeBookings: number;
}

export interface Booking {
    id: string;
    listingId: string;
    listingTitle: string;
    listingAddress: string;
    renterName: string;
    renterInitials: string;
    vehicleType: string;
    startTime: Date;
    endTime: Date;
    totalAmount: number;
    status: BookingStatus;
    paymentStatus: 'pending' | 'paid' | 'refunded';
}

export interface Earning {
    id: string;
    date: Date;
    bookingId: string;
    amount: number;
    status: 'pending' | 'paid';
    payoutDate?: Date;
}

export interface OwnerProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo?: string;
    joinedDate: Date;
    totalEarnings: number;
    activeListings: number;
    rating: number;
    reviewCount: number;
    bankingSetup: boolean;
}

export interface RenterProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo?: string;
    joinedDate: Date;
    totalBookings: number;
    rating: number;
    reviewCount: number;
}

export interface RenterBooking {
    id: string;
    listingId: string;
    listingTitle: string;
    listingAddress: string;
    listingPhoto: string;
    hostName: string;
    hostRating: number;
    licensePlate: string;
    vehicleType: string;
    startTime: Date;
    endTime: Date;
    totalAmount: number;
    status: BookingStatus;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    accessInstructions?: string;
}

export interface PaymentMethod {
    id: string;
    type: 'card';
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
}

export interface SearchFilters {
    startTime?: Date;
    endTime?: Date;
    minPrice?: number;
    maxPrice?: number;
    spaceTypes: SpaceType[];
    vehicleType?: VehicleType;
    amenities: string[];
    evCharging: boolean;
}
