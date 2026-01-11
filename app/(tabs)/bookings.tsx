import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Calendar, Clock, Car, MapPin, MessageCircle, CheckCircle } from 'lucide-react-native';
import { bookings } from '@/constants/mockData';
import { BookingStatus } from '@/types';

export default function BookingsScreen() {
  const [filter, setFilter] = useState<BookingStatus | 'all'>('all');

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter);

  const statusColors: Record<BookingStatus, string> = {
    upcoming: '#000',
    active: '#000',
    completed: '#666',
    cancelled: '#999',
  };

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
      minute: '2-digit'
    });
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Bookings' }} />
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
            style={[styles.filterButton, filter === 'upcoming' && styles.filterButtonActive]}
            onPress={() => setFilter('upcoming')}
          >
            <Text style={[styles.filterText, filter === 'upcoming' && styles.filterTextActive]}>
              Upcoming
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
            style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterText, filter === 'completed' && styles.filterTextActive]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.bookingsContainer} showsVerticalScrollIndicator={false}>
          {filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={[styles.statusBadge, { backgroundColor: statusColors[booking.status] }]}>
                  <Text style={styles.statusText}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Text>
                </View>
                <View style={styles.amountBadge}>
                  <Text style={styles.amountText}>${booking.totalAmount.toFixed(2)}</Text>
                </View>
              </View>

              <View style={styles.renterSection}>
                <View style={styles.renterAvatar}>
                  <Text style={styles.renterInitials}>{booking.renterInitials}</Text>
                </View>
                <View style={styles.renterInfo}>
                  <Text style={styles.renterName}>{booking.renterName}</Text>
                  <View style={styles.vehicleInfo}>
                    <Car size={14} color="#666" />
                    <Text style={styles.vehicleText}>{booking.vehicleType}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.messageButton}>
                  <MessageCircle size={20} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.listingSection}>
                <MapPin size={16} color="#666" />
                <View style={styles.listingInfo}>
                  <Text style={styles.listingTitle}>{booking.listingTitle}</Text>
                  <Text style={styles.listingAddress}>{booking.listingAddress}</Text>
                </View>
              </View>

              <View style={styles.timeSection}>
                <View style={styles.timeRow}>
                  <View style={styles.timeItem}>
                    <Calendar size={16} color="#000" />
                    <Text style={styles.timeLabel}>Check-in</Text>
                  </View>
                  <Text style={styles.timeValue}>{formatDate(booking.startTime)}</Text>
                </View>
                <View style={styles.timeRow}>
                  <View style={styles.timeItem}>
                    <Clock size={16} color="#000" />
                    <Text style={styles.timeLabel}>Time</Text>
                  </View>
                  <Text style={styles.timeValue}>{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</Text>
                </View>
              </View>

              {booking.paymentStatus === 'paid' && (
                <View style={styles.paymentBadge}>
                  <CheckCircle size={14} color="#000" />
                  <Text style={styles.paymentText}>Payment Received</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
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
  bookingsContainer: {
    flex: 1,
    padding: 20,
  },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: '#FFF',
  },
  amountBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#000',
  },
  renterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  renterAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renterInitials: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#000',
  },
  renterInfo: {
    flex: 1,
    marginLeft: 12,
  },
  renterName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 4,
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vehicleText: {
    fontSize: 13,
    color: '#666',
  },
  messageButton: {
    padding: 8,
  },
  listingSection: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  listingInfo: {
    flex: 1,
  },
  listingTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#000',
    marginBottom: 4,
  },
  listingAddress: {
    fontSize: 13,
    color: '#666',
  },
  timeSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginBottom: 12,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#000',
  },
  paymentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 8,
  },
  paymentText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#000',
  },
});
