import { earnings, ownerProfile } from '@/constants/mockData';
import { Stack } from 'expo-router';
import { Calendar, CheckCircle, Clock, CreditCard, DollarSign, TrendingUp } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EarningsScreen() {
    const pendingAmount = earnings
        .filter(e => e.status === 'pending')
        .reduce((sum, e) => sum + e.amount, 0);

    const paidAmount = earnings
        .filter(e => e.status === 'paid')
        .reduce((sum, e) => sum + e.amount, 0);

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Earnings' }} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.totalCard}>
                    <View style={styles.totalHeader}>
                        <View>
                            <Text style={styles.totalLabel}>Total Earnings</Text>
                            <Text style={styles.totalAmount}>${ownerProfile.totalEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
                        </View>
                        <View style={styles.trendBadge}>
                            <TrendingUp size={16} color="#00C853" />
                            <Text style={styles.trendText}>+12.5%</Text>
                        </View>
                    </View>
                    <View style={styles.breakdownRow}>
                        <View style={styles.breakdownItem}>
                            <View style={styles.breakdownIcon}>
                                <Clock size={18} color="#FF9800" />
                            </View>
                            <View>
                                <Text style={styles.breakdownLabel}>Pending</Text>
                                <Text style={styles.breakdownValue}>${pendingAmount.toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={styles.breakdownItem}>
                            <View style={[styles.breakdownIcon, { backgroundColor: '#E8F5E9' }]}>
                                <CheckCircle size={18} color="#00C853" />
                            </View>
                            <View>
                                <Text style={styles.breakdownLabel}>Paid Out</Text>
                                <Text style={styles.breakdownValue}>${paidAmount.toFixed(2)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {ownerProfile.bankingSetup ? (
                    <View style={styles.bankCard}>
                        <View style={styles.bankHeader}>
                            <View style={styles.bankIcon}>
                                <CreditCard size={20} color="#0066CC" />
                            </View>
                            <View style={styles.bankInfo}>
                                <Text style={styles.bankLabel}>Bank Account</Text>
                                <Text style={styles.bankAccount}>•••• •••• •••• 4242</Text>
                            </View>
                            <TouchableOpacity style={styles.manageBankButton}>
                                <Text style={styles.manageBankText}>Manage</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.payoutSchedule}>
                            <Calendar size={16} color="#666" />
                            <Text style={styles.payoutText}>Next payout on Jan 15, 2026</Text>
                        </View>
                    </View>
                ) : (
                    <TouchableOpacity style={styles.addBankButton}>
                        <CreditCard size={24} color="#0066CC" />
                        <View style={styles.addBankContent}>
                            <Text style={styles.addBankTitle}>Add Banking Details</Text>
                            <Text style={styles.addBankDescription}>Connect your bank to receive payouts</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Transaction History</Text>
                    {earnings.map((earning) => (
                        <View key={earning.id} style={styles.transactionCard}>
                            <View style={styles.transactionLeft}>
                                <View style={[
                                    styles.transactionIcon,
                                    earning.status === 'paid'
                                        ? { backgroundColor: '#E8F5E9' }
                                        : { backgroundColor: '#FFF3E0' }
                                ]}>
                                    <DollarSign
                                        size={20}
                                        color={earning.status === 'paid' ? '#00C853' : '#FF9800'}
                                    />
                                </View>
                                <View style={styles.transactionInfo}>
                                    <Text style={styles.transactionTitle}>Booking #{earning.bookingId}</Text>
                                    <Text style={styles.transactionDate}>{formatDate(earning.date)}</Text>
                                    {earning.status === 'paid' && earning.payoutDate && (
                                        <Text style={styles.payoutDate}>
                                            Paid out {formatDate(earning.payoutDate)}
                                        </Text>
                                    )}
                                </View>
                            </View>
                            <View style={styles.transactionRight}>
                                <Text style={styles.transactionAmount}>+${earning.amount.toFixed(2)}</Text>
                                <View style={[
                                    styles.transactionStatus,
                                    earning.status === 'paid'
                                        ? { backgroundColor: '#E8F5E9' }
                                        : { backgroundColor: '#FFF3E0' }
                                ]}>
                                    <Text style={[
                                        styles.transactionStatusText,
                                        earning.status === 'paid'
                                            ? { color: '#00C853' }
                                            : { color: '#FF9800' }
                                    ]}>
                                        {earning.status === 'paid' ? 'Paid' : 'Pending'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>How payouts work</Text>
                    <Text style={styles.infoText}>
                        Earnings are typically transferred to your bank account 2-3 business days after a booking is completed. Pending amounts will be processed in the next payout cycle.
                    </Text>
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
    totalCard: {
        backgroundColor: '#000000',
        margin: 20,
        borderRadius: 16,
        padding: 24,
    },
    totalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 8,
    },
    totalAmount: {
        fontSize: 36,
        fontWeight: '700' as const,
        color: '#FFF',
    },
    trendBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 4,
    },
    trendText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#FFF',
    },
    breakdownRow: {
        flexDirection: 'row',
        gap: 16,
    },
    breakdownItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        padding: 12,
        borderRadius: 12,
        gap: 10,
    },
    breakdownIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFF3E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    breakdownLabel: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 2,
    },
    breakdownValue: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#FFF',
    },
    bankCard: {
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 12,
        padding: 16,
    },
    bankHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    bankIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bankInfo: {
        flex: 1,
        marginLeft: 12,
    },
    bankLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    bankAccount: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#000',
    },
    manageBankButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#0066CC',
    },
    manageBankText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#0066CC',
    },
    payoutSchedule: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    payoutText: {
        fontSize: 13,
        color: '#666',
    },
    addBankButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E3F2FD',
        borderStyle: 'dashed' as const,
        gap: 16,
    },
    addBankContent: {
        flex: 1,
    },
    addBankTitle: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#000',
        marginBottom: 4,
    },
    addBankDescription: {
        fontSize: 13,
        color: '#666',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#000',
        marginBottom: 16,
    },
    transactionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    transactionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    transactionInfo: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#000',
        marginBottom: 4,
    },
    transactionDate: {
        fontSize: 13,
        color: '#666',
    },
    payoutDate: {
        fontSize: 12,
        color: '#00C853',
        marginTop: 2,
    },
    transactionRight: {
        alignItems: 'flex-end',
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#000',
        marginBottom: 6,
    },
    transactionStatus: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    transactionStatusText: {
        fontSize: 12,
        fontWeight: '600' as const,
    },
    infoCard: {
        backgroundColor: '#E3F2FD',
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 16,
        borderRadius: 12,
    },
    infoTitle: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#0066CC',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 13,
        color: '#0066CC',
        lineHeight: 20,
    },
});
