import { bookings, listings, ownerProfile } from '@/constants/mockData';
import { Link, Stack } from 'expo-router';
import { ArrowRight, Calendar, DollarSign, MapPin, Plus } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function OwnerDashboardScreen() {
  const todayEarnings = 247.50;
  const thisMonthEarnings = 3840.00;
  const upcomingBookings = bookings.filter(b => b.status === 'upcoming').length;

  return (
    <>
      <Stack.Screen options={{ title: 'Dashboard', headerShown: false }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.name}>{ownerProfile.name.split(' ')[0]}</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{ownerProfile.name.split(' ').map(n => n[0]).join('')}</Text>
          </View>
        </View>

        <View style={styles.earningsCard}>
          <View style={styles.earningsHeader}>
            <Text style={styles.earningsLabel}>Total Earnings</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>All Time</Text>
            </View>
          </View>
          <Text style={styles.earningsAmount}>${ownerProfile.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
          <View style={styles.earningsSubStats}>
            <View style={styles.subStat}>
              <Text style={styles.subStatLabel}>Today</Text>
              <Text style={styles.subStatValue}>${todayEarnings.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.subStat}>
              <Text style={styles.subStatLabel}>This Month</Text>
              <Text style={styles.subStatValue}>${thisMonthEarnings.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
              <MapPin size={20} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{ownerProfile.activeListings}</Text>
            <Text style={styles.statLabel}>Active Spots</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: '#FFF3E0' }]}>
              <Calendar size={20} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{upcomingBookings}</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
        </View>

        <Link href="/create-listing" asChild>
          <TouchableOpacity style={styles.createButton}>
            <Plus size={24} color="#FFF" />
            <Text style={styles.createButtonText}>List a New Spot</Text>
          </TouchableOpacity>
        </Link>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Listings</Text>
            <Link href="/listings" asChild>
              <TouchableOpacity style={styles.seeAllButton}>
                <Text style={styles.seeAllText}>See All</Text>
                <ArrowRight size={16} color="#000000" />
              </TouchableOpacity>
            </Link>
          </View>
          {listings.filter(l => l.status === 'active').slice(0, 2).map((listing) => (
            <View key={listing.id} style={styles.listingCard}>
              <Image source={{ uri: listing.photos[0] }} style={styles.listingImage} />
              <View style={styles.listingContent}>
                <Text style={styles.listingTitle}>{listing.title}</Text>
                <Text style={styles.listingAddress}>{listing.address}</Text>
                <View style={styles.listingStats}>
                  <View style={styles.listingStat}>
                    <DollarSign size={14} color="#666" />
                    <Text style={styles.listingStatText}>${listing.hourlyRate}/hr</Text>
                  </View>
                  <View style={styles.listingStat}>
                    <Calendar size={14} color="#666" />
                    <Text style={styles.listingStatText}>{listing.activeBookings} bookings</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
  greeting: {
    fontSize: 16,
    color: '#666',
  },
  name: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: '#000',
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0066CC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600' as const,
  },
  earningsCard: {
    backgroundColor: '#000000',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 24,
  },
  earningsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningsLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '600' as const,
  },
  earningsAmount: {
    fontSize: 42,
    fontWeight: '700' as const,
    color: '#FFF',
    marginBottom: 16,
  },
  earningsSubStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subStat: {
    flex: 1,
  },
  subStatLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  subStatValue: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: '#FFF',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFF',
  },
  section: {
    marginTop: 24,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#000',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  seeAllText: {
    fontSize: 15,
    color: '#0066CC',
    fontWeight: '600' as const,
  },
  listingCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  listingImage: {
    width: 100,
    height: 100,
  },
  listingContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  listingTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 4,
  },
  listingAddress: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  listingStats: {
    flexDirection: 'row',
    gap: 16,
  },
  listingStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listingStatText: {
    fontSize: 13,
    color: '#666',
  },
});
