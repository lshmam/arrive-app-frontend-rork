import { listings } from '@/constants/mockData';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Car, ChevronLeft, Clock, Shield, Star, Zap } from 'lucide-react-native';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Image Gallery */}
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

                        <View style={styles.imageCounter}>
                            <Text style={styles.imageCounterText}>
                                {activeImageIndex + 1} / {listing.photos.length}
                            </Text>
                        </View>
                    </View>

                    {/* Main Content Card */}
                    <View style={styles.contentCard}>
                        {/* Title and Location */}
                        <View style={styles.titleSection}>
                            <Text style={styles.title}>{listing.title}</Text>
                            <Text style={styles.subtitle}>{listing.spaceType} in {listing.address.split(',')[1]?.trim() || 'Downtown'}</Text>
                            <Text style={styles.details}>
                                {listing.maxVehicleType} · {listing.accessType}
                            </Text>
                        </View>

                        {/* Rating and Reviews Row */}
                        <View style={styles.statsRow}>
                            <View style={styles.statBadge}>
                                <Star size={16} color="#000" fill="#000" />
                                <Text style={styles.statText}>4.92</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statBadge}>
                                <Text style={styles.statText}>619</Text>
                                <Text style={styles.statLabel}>Reviews</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Host Information */}
                        <View style={styles.hostSection}>
                            <View style={styles.hostHeader}>
                                <View style={styles.hostAvatar}>
                                    <Text style={styles.hostInitials}>SJ</Text>
                                    <View style={styles.superHostBadge} />
                                </View>
                                <View style={styles.hostInfo}>
                                    <Text style={styles.hostName}>Hosted by Sarah J.</Text>
                                    <Text style={styles.hostMeta}>Superhost · 10 years hosting</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Description */}
                        <View style={styles.section}>
                            <Text style={styles.description}>{listing.description}</Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Amenities */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>What this space offers</Text>
                            <View style={styles.amenitiesList}>
                                {listing.amenities.map((amenity, index) => (
                                    <View key={index} style={styles.amenityRow}>
                                        {amenityIcons[amenity] || <Shield size={20} color="#000" />}
                                        <Text style={styles.amenityText}>{amenity}</Text>
                                    </View>
                                ))}
                            </View>
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

                        <View style={styles.spacer} />
                    </View>
                </ScrollView>

                {/* Footer with Pricing */}
                <View style={styles.footer}>
                    <View style={styles.footerPrice}>
                        <View style={styles.priceRow}>
                            <Text style={styles.footerPriceAmount}>${listing.hourlyRate}</Text>
                            <Text style={styles.footerPriceUnit}>/hour</Text>
                        </View>
                        <Text style={styles.footerPriceLabel}>or ${listing.dailyRate}/day</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.reserveButton}
                        onPress={() => router.push(`/booking?listingId=${listing.id}` as any)}
                    >
                        <Text style={styles.reserveButtonText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
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
        backgroundColor: '#000',
    },
    image: {
        width: width,
        height: 380,
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
    imageCounter: {
        position: 'absolute',
        bottom: 40,
        right: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    imageCounterText: {
        color: '#FFF',
        fontSize: 13,
        fontWeight: '600' as const,
    },
    contentCard: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        marginTop: -24,
        paddingTop: 24,
        paddingHorizontal: 20,
    },
    titleSection: {
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '700' as const,
        color: '#000',
        marginBottom: 8,
        lineHeight: 32,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 4,
    },
    details: {
        fontSize: 15,
        color: '#6B7280',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        gap: 12,
    },
    statBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#E5E7EB',
    },
    statText: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#000',
    },
    statLabel: {
        fontSize: 16,
        color: '#000',
        fontWeight: '400' as const,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 24,
    },
    hostSection: {
        marginBottom: 0,
    },
    hostHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    hostAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    hostInitials: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#FFF',
    },
    superHostBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FF385C',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    hostInfo: {
        flex: 1,
    },
    hostName: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: '#000',
        marginBottom: 4,
    },
    hostMeta: {
        fontSize: 14,
        color: '#6B7280',
    },
    section: {
        marginBottom: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#000',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#000',
    },
    amenitiesList: {
        gap: 16,
    },
    amenityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    amenityText: {
        fontSize: 16,
        color: '#000',
    },
    instructionsBox: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#000',
    },
    instructionsText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#000',
    },
    spacer: {
        height: 100,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingBottom: 28,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    footerPrice: {
        flex: 1,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    footerPriceAmount: {
        fontSize: 22,
        fontWeight: '700' as const,
        color: '#000',
    },
    footerPriceUnit: {
        fontSize: 16,
        color: '#000',
        marginLeft: 2,
    },
    footerPriceLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    reserveButton: {
        backgroundColor: '#000',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 12,
    },
    reserveButtonText: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#FFF',
    },
});
