import ParkingMap from '@/components/ParkingMap';
import { useListings } from '@/hooks/useListings';
import { ParkingListing } from '@/types';
import { router, Stack } from 'expo-router';
import { SlidersHorizontal, Star, Zap } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

type ViewMode = 'map' | 'list';

export default function RenterHomeScreen() {
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
            accessType: '24/7',
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
            <Stack.Screen
                options={{
                    headerRight: () => (
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
                    ),
                }}
            />
            <View style={styles.searchContainer}>
                <View style={[styles.searchBar, { paddingHorizontal: 0, borderWidth: 0, backgroundColor: 'transparent' }]}>
                    <GooglePlacesAutocomplete
                        placeholder='Where are you headed?'
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
                            textInput: {
                                height: 48,
                                borderRadius: 12,
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                fontSize: 16,
                                flex: 1,
                                backgroundColor: '#FFF',
                                borderWidth: 1,
                                borderColor: '#E0E0E0',
                            },
                            listView: {
                                position: 'absolute',
                                top: 55,
                                left: 0,
                                right: 0,
                                backgroundColor: 'white',
                                borderRadius: 5,
                                zIndex: 1000,
                                elevation: 10,
                            }
                        }}
                        enablePoweredByContainer={false}
                    />
                </View>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowFilters(!showFilters)}
                >
                    <SlidersHorizontal size={20} color="#000" />
                </TouchableOpacity>
            </View>

            {isLoading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#000" />
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
        backgroundColor: '#FFF',
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFF',
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 48,
        gap: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    headerToggle: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 3,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    headerToggleButton: {
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 6,
    },
    headerToggleButtonActive: {
        backgroundColor: '#000',
    },
    headerToggleText: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: '#666',
    },
    headerToggleTextActive: {
        color: '#FFF',
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
        backgroundColor: '#FFF',
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
        color: '#000',
        flex: 1,
    },
    carouselPrice: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#000',
    },
    listContainer: {
        flex: 1,
    },
    listHeader: {
        padding: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    resultsText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#666',
    },
    listingCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
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
        color: '#000',
        flex: 1,
    },
    evBadge: {
        width: 24,
        height: 24,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listingAddress: {
        fontSize: 14,
        color: '#666',
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
        color: '#000',
    },
    priceText: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#000',
    },
    amenitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    amenityTag: {
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    amenityText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500' as const,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        color: '#EF4444',
        textAlign: 'center',
        marginBottom: 8,
    },
    errorSubText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});
