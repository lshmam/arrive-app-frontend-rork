import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Search, SlidersHorizontal, Star, Zap } from 'lucide-react-native';
import { router } from 'expo-router';
import { listings } from '@/constants/mockData';
import { ParkingListing } from '@/types';

const { width, height } = Dimensions.get('window');

type ViewMode = 'map' | 'list';

export default function RenterHomeScreen() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [viewMode, setViewMode] = useState<ViewMode>('map');

    const filteredListings = listings.filter((listing) =>
        listing.status === 'active' &&
        (searchQuery === '' || listing.address.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#9CA3AF" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Where are you parking?"
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowFilters(!showFilters)}
                >
                    <SlidersHorizontal size={20} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.viewToggle}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        viewMode === 'map' && styles.toggleButtonActive
                    ]}
                    onPress={() => setViewMode('map')}
                >
                    <Text style={[
                        styles.toggleText,
                        viewMode === 'map' && styles.toggleTextActive
                    ]}>
                        Map
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        viewMode === 'list' && styles.toggleButtonActive
                    ]}
                    onPress={() => setViewMode('list')}
                >
                    <Text style={[
                        styles.toggleText,
                        viewMode === 'list' && styles.toggleTextActive
                    ]}>
                        List
                    </Text>
                </TouchableOpacity>
            </View>

            {viewMode === 'map' ? (
                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        initialRegion={{
                            latitude: 43.6532,
                            longitude: -79.3832,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                    >
                        {filteredListings.map((listing) => (
                            <Marker
                                key={listing.id}
                                coordinate={{
                                    latitude: listing.latitude,
                                    longitude: listing.longitude,
                                }}
                                onPress={() => router.push(`/listing-detail?id=${listing.id}` as any)}
                            >
                                <View style={styles.markerContainer}>
                                    <View style={styles.marker}>
                                        <Text style={styles.markerText}>${listing.hourlyRate}</Text>
                                    </View>
                                </View>
                            </Marker>
                        ))}
                    </MapView>

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
    map: {
        width: width,
        height: height,
    },
    markerContainer: {
        alignItems: 'center',
    },
    marker: {
        backgroundColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    markerText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700' as const,
    },
    viewToggle: {
        position: 'absolute',
        top: 16,
        right: 16,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        zIndex: 1000,
    },
    toggleButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
    },
    toggleButtonActive: {
        backgroundColor: '#000',
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#666',
    },
    toggleTextActive: {
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
});
