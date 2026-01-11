import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Star, MapPin, Shield, Zap, Clock, Car, ChevronLeft } from 'lucide-react-native';
import { listings } from '@/constants/mockData';

const { width } = Dimensions.get('window');

export default function ListingDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

    const listing = listings.find((l) => l.id === id);

    if (!listing) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Listing not found</Text>
            </View>
        );
    }

    const amenityIcons: Record<string, React.ReactNode> = {
        'EV Charging': <Zap size={18} color="#000" />,
        'Security Camera': <Shield size={18} color="#000" />,
        '24/7 Access': <Clock size={18} color="#000" />,
        'Covered': <Car size={18} color="#000" />,
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.imageContainer}>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={(event) => {
                                const scrollX = event.nativeEvent.contentOffset.x;
                                const index = Math.round(scrollX / width);
                                setActiveImageIndex(index);
                            }}
                            scrollEventThrottle={16}
                        >
                            {listing.photos.map((photo, index) => (
                                <Image key={index} source={{ uri: photo }} style={styles.image} />
                            ))}
                        </ScrollView>

                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <ChevronLeft size={24} color="#111827" />
                        </TouchableOpacity>

                        <View style={styles.imageIndicator}>
                            {listing.photos.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.dot,
                                        index === activeImageIndex && styles.activeDot,
                                    ]}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.header}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{listing.title}</Text>
                                <View style={styles.ratingContainer}>
                                    <Star size={16} color="#FBBF24" fill="#FBBF24" />
                                    <Text style={styles.ratingText}>4.8</Text>
                                    <Text style={styles.reviewCount}>(127 reviews)</Text>
                                </View>
                            </View>
                            <View style={styles.priceContainer}>
                                <Text style={styles.price}>${listing.hourlyRate}</Text>
                                <Text style={styles.priceUnit}>/hour</Text>
                            </View>
                        </View>

                        <View style={styles.locationContainer}>
                            <MapPin size={18} color="#6B7280" />
                            <Text style={styles.address}>{listing.address}</Text>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Host Information</Text>
                            <View style={styles.hostContainer}>
                                <View style={styles.hostAvatar}>
                                    <Text style={styles.hostInitials}>SJ</Text>
                                </View>
                                <View style={styles.hostInfo}>
                                    <Text style={styles.hostName}>Sarah J.</Text>
                                    <View style={styles.hostRating}>
                                        <Star size={14} color="#FBBF24" fill="#FBBF24" />
                                        <Text style={styles.hostRatingText}>4.8 · 127 reviews</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Space Details</Text>
                            <View style={styles.detailsGrid}>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Type</Text>
                                    <Text style={styles.detailValue}>{listing.spaceType}</Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Max Vehicle</Text>
                                    <Text style={styles.detailValue}>{listing.maxVehicleType}</Text>
                                </View>
                                {listing.dimensions && (
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailLabel}>Dimensions</Text>
                                        <Text style={styles.detailValue}>{listing.dimensions}</Text>
                                    </View>
                                )}
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Access</Text>
                                    <Text style={styles.detailValue}>{listing.accessType}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.description}>{listing.description}</Text>
                        </View>

                        {listing.accessInstructions && (
                            <>
                                <View style={styles.divider} />
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Access Instructions</Text>
                                    <View style={styles.instructionsBox}>
                                        <Text style={styles.instructionsText}>{listing.accessInstructions}</Text>
                                    </View>
                                </View>
                            </>
                        )}

                        <View style={styles.divider} />

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Amenities</Text>
                            <View style={styles.amenitiesGrid}>
                                {listing.amenities.map((amenity, index) => (
                                    <View key={index} style={styles.amenityItem}>
                                        {amenityIcons[amenity] || <Shield size={18} color="#000" />}
                                        <Text style={styles.amenityText}>{amenity}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.spacer} />
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.footerPrice}>
                        <Text style={styles.footerPriceAmount}>${listing.hourlyRate}/hr</Text>
                        <Text style={styles.footerPriceLabel}>or ${listing.dailyRate}/day</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.bookButton}
                        onPress={() => router.push(`/booking?listingId=${listing.id}` as any)}
                    >
                        <Text style={styles.bookButtonText}>Select Time & Book</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    errorText: {
        fontSize: 16,
        color: '#6B7280',
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: width,
        height: 300,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageIndicator: {
        position: 'absolute',
        bottom: 16,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeDot: {
        backgroundColor: '#FFF',
        width: 20,
    },
    content: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    titleContainer: {
        flex: 1,
        marginRight: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#111827',
    },
    reviewCount: {
        fontSize: 15,
        color: '#6B7280',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: '#000',
    },
    priceUnit: {
        fontSize: 14,
        color: '#6B7280',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    address: {
        fontSize: 15,
        color: '#6B7280',
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 20,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 16,
    },
    hostContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    hostAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hostInitials: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#FFF',
    },
    hostInfo: {
        flex: 1,
    },
    hostName: {
        fontSize: 17,
        fontWeight: '600' as const,
        color: '#111827',
        marginBottom: 4,
    },
    hostRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    hostRatingText: {
        fontSize: 14,
        color: '#6B7280',
    },
    detailsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
    },
    detailItem: {
        width: '47%',
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
    },
    detailLabel: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
        textTransform: 'capitalize' as const,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#111827',
        textTransform: 'capitalize' as const,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        color: '#4B5563',
    },
    instructionsBox: {
        backgroundColor: '#F5F5F5',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: '#000',
    },
    instructionsText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#000',
    },
    amenitiesGrid: {
        gap: 12,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 8,
    },
    amenityText: {
        fontSize: 15,
        color: '#111827',
    },
    spacer: {
        height: 100,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    footerPrice: {
        flex: 1,
    },
    footerPriceAmount: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#111827',
    },
    footerPriceLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    bookButton: {
        backgroundColor: '#000',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
    },
    bookButtonText: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#FFF',
    },
});
