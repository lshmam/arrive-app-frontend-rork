import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Calendar, MapPin, Clock, ChevronRight } from 'lucide-react-native';
import { renterBookings } from '@/constants/mockData';
import { RenterBooking } from '@/types';

export default function RenterBookingsScreen() {
    const [selectedFilter, setSelectedFilter] = useState<'upcoming' | 'active' | 'completed'>('upcoming');

    const filteredBookings = renterBookings.filter((booking) => {
        if (selectedFilter === 'upcoming') return booking.status === 'upcoming';
        if (selectedFilter === 'active') return booking.status === 'active';
        return booking.status === 'completed';
    });

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return '#000';
            case 'active':
                return '#000';
            case 'completed':
                return '#666';
            default:
                return '#666';
        }
    };

    const getStatusBgColor = (status: string) => {
        switch (status) {
            case 'upcoming':
                return '#F5F5F5';
            case 'active':
                return '#E5E5E5';
            case 'completed':
                return '#F3F4F6';
            default:
                return '#F3F4F6';
        }
    };

    const renderBookingCard = (booking: RenterBooking) => (
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

                {booking.accessInstructions && booking.status === 'upcoming' && (
                    <View style={styles.accessNote}>
                        <Text style={styles.accessNoteText}>Access instructions available</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <Stack.Screen options={{ title: 'My Bookings' }} />
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, selectedFilter === 'upcoming' && styles.filterButtonActive]}
                        onPress={() => setSelectedFilter('upcoming')}
                    >
                        <Text style={[styles.filterText, selectedFilter === 'upcoming' && styles.filterTextActive]}>
                            Upcoming
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, selectedFilter === 'active' && styles.filterButtonActive]}
                        onPress={() => setSelectedFilter('active')}
                    >
                        <Text style={[styles.filterText, selectedFilter === 'active' && styles.filterTextActive]}>
                            Active
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, selectedFilter === 'completed' && styles.filterButtonActive]}
                        onPress={() => setSelectedFilter('completed')}
                    >
                        <Text style={[styles.filterText, selectedFilter === 'completed' && styles.filterTextActive]}>
                            Completed
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scrollView}>
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map(renderBookingCard)
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyTitle}>No {selectedFilter} bookings</Text>
                            <Text style={styles.emptyText}>
                                {selectedFilter === 'upcoming'
                                    ? 'Book a parking spot to get started'
                                    : `You don't have any ${selectedFilter} bookings`}
                            </Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    filterContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#FFF',
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    filterButton: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        alignItems: 'center',
    },
    filterButtonActive: {
        backgroundColor: '#000',
    },
    filterText: {
        fontSize: 13,
        fontWeight: '500' as const,
        color: '#6B7280',
    },
    filterTextActive: {
        color: '#FFF',
    },
    scrollView: {
        flex: 1,
    },
    bookingCard: {
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
    bookingImage: {
        width: '100%',
        height: 160,
    },
    bookingContent: {
        padding: 16,
    },
    bookingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    bookingTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#111827',
        flex: 1,
        marginRight: 12,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600' as const,
        textTransform: 'capitalize' as const,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },
    addressText: {
        fontSize: 14,
        color: '#6B7280',
        flex: 1,
    },
    bookingDetails: {
        gap: 8,
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#374151',
    },
    bookingFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    priceValue: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#111827',
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    detailsButtonText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#000',
    },
    accessNote: {
        marginTop: 12,
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 8,
    },
    accessNoteText: {
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
    },
});
