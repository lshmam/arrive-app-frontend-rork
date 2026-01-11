import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, router } from 'expo-router';
import { CheckCircle2, MapPin, Calendar, Clock, Car } from 'lucide-react-native';

export default function BookingConfirmationScreen() {

    const bookingDetails = {
        id: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        listingTitle: 'Downtown Covered Garage',
        listingAddress: '123 Main St, San Francisco, CA',
        startTime: new Date('2026-01-14T08:00:00'),
        endTime: new Date('2026-01-14T18:00:00'),
        licensePlate: 'ABC1234',
        vehicleType: 'Tesla Model 3',
        totalAmount: 93.50,
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
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

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.successContainer}>
                        <View style={styles.iconContainer}>
                            <CheckCircle2 size={64} color="#10B981" strokeWidth={2} />
                        </View>
                        <Text style={styles.successTitle}>Booking Confirmed!</Text>
                        <Text style={styles.successMessage}>
                            Your parking spot has been reserved successfully.
                        </Text>
                        <View style={styles.bookingIdContainer}>
                            <Text style={styles.bookingIdLabel}>Booking ID</Text>
                            <Text style={styles.bookingId}>{bookingDetails.id}</Text>
                        </View>
                    </View>

                    <View style={styles.detailsCard}>
                        <Text style={styles.cardTitle}>Booking Details</Text>

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <MapPin size={20} color="#0066CC" />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Location</Text>
                                <Text style={styles.detailValue}>{bookingDetails.listingTitle}</Text>
                                <Text style={styles.detailSubvalue}>{bookingDetails.listingAddress}</Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <Calendar size={20} color="#0066CC" />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Start Time</Text>
                                <Text style={styles.detailValue}>
                                    {formatDate(bookingDetails.startTime)}
                                </Text>
                                <Text style={styles.detailSubvalue}>
                                    {formatTime(bookingDetails.startTime)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <Clock size={20} color="#0066CC" />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>End Time</Text>
                                <Text style={styles.detailValue}>
                                    {formatDate(bookingDetails.endTime)}
                                </Text>
                                <Text style={styles.detailSubvalue}>
                                    {formatTime(bookingDetails.endTime)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        <View style={styles.detailRow}>
                            <View style={styles.detailIcon}>
                                <Car size={20} color="#0066CC" />
                            </View>
                            <View style={styles.detailContent}>
                                <Text style={styles.detailLabel}>Vehicle</Text>
                                <Text style={styles.detailValue}>{bookingDetails.vehicleType}</Text>
                                <Text style={styles.detailSubvalue}>
                                    Plate: {bookingDetails.licensePlate}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.paymentCard}>
                        <Text style={styles.cardTitle}>Payment Summary</Text>
                        <View style={styles.paymentRow}>
                            <Text style={styles.paymentLabel}>Total Paid</Text>
                            <Text style={styles.paymentValue}>${bookingDetails.totalAmount.toFixed(2)}</Text>
                        </View>
                        <View style={styles.paymentNote}>
                            <Text style={styles.paymentNoteText}>
                                Payment successful via Visa ending in 4242
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoCard}>
                        <Text style={styles.infoTitle}>What&apos;s Next?</Text>
                        <Text style={styles.infoText}>
                            {`• A confirmation email has been sent to your email
• Access instructions will be available in your booking details
• You can contact the host if you have any questions`}
                        </Text>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => router.push('/(renter)/bookings' as any)}
                    >
                        <Text style={styles.secondaryButtonText}>View My Bookings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => router.push('/(renter)/map' as any)}
                    >
                        <Text style={styles.primaryButtonText}>Go Home</Text>
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
    scrollContent: {
        padding: 20,
        paddingTop: 60,
        paddingBottom: 120,
    },
    successContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#D1FAE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 8,
    },
    successMessage: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
    },
    bookingIdContainer: {
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    bookingIdLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
        textAlign: 'center',
    },
    bookingId: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#0066CC',
        textAlign: 'center',
    },
    detailsCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        gap: 16,
    },
    detailIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#EFF6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#111827',
        marginBottom: 2,
    },
    detailSubvalue: {
        fontSize: 14,
        color: '#6B7280',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 16,
    },
    paymentCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    paymentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    paymentLabel: {
        fontSize: 16,
        color: '#6B7280',
    },
    paymentValue: {
        fontSize: 24,
        fontWeight: '700' as const,
        color: '#10B981',
    },
    paymentNote: {
        backgroundColor: '#F9FAFB',
        padding: 12,
        borderRadius: 8,
    },
    paymentNoteText: {
        fontSize: 14,
        color: '#6B7280',
    },
    infoCard: {
        backgroundColor: '#EFF6FF',
        borderRadius: 16,
        padding: 20,
        borderLeftWidth: 4,
        borderLeftColor: '#0066CC',
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#1E40AF',
        marginBottom: 12,
    },
    infoText: {
        fontSize: 14,
        lineHeight: 22,
        color: '#1E40AF',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        padding: 20,
        flexDirection: 'row',
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    secondaryButton: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#374151',
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#0066CC',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#FFF',
    },
});
