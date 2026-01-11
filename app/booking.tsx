import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Calendar, Clock, Car, CreditCard, ChevronRight } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { listings } from '@/constants/mockData';

type VehicleTypeOption = 'sedan' | 'suv' | 'truck' | 'motorcycle' | 'van';

export default function BookingScreen() {
    const { listingId } = useLocalSearchParams<{ listingId: string }>();
    const listing = listings.find((l) => l.id === listingId);

    const [licensePlate, setLicensePlate] = useState<string>('');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 4 * 60 * 60 * 1000));
    const [vehicleType, setVehicleType] = useState<VehicleTypeOption>('sedan');
    const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
    const [showEndPicker, setShowEndPicker] = useState<boolean>(false);
    const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');

    if (!listing) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Listing not found</Text>
            </View>
        );
    }

    const calculateCost = () => {
        const hours = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60));
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;

        if (days > 0 && remainingHours <= 2) {
            return days * listing.dailyRate;
        } else if (days > 0) {
            return days * listing.dailyRate + remainingHours * listing.hourlyRate;
        }
        return hours * listing.hourlyRate;
    };

    const totalCost = calculateCost();
    const serviceFee = totalCost * 0.1;
    const total = totalCost + serviceFee;

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

    const vehicleOptions: VehicleTypeOption[] = ['sedan', 'suv', 'truck', 'motorcycle', 'van'];

    const handleConfirm = () => {
        router.push(`/booking-confirmation?bookingId=new` as any);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Book Parking',
                    headerBackTitle: 'Back'
                }}
            />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <ScrollView
                    style={styles.scrollView}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.listingCard}>
                        <Text style={styles.listingTitle}>{listing.title}</Text>
                        <Text style={styles.listingAddress}>{listing.address}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Vehicle Information</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>License Plate</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter license plate"
                                placeholderTextColor="#9CA3AF"
                                value={licensePlate}
                                onChangeText={setLicensePlate}
                                autoCapitalize="characters"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Vehicle Type</Text>
                            <View style={styles.vehicleGrid}>
                                {vehicleOptions.map((option) => (
                                    <TouchableOpacity
                                        key={option}
                                        style={[
                                            styles.vehicleOption,
                                            vehicleType === option && styles.vehicleOptionActive,
                                        ]}
                                        onPress={() => setVehicleType(option)}
                                    >
                                        <Car
                                            size={20}
                                            color={vehicleType === option ? '#000' : '#6B7280'}
                                        />
                                        <Text
                                            style={[
                                                styles.vehicleOptionText,
                                                vehicleType === option && styles.vehicleOptionTextActive,
                                            ]}
                                        >
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Parking Duration</Text>

                        <TouchableOpacity
                            style={styles.dateTimeButton}
                            onPress={() => {
                                setPickerMode('date');
                                setShowStartPicker(true);
                            }}
                        >
                            <View style={styles.dateTimeInfo}>
                                <Calendar size={20} color="#000" />
                                <View style={styles.dateTimeText}>
                                    <Text style={styles.dateTimeLabel}>Start Date & Time</Text>
                                    <Text style={styles.dateTimeValue}>
                                        {formatDate(startDate)} at {formatTime(startDate)}
                                    </Text>
                                </View>
                            </View>
                            <ChevronRight size={20} color="#9CA3AF" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.dateTimeButton}
                            onPress={() => {
                                setPickerMode('date');
                                setShowEndPicker(true);
                            }}
                        >
                            <View style={styles.dateTimeInfo}>
                                <Clock size={20} color="#000" />
                                <View style={styles.dateTimeText}>
                                    <Text style={styles.dateTimeLabel}>End Date & Time</Text>
                                    <Text style={styles.dateTimeValue}>
                                        {formatDate(endDate)} at {formatTime(endDate)}
                                    </Text>
                                </View>
                            </View>
                            <ChevronRight size={20} color="#9CA3AF" />
                        </TouchableOpacity>

                        {showStartPicker && (
                            <DateTimePicker
                                value={startDate}
                                mode={pickerMode}
                                display="default"
                                onChange={(event, selectedDate) => {
                                    if (Platform.OS === 'android') {
                                        setShowStartPicker(false);
                                    }
                                    if (selectedDate) {
                                        if (pickerMode === 'date' && Platform.OS === 'ios') {
                                            setStartDate(selectedDate);
                                        } else if (pickerMode === 'date') {
                                            setStartDate(selectedDate);
                                            setPickerMode('time');
                                            setShowStartPicker(true);
                                        } else {
                                            setStartDate(selectedDate);
                                            setShowStartPicker(false);
                                            setPickerMode('date');
                                        }
                                    }
                                }}
                            />
                        )}

                        {showEndPicker && (
                            <DateTimePicker
                                value={endDate}
                                mode={pickerMode}
                                display="default"
                                minimumDate={startDate}
                                onChange={(event, selectedDate) => {
                                    if (Platform.OS === 'android') {
                                        setShowEndPicker(false);
                                    }
                                    if (selectedDate) {
                                        if (pickerMode === 'date' && Platform.OS === 'ios') {
                                            setEndDate(selectedDate);
                                        } else if (pickerMode === 'date') {
                                            setEndDate(selectedDate);
                                            setPickerMode('time');
                                            setShowEndPicker(true);
                                        } else {
                                            setEndDate(selectedDate);
                                            setShowEndPicker(false);
                                            setPickerMode('date');
                                        }
                                    }
                                }}
                            />
                        )}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cost Summary</Text>
                        <View style={styles.costCard}>
                            <View style={styles.costRow}>
                                <Text style={styles.costLabel}>Parking Fee</Text>
                                <Text style={styles.costValue}>${totalCost.toFixed(2)}</Text>
                            </View>
                            <View style={styles.costRow}>
                                <Text style={styles.costLabel}>Service Fee (10%)</Text>
                                <Text style={styles.costValue}>${serviceFee.toFixed(2)}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.costRow}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Payment Method</Text>
                        <TouchableOpacity style={styles.paymentCard}>
                            <View style={styles.paymentInfo}>
                                <View style={styles.cardIcon}>
                                    <CreditCard size={20} color="#000" />
                                </View>
                                <View style={styles.cardInfo}>
                                    <Text style={styles.cardBrand}>Visa ending in 4242</Text>
                                    <Text style={styles.cardExpiry}>Expires 12/2027</Text>
                                </View>
                            </View>
                            <ChevronRight size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.spacer} />
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.footerInfo}>
                        <Text style={styles.footerLabel}>Total Amount</Text>
                        <Text style={styles.footerTotal}>${total.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.confirmButton, !licensePlate && styles.confirmButtonDisabled]}
                        onPress={handleConfirm}
                        disabled={!licensePlate}
                    >
                        <Text style={styles.confirmButtonText}>Confirm & Pay</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
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
    scrollView: {
        flex: 1,
    },
    listingCard: {
        backgroundColor: '#FFF',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    listingTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 4,
    },
    listingAddress: {
        fontSize: 14,
        color: '#6B7280',
    },
    section: {
        backgroundColor: '#FFF',
        padding: 20,
        marginTop: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#111827',
    },
    vehicleGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    vehicleOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F9FAFB',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderRadius: 12,
    },
    vehicleOptionActive: {
        backgroundColor: '#F5F5F5',
        borderColor: '#000',
    },
    vehicleOptionText: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#6B7280',
        textTransform: 'capitalize' as const,
    },
    vehicleOptionTextActive: {
        color: '#000',
    },
    dateTimeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    dateTimeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    dateTimeText: {
        flex: 1,
    },
    dateTimeLabel: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 4,
    },
    dateTimeValue: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#111827',
    },
    costCard: {
        backgroundColor: '#F9FAFB',
        padding: 16,
        borderRadius: 12,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    costLabel: {
        fontSize: 15,
        color: '#6B7280',
    },
    costValue: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#111827',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#111827',
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '700' as const,
        color: '#000',
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
    },
    paymentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    cardIcon: {
        width: 44,
        height: 44,
        backgroundColor: '#F5F5F5',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardInfo: {
        flex: 1,
    },
    cardBrand: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#111827',
        marginBottom: 4,
    },
    cardExpiry: {
        fontSize: 13,
        color: '#6B7280',
    },
    spacer: {
        height: 100,
    },
    footer: {
        backgroundColor: '#FFF',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    footerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footerLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    footerTotal: {
        fontSize: 24,
        fontWeight: '700' as const,
        color: '#111827',
    },
    confirmButton: {
        backgroundColor: '#000',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    confirmButtonDisabled: {
        backgroundColor: '#9CA3AF',
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#FFF',
    },
});

