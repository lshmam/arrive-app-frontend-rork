import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Mail, Phone, Calendar, Star, CreditCard, Settings, HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { renterProfile } from '@/constants/mockData';

export default function RenterProfileScreen() {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    const menuItems = [
        {
            id: 'payment',
            icon: <CreditCard size={20} color="#000" />,
            title: 'Payment Methods',
            subtitle: 'Manage your cards',
            onPress: () => { },
        },
        {
            id: 'settings',
            icon: <Settings size={20} color="#000" />,
            title: 'Settings',
            subtitle: 'App preferences',
            onPress: () => { },
        },
        {
            id: 'help',
            icon: <HelpCircle size={20} color="#000" />,
            title: 'Help & Support',
            subtitle: 'Get assistance',
            onPress: () => { },
        },
    ];

    return (
        <>
            <Stack.Screen options={{ title: 'Profile' }} />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {renterProfile.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.name}>{renterProfile.name}</Text>

                    <View style={styles.ratingContainer}>
                        <Star size={18} color="#FBBF24" fill="#FBBF24" />
                        <Text style={styles.ratingText}>{renterProfile.rating}</Text>
                        <Text style={styles.reviewCount}>({renterProfile.reviewCount} reviews)</Text>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{renterProfile.totalBookings}</Text>
                            <Text style={styles.statLabel}>Total Bookings</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{formatDate(renterProfile.joinedDate)}</Text>
                            <Text style={styles.statLabel}>Member Since</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact Information</Text>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <View style={styles.infoIcon}>
                                <Mail size={18} color="#6B7280" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text style={styles.infoValue}>{renterProfile.email}</Text>
                            </View>
                        </View>
                        <View style={styles.infoDivider} />
                        <View style={styles.infoRow}>
                            <View style={styles.infoIcon}>
                                <Phone size={18} color="#6B7280" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Phone</Text>
                                <Text style={styles.infoValue}>{renterProfile.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.infoDivider} />
                        <View style={styles.infoRow}>
                            <View style={styles.infoIcon}>
                                <Calendar size={18} color="#6B7280" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Joined</Text>
                                <Text style={styles.infoValue}>{formatDate(renterProfile.joinedDate)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.menuCard}>
                        {menuItems.map((item, index) => (
                            <View key={item.id}>
                                {index > 0 && <View style={styles.menuDivider} />}
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={item.onPress}
                                >
                                    <View style={styles.menuIcon}>
                                        {item.icon}
                                    </View>
                                    <View style={styles.menuContent}>
                                        <Text style={styles.menuTitle}>{item.title}</Text>
                                        <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                                    </View>
                                    <ChevronRight size={20} color="#9CA3AF" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.logoutButton}>
                        <LogOut size={20} color="#EF4444" />
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Version 1.0.0</Text>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Terms of Service</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    header: {
        backgroundColor: '#FFF',
        padding: 24,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 36,
        fontWeight: '700' as const,
        color: '#FFF',
    },
    editButton: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    editButtonText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#000',
    },
    name: {
        fontSize: 24,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 20,
    },
    ratingText: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#111827',
    },
    reviewCount: {
        fontSize: 16,
        color: '#6B7280',
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#F0F0F0',
    },
    section: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#111827',
        marginBottom: 12,
    },
    infoCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    infoIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F9FAFB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 13,
        color: '#6B7280',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#111827',
    },
    infoDivider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: 12,
    },
    menuCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#111827',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#6B7280',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginLeft: 64,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#FEE2E2',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#EF4444',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 32,
        gap: 8,
    },
    footerText: {
        fontSize: 13,
        color: '#9CA3AF',
        marginBottom: 8,
    },
    linkText: {
        fontSize: 14,
        color: '#000',
        fontWeight: '600' as const,
    },
});
