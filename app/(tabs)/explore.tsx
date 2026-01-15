import Header from '@/components/Header';
import ParkingMap from '@/components/ParkingMap';
import { useListings } from '@/hooks/useListings';
import { ParkingListing } from '@/types';
import { router, Stack } from 'expo-router';
import { Star, Zap } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Keyboard, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { width, height } = Dimensions.get('window');

type ViewMode = 'map' | 'list';

export default function ExploreScreen() {
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<ViewMode>('map');
    const [mapRegion, setMapRegion] = useState<{
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    } | null>(null);

    // Fetch listings from API
    // The hook uses the mock mode in api.ts by default
    const { data: apiListings, isLoading, error } = useListings({ status: 'active' });

    // Map API listings to ParkingListing type
    const listings: ParkingListing[] = useMemo(() => {
        if (!apiListings) return [];

        return apiListings.map(listing => ({
            id: listing.id,
            title: listing.title,
            description: listing.description,
            address: listing.address,
            hourlyRate: listing.pricePerHour,

            // Add required properties found in types but maybe missing in API response
            // We use defaults for now to ensure type safety
            dailyRate: listing.pricePerDay || listing.pricePerHour * 10,
            accessType: '24/7' as any,
            spaceType: listing.covered ? 'indoor' : 'outdoor',
            maxVehicleType: 'suv',
            instantBooking: true,

            latitude: listing.latitude,
            longitude: listing.longitude,
            photos: listing.photos || (listing.previewImageUrl ? [listing.previewImageUrl] : ['https://via.placeholder.com/400x300']),
            amenities: [
                ...(listing.evCharger ? ['EV Charging'] : []),
                ...(listing.covered ? ['Covered'] : []),
                ...(listing.security ? ['Security'] : []),
            ],
            status: 'active',
            ownerId: listing.host?.id || 'unknown',
            createdAt: new Date().toISOString(),
            totalEarnings: 0,
            activeBookings: 0,
        }));
    }, [apiListings]);

    const filteredListings = listings.filter((listing) =>
        listing.status === 'active'
    );

    const renderListingCard = (listing: ParkingListing) => (
        <TouchableOpacity
            key={listing.id}
            style={styles.listingCard}
            onPress={() => router.push(`/listing-detail?id=${listing.id}` as any)}
        >
            <Image source={{ uri: listing.photos[0] }} style={styles.listingImage} />
            <View style={styles.listingInfo}>
                <View style={styles.listingHeader}>
                    <Text style={styles.listingTitle} numberOfLines={1}>{listing.title}</Text>
                    {listing.amenities.includes('EV Charging') && (
                        <View style={styles.evBadge}>
                            <Zap size={12} color="#000" />
                        </View>
                    )}
                </View>
                <Text style={styles.listingAddress} numberOfLines={1}>{listing.address}</Text>
                <View style={styles.listingFooter}>
                    <View style={styles.ratingContainer}>
                        <Star size={14} color="#000" fill="#000" />
                        <Text style={styles.ratingText}>4.8</Text>
                    </View>
                    <Text style={styles.priceText}>${listing.hourlyRate}/hr</Text>
                </View>
                <View style={styles.amenitiesContainer}>
                    {listing.amenities.slice(0, 3).map((amenity, idx) => (
                        <View key={idx} style={styles.amenityTag}>
                            <Text style={styles.amenityText}>{amenity}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <Header />

            <View style={styles.searchContainer}>
                <View style={styles.searchBarWrapper}>
                    <GooglePlacesAutocomplete
                        placeholder='Where are you headed?'
                        textInputProps={{
                            placeholderTextColor: '#999',
                        }}
                        // TODO: REPLACE WITH YOUR ACTUAL GOOGLE MAPS API KEY
                        query={{
                            key: 'YOUR_GOOGLE_MAPS_API_KEY',
                            language: 'en',
                        }}
                        onPress={(data, details = null) => {
                            if (details) {
                                const { lat, lng } = details.geometry.location;
                                setMapRegion({
                                    latitude: lat,
                                    longitude: lng,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                });
                                Keyboard.dismiss();
                            }
                        }}
                        fetchDetails={true}
                        styles={{
                            container: { flex: 1 },
                            textInputContainer: {
                                backgroundColor: 'transparent',
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                            },
                            textInput: {
                                height: 48,
                                borderRadius: 0,
                                paddingVertical: 5,
                                paddingHorizontal: 0,
                                fontSize: 16,
                                flex: 1,
                                backgroundColor: 'transparent',
                                color: '#FFF',
                            },
                            listView: {
                                position: 'absolute',
                                top: 55,
                                left: 0,
                                right: 0,
                                backgroundColor: '#222',
                                borderRadius: 5,
                                zIndex: 1000,
                                elevation: 10,
                            },
                            row: {
                                backgroundColor: '#222',
                            },
                            description: {
                                color: '#FFF',
                            },
                            separator: {
                                backgroundColor: '#333',
                            },
                        }}
                        enablePoweredByContainer={false}
                    />
                </View>
                <View style={styles.headerToggleWrapper}>
                    <View style={styles.headerToggle}>
                        <TouchableOpacity
                            style={[
                                styles.headerToggleButton,
                                viewMode === 'map' && styles.headerToggleButtonActive
                            ]}
                            onPress={() => setViewMode('map')}
                        >
                            <Text style={[
                                styles.headerToggleText,
                                viewMode === 'map' && styles.headerToggleTextActive
                            ]}>
                                Map
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.headerToggleButton,
                                viewMode === 'list' && styles.headerToggleButtonActive
                            ]}
                            onPress={() => setViewMode('list')}
                        >
                            <Text style={[
                                styles.headerToggleText,
                                viewMode === 'list' && styles.headerToggleTextActive
                            ]}>
                                List
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {isLoading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#EAB308" />
                    <Text style={styles.loadingText}>Loading parking spots...</Text>
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>Failed to load listings</Text>
                    <Text style={styles.errorSubText}>Please check your connection and try again.</Text>
                </View>
            ) : (
                <>
                    {viewMode === 'map' ? (
                        <View style={styles.mapContainer}>
                            <ParkingMap
                                listings={filteredListings}
                                focusedRegion={mapRegion}
                                onListingPress={(id) => router.push(`/listing-detail?id=${id}` as any)}
                            />

                            <View style={styles.carouselContainer}>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.carousel}
                                >
                                    {filteredListings.map((listing) => (
                                        <TouchableOpacity
                                            key={listing.id}
                                            style={styles.carouselCard}
                                            onPress={() => router.push(`/listing-detail?id=${listing.id}` as any)}
                                        >
                                            <Image source={{ uri: listing.photos[0] }} style={styles.carouselImage} />
                                            <View style={styles.carouselInfo}>
                                                <Text style={styles.carouselTitle} numberOfLines={1}>{listing.title}</Text>
                                                <Text style={styles.carouselPrice}>${listing.hourlyRate}/hr</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    ) : (
                        <ScrollView style={styles.listContainer}>
                            <View style={styles.listHeader}>
                                <Text style={styles.resultsText}>{filteredListings.length} parking spots available</Text>
                            </View>
                            {filteredListings.map(renderListingCard)}
                        </ScrollView>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        paddingTop: 60,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#111',
        gap: 12,
    },
    searchBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#222',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 52,
        zIndex: 10, // Ensure it's above other elements if needed
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: '#222',
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },

    headerToggleWrapper: {
        marginTop: 12, // More space
        paddingHorizontal: 0, // Wrapper spans full width of searchContainer which has padding
    },
    headerToggle: {
        flexDirection: 'row',
        backgroundColor: '#222',
        borderRadius: 12,
        padding: 4,
        borderWidth: 1,
        borderColor: '#333',
    },
    headerToggleButton: {
        flex: 1, // Span available space
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 8,
    },
    headerToggleButtonActive: {
        backgroundColor: '#EAB308',
    },
    headerToggleText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#888',
    },
    headerToggleTextActive: {
        color: '#000',
    },
    carouselContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
    },
    carousel: {
        paddingHorizontal: 16,
        gap: 12,
    },
    carouselCard: {
        width: 280,
        backgroundColor: '#222',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 5,
        overflow: 'hidden',
    },
    carouselImage: {
        width: '100%',
        height: 140,
    },
    carouselInfo: {
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    carouselTitle: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#FFF',
        flex: 1,
    },
    carouselPrice: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#FFF',
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#111',
    },
    listHeader: {
        padding: 16,
        backgroundColor: '#111',
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    resultsText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#888',
    },
    listingCard: {
        backgroundColor: '#222',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    listingImage: {
        width: '100%',
        height: 200,
    },
    listingInfo: {
        padding: 16,
    },
    listingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    listingTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#FFF',
        flex: 1,
    },
    evBadge: {
        width: 24,
        height: 24,
        backgroundColor: '#333',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listingAddress: {
        fontSize: 14,
        color: '#888',
        marginBottom: 12,
    },
    listingFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#FFF',
    },
    priceText: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#FFF',
    },
    amenitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    amenityTag: {
        backgroundColor: '#333',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    amenityText: {
        fontSize: 12,
        color: '#CCC',
        fontWeight: '500' as const,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#111',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#888',
    },
    errorText: {
        fontSize: 16,
        color: '#EF4444',
        textAlign: 'center',
        marginBottom: 8,
    },
    errorSubText: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});
