import Header from '@/components/Header';
import { listings, renterBookings } from '@/constants/mockData';
import { ListingStatus } from '@/types';
import { Link, Stack, router } from 'expo-router';
import { Calendar, ChevronRight, Clock, DollarSign, MapPin, MoreVertical, Plus } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ActivityScreen() {
    const [activeTab, setActiveTab] = useState<'spots' | 'listings'>('spots');

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <Header />

            <View style={styles.header}>
                <View style={styles.segmentControl}>
                    <TouchableOpacity
                        style={[styles.segment, activeTab === 'spots' && styles.segmentActive]}
                        onPress={() => setActiveTab('spots')}
                    >
                        <Text style={[styles.segmentText, activeTab === 'spots' && styles.segmentTextActive]}>Your spots</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.segment, activeTab === 'listings' && styles.segmentActive]}
                        onPress={() => setActiveTab('listings')}
                    >
                        <Text style={[styles.segmentText, activeTab === 'listings' && styles.segmentTextActive]}>Your listings</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {activeTab === 'spots' ? <MySpotsView /> : <MyListingsView />}
        </View>
    );
}

// --- Sub-components for Cleanliness ---

function MySpotsView() {
    const [selectedFilter, setSelectedFilter] = useState<'upcoming' | 'active' | 'Past'>('upcoming');

    const filteredBookings = renterBookings.filter((booking) => {
        if (selectedFilter === 'upcoming') return booking.status === 'upcoming';
        if (selectedFilter === 'active') return booking.status === 'active';
        return booking.status === 'Past';
    });

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming': return '#000';
            case 'active': return '#000';
            case 'Past': return '#666';
            default: return '#666';
        }
    };

    const getStatusBgColor = (status: string) => {
        switch (status) {
            case 'upcoming': return '#F5F5F5';
            case 'active': return '#E5E5E5';
            case 'Past': return '#F3F4F6';
            default: return '#F3F4F6';
        }
    };

    return (
        <View style={styles.contentContainer}>
            <View style={styles.filterContainer}>
                {/* Filters just like in original bookings.tsx */}
                {(['upcoming', 'active', 'Past'] as const).map(filter => (
                    <TouchableOpacity
                        key={filter}
                        style={[styles.filterButton, selectedFilter === filter && styles.filterButtonActive]}
                        onPress={() => setSelectedFilter(filter)}
                    >
                        <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {filteredBookings.length > 0 ? (
                    filteredBookings.map(booking => (
                        <TouchableOpacity key={booking.id} style={styles.bookingCard}>
                            <Image source={{ uri: booking.listingPhoto }} style={styles.bookingImage} />
                            <View style={styles.bookingContent}>
                                <View style={styles.bookingHeader}>
                                    <Text style={styles.bookingTitle} numberOfLines={1}>{booking.listingTitle}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusBgColor(booking.status) }]}>
                                        <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                                            {booking.status}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.locationRow}>
                                    <MapPin size={14} color="#6B7280" />
                                    <Text style={styles.addressText} numberOfLines={1}>{booking.listingAddress}</Text>
                                </View>

                                <View style={styles.bookingDetails}>
                                    <View style={styles.detailItem}>
                                        <Calendar size={16} color="#000" />
                                        <Text style={styles.detailText}>{formatDate(booking.startTime)}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <Clock size={16} color="#000" />
                                        <Text style={styles.detailText}>
                                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.bookingFooter}>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.priceLabel}>Total</Text>
                                        <Text style={styles.priceValue}>${booking.totalAmount.toFixed(2)}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.detailsButton}>
                                        <Text style={styles.detailsButtonText}>View Details</Text>
                                        <ChevronRight size={16} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>No reservations found.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

function MyListingsView() {
    const [filter, setFilter] = useState<ListingStatus | 'all'>('all');

    const filteredListings = filter === 'all'
        ? listings
        : listings.filter(l => l.status === filter);

    const statusColors: Record<ListingStatus, string> = {
        active: '#000',
        pending: '#333',
        draft: '#666',
        inactive: '#999',
    };

    return (
        <View style={styles.contentContainer}>
            <View style={styles.filterContainer}>
                {(['all', 'active', 'pending', 'draft'] as const).map(f => (
                    <TouchableOpacity
                        key={f}
                        style={[styles.filterButton, filter === f && styles.filterButtonActive]}
                        onPress={() => setFilter(f)}
                    >
                        <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {filteredListings.map((listing) => (
                    <TouchableOpacity
                        key={listing.id}
                        style={styles.listingCard}
                        onPress={() => router.push(`/listing-detail?id=${listing.id}` as any)}
                    >
                        <Image source={{ uri: listing.photos[0] }} style={styles.listingImage} />
                        <View style={styles.statusBadgeOverlay}>
                            <View style={[styles.statusDot, { backgroundColor: statusColors[listing.status] }]} />
                            <Text style={styles.statusTextOverlay}>
                                {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                            </Text>
                        </View>
                        <View style={styles.listingContent}>
                            <View style={styles.listingHeader}>
                                <Text style={styles.listingTitle}>{listing.title}</Text>
                                <TouchableOpacity style={styles.menuButton}>
                                    <MoreVertical size={20} color="#666" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.listingDetail}>
                                <MapPin size={14} color="#666" />
                                <Text style={styles.listingAddress}>{listing.address}</Text>
                            </View>
                            <View style={styles.listingStats}>
                                <View style={styles.statItem}>
                                    <DollarSign size={16} color="#000" />
                                    <Text style={styles.statValue}>${listing.hourlyRate}/hr</Text>
                                </View>
                                <View style={styles.statDivider} />
                                <View style={styles.statItem}>
                                    <Calendar size={16} color="#000" />
                                    <Text style={styles.statValue}>{listing.activeBookings} bookings</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Link href="/create-listing" asChild>
                <TouchableOpacity style={styles.fab}>
                    <Plus size={28} color="#FFF" />
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111',
        paddingTop: 60,
    },
    listingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    header: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#111',
    },
    segmentControl: {
        flexDirection: 'row',
        backgroundColor: '#222',
        borderRadius: 12,
        padding: 4,
    },
    segment: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    segmentActive: {
        backgroundColor: '#EAB308', // Yellow
    },
    segmentText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#888',
    },
    segmentTextActive: {
        color: '#000',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#111',
    },
    filterContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 12,
    },
    filterButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#222',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    filterButtonActive: {
        backgroundColor: '#EAB308',
        borderColor: '#EAB308',
    },
    filterText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#888',
    },
    filterTextActive: {
        color: '#000',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 16,
    },
    // Card Styles
    bookingCard: {
        backgroundColor: '#222',
        marginBottom: 16,
        borderRadius: 16,
        overflow: 'hidden',
    },
    bookingImage: {
        width: '100%',
        height: 150,
    },
    bookingContent: {
        padding: 16,
    },
    bookingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFF',
        flex: 1,
        marginRight: 10,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    addressText: {
        color: '#888',
        fontSize: 14,
        flex: 1,
    },
    bookingDetails: {
        marginBottom: 16,
        gap: 8,
    },
    detailItem: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    detailText: {
        color: '#CCC',
        fontSize: 14,
    },
    bookingFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    priceLabel: {
        color: '#888',
        fontSize: 14,
    },
    priceValue: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EAB308',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        gap: 4,
    },
    detailsButtonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 14,
    },
    emptyState: {
        alignItems: 'center',
        padding: 40,
    },
    emptyTitle: {
        color: '#FFF',
        fontSize: 16,
    },

    // Listing Styles
    listingCard: {
        backgroundColor: '#222',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    listingImage: {
        width: '100%',
        height: 180,
    },
    statusBadgeOverlay: {
        position: 'absolute',
        top: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusTextOverlay: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: '600',
    },
    listingContent: {
        padding: 16,
    },
    listingTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '700',
        flex: 1,
    },
    listingDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginVertical: 8,
    },
    listingAddress: {
        color: '#888',
        fontSize: 14,
    },
    listingStats: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#333',
        paddingTop: 12,
        marginTop: 8,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginRight: 16,
    },
    statValue: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    statDivider: {
        width: 1,
        height: 16,
        backgroundColor: '#333',
        marginRight: 16,
    },
    menuButton: {
        padding: 4,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#EAB308',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});

