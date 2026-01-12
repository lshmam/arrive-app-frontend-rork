import axios from 'axios';

// --- CONFIGURATION ---
const BASE_URL = 'http://localhost:3000/api/v1'; // Standard NestJS default
const USE_MOCK_API = true; // TOGGLE THIS TO FALSE WHEN RUNNING REAL BACKEND

// --- AXIOS INSTANCE ---
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- TYPES ---
export interface ApiError {
    message: string;
    statusCode: number;
}

// --- MOCK DATA GENERATORS ---
const mockUser = {
    id: 'user-123',
    email: 'renter@example.com',
    name: 'John Renter',
    role: 'RENTER',
    token: 'mock-jwt-token-xyz',
};

const mockListings = [
    {
        id: 'listing-1',
        title: 'Downtown Secure Garage (Via API Service)',
        description: '24/7 access, security cameras, covered.',
        pricePerHour: 15,
        address: '123 Main St, Vancouver',
        latitude: 49.2827,
        longitude: -123.1207,
        previewImageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?auto=format&fit=crop&q=80',
        host: { id: 'host-1', name: 'Alice Host' },
    },
    {
        id: 'listing-2',
        title: 'Cheap Driveway Spot',
        description: 'Easy access, close to transit.',
        pricePerHour: 5,
        address: '456 Side Ave, Vancouver',
        latitude: 49.2850,
        longitude: -123.1300,
        previewImageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&q=80',
        host: { id: 'host-2', name: 'Bob Owner' },
    }
];

// --- MOCK INTERCEPTOR ---
if (USE_MOCK_API) {
    console.log('⚠️ API MOCK MODE ENABLED');

    api.interceptors.request.use(async (config) => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // --- AUTH ROUTES ---
        if (config.url === '/auth/login') {
            console.log('Mocking Login:', config.data);
            // Simulate successful login
            throw {
                response: {
                    status: 200,
                    data: { user: mockUser, token: mockUser.token }
                }
            };
        }

        if (config.url === '/auth/signup') {
            console.log('Mocking Signup:', config.data);
            throw {
                response: {
                    status: 201,
                    data: { user: mockUser, token: mockUser.token, message: 'User created' }
                }
            };
        }

        // --- LISTING ROUTES ---
        if (config.url === '/listings' && config.method === 'get') {
            console.log('Mocking Get Listings');
            throw {
                response: {
                    status: 200,
                    data: mockListings
                }
            };
        }

        if (config.url?.startsWith('/listings/') && config.method === 'get') {
            const id = config.url.split('/')[2];
            const listing = mockListings.find(l => l.id === id) || mockListings[0];
            console.log(`Mocking Get Listing ${id}`);
            throw {
                response: {
                    status: 200,
                    data: listing
                }
            };
        }

        // --- BOOKING ROUTES ---
        if (config.url === '/bookings' && config.method === 'post') {
            console.log('Mocking Create Booking');
            throw {
                response: {
                    status: 201,
                    data: {
                        booking: { id: `booking-${Date.now()}`, status: 'PENDING', ...JSON.parse(config.data || '{}') },
                        clientSecret: 'mock_secret'
                    }
                }
            };
        }

        // Default 404 for un-mocked routes
        console.warn(`⚠️ Un-mocked route hit: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    });

    // Intercept responses to unwrap the "thrown" mock responses
    api.interceptors.response.use(
        response => response,
        error => {
            // If the error contains a 'response' property, it's our mock data thrown from the request interceptor
            if (error.response) {
                // Return the mock response like a real success
                return Promise.resolve(error.response);
            }
            return Promise.reject(error);
        }
    );
}

export default api;
