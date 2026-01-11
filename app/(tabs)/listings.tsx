import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, Link, router } from 'expo-router';
import { Plus, MapPin, DollarSign, Calendar, MoreVertical } from 'lucide-react-native';
import { listings } from '@/constants/mockData';
import { ListingStatus } from '@/types';

export default function ListingsScreen() {
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
        <>
            <Stack.Screen options={{ title: 'My Listings' }} />
            <View style={styles.container}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
                        onPress={() => setFilter('all')}
                    >
                        <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
                            All
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'active' && styles.filterButtonActive]}
                        onPress={() => setFilter('active')}
                    >
                        <Text style={[styles.filterText, filter === 'active' && styles.filterTextActive]}>
                            Active
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
                        onPress={() => setFilter('pending')}
                    >
                        <Text style={[styles.filterText, filter === 'pending' && styles.filterTextActive]}>
                            Pending
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'draft' && styles.filterButtonActive]}
                        onPress={() => setFilter('draft')}
                    >
                        <Text style={[styles.filterText, filter === 'draft' && styles.filterTextActive]}>
                            Draft
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.listingsContainer} showsVerticalScrollIndicator={false}>
                    {filteredListings.map((listing) => (
                        <TouchableOpacity
                            key={listing.id}
                            style={styles.listingCard}
                            onPress={() => router.push(`/listing-detail?id=${listing.id}` as any)}
                        >
                            <Image source={{ uri: listing.photos[0] }} style={styles.listingImage} />
                            <View style={styles.statusBadge}>
                                <View style={[styles.statusDot, { backgroundColor: statusColors[listing.status] }]} />
                                <Text style={styles.statusText}>
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
                                    <View style={styles.statDivider} />
                                    <View style={styles.statItem}>
                                        <Text style={styles.statLabel}>Earned:</Text>
                                        <Text style={styles.statValue}>${listing.totalEarnings.toFixed(0)}</Text>
                                    </View>
                                </View>
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Text style={styles.actionButtonText}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.actionButton, styles.actionButtonOutline]}>
                                        <Text style={styles.actionButtonTextOutline}>View Bookings</Text>
                                    </TouchableOpacity>
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
    listingsContainer: {
        flex: 1,
        padding: 20,
    },
    listingCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    listingImage: {
        width: '100%',
        height: 200,
    },
    statusBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '600' as const,
        color: '#000',
    },
    listingContent: {
        padding: 16,
    },
    listingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    listingTitle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#000',
    },
    menuButton: {
        padding: 4,
    },
    listingDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 16,
    },
    listingAddress: {
        flex: 1,
        fontSize: 14,
        color: '#666',
    },
    listingStats: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#F0F0F0',
        marginBottom: 16,
    },
    statItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        justifyContent: 'center',
    },
    statLabel: {
        fontSize: 13,
        color: '#666',
    },
    statValue: {
        fontSize: 13,
        fontWeight: '600' as const,
        color: '#000',
    },
    statDivider: {
        width: 1,
        height: 20,
        backgroundColor: '#E0E0E0',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#000',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#000',
    },
    actionButtonText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#FFF',
    },
    actionButtonTextOutline: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#000',
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
