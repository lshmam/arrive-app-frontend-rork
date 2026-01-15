import Header from '@/components/Header';
import { listings } from '@/constants/mockData';
import { router, Stack } from 'expo-router';
import { Footprints, Search, Settings2, Star, Zap } from 'lucide-react-native';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const categories = [
        { id: '1', name: 'Events', icon: 'confetti' },
        { id: '2', name: 'Concerts', icon: 'music' },
        { id: '3', name: 'Downtown', icon: 'building' },
        { id: '4', name: 'Airport', icon: 'plane' },
    ];

    const ListingCard = ({ listing }: { listing: any }) => (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: listing.photos[0] }} style={styles.cardImage} />
                <View style={styles.distanceBadge}>
                    <Footprints size={12} color="#000" style={{ transform: [{ rotate: '90deg' }] }} />
                    <Text style={styles.distanceText}>0 feet</Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <Text style={styles.cardTitle}>{listing.title}</Text>
                        <Text style={styles.cardAddress} numberOfLines={1}>{listing.address}</Text>
                        <Text style={styles.cardPrice}>${listing.hourlyRate.toFixed(2)} / hour</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <Star size={16} color="#EAB308" fill="#EAB308" />
                        <Text style={styles.ratingText}>4.50 (1)</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => router.push(`/listing-detail?id=${listing.id}` as any)}
                >
                    <Zap size={18} color="#000" />
                    <Text style={styles.actionButtonText}>Park now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <Header />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Search size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Aptly..."
                        placeholderTextColor="#666"
                    />
                </View>

                {/* Categories */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categoriesContainer}
                    contentContainerStyle={styles.categoriesContent}
                >
                    <TouchableOpacity style={[styles.filterBtn, styles.filterBtnIcon]}>
                        <Settings2 size={20} color="#FFF" />
                    </TouchableOpacity>

                    {categories.map((cat) => (
                        <TouchableOpacity key={cat.id} style={styles.categoryPill}>
                            {/* Ideally use dynamic icons based on name, simplified for now */}
                            {cat.name === 'Events' && <Zap size={16} color="#FFF" />}
                            {cat.name === 'Concerts' && <Zap size={16} color="#FFF" />}
                            <Text style={styles.categoryText}>{cat.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Feed */}
                <View style={styles.feedContainer}>
                    {listings.map((listing) => (
                        <ListingCard key={listing.id} listing={listing} />
                    ))}
                    {/* Duplicate for demo if needed */}
                    {listings.map((listing) => (
                        <ListingCard key={`dup-${listing.id}`} listing={listing} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#050505', // Very dark bg but not pure black to match image possibly, or #111
        paddingTop: 60,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        marginHorizontal: 16,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        color: '#FFF',
        fontSize: 16,
    },
    categoriesContainer: {
        marginBottom: 20,
    },
    categoriesContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    filterBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1A1A1A',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
    },
    filterBtnIcon: {
        // specialized styles
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 16,
        height: 40,
        borderRadius: 20,
        gap: 8,
    },
    categoryText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '500',
    },
    feedContainer: {
        paddingHorizontal: 16,
        gap: 20,
    },
    card: {
        backgroundColor: '#000',
        borderRadius: 16, // Image shows slightly rounded corners on the card itself (or the image?) 
        // In the reference, the card has a black background but the app bg is also black. 
        // The image is the main divider.
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#222',
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        height: 250,
        width: '100%',
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    distanceBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#EAB308',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    distanceText: {
        color: '#000',
        fontSize: 12,
        fontWeight: '700',
        fontStyle: 'italic',
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    cardTitle: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 2,
    },
    cardAddress: {
        color: '#888',
        fontSize: 13,
        marginBottom: 4,
    },
    cardPrice: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '700',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    actionButton: {
        backgroundColor: '#EAB308', // Yellow color
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 48,
        borderRadius: 8,
        gap: 8,
    },
    actionButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '700',
    },
});
