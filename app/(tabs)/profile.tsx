import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import {
    Mail, Phone, Calendar, Star, Award,
    CreditCard, Bell, Shield, HelpCircle, LogOut, ChevronRight
} from 'lucide-react-native';
import { ownerProfile } from '@/constants/mockData';

export default function ProfileScreen() {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    const MenuItem = ({ icon: Icon, title, subtitle, onPress, color = '#000' }: any) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={[styles.menuIcon, { backgroundColor: `${color}15` }]}>
                <Icon size={20} color={color} />
            </View>
            <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{title}</Text>
                {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
            </View>
            <ChevronRight size={20} color="#999" />
        </TouchableOpacity>
    );

    return (
        <>
            <Stack.Screen options={{ title: 'Profile' }} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {ownerProfile.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                        </View>
                        <View style={styles.verifiedBadge}>
                            <Award size={14} color="#FFF" />
                        </View>
                    </View>
                    <Text style={styles.profileName}>{ownerProfile.name}</Text>
                    <Text style={styles.profileJoined}>
                        Hosting since {formatDate(ownerProfile.joinedDate)}
                    </Text>
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Star size={18} color="#FFB300" fill="#FFB300" />
                            <Text style={styles.statValue}>{ownerProfile.rating}</Text>
                            <Text style={styles.statLabel}>({ownerProfile.reviewCount} reviews)</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Information</Text>
                    <View style={styles.card}>
                        <View style={styles.infoRow}>
                            <Mail size={18} color="#666" />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text style={styles.infoValue}>{ownerProfile.email}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <Phone size={18} color="#666" />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Phone</Text>
                                <Text style={styles.infoValue}>{ownerProfile.phone}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.infoRow}>
                            <Calendar size={18} color="#666" />
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>Member Since</Text>
                                <Text style={styles.infoValue}>{formatDate(ownerProfile.joinedDate)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings</Text>
                    <View style={styles.card}>
                        <MenuItem
                            icon={CreditCard}
                            title="Payment Methods"
                            subtitle={ownerProfile.bankingSetup ? 'Bank account connected' : 'Not set up'}
                            color="#0066CC"
                        />
                        <View style={styles.divider} />
                        <MenuItem
                            icon={Bell}
                            title="Notifications"
                            subtitle="Manage notification preferences"
                            color="#FF9800"
                        />
                        <View style={styles.divider} />
                        <MenuItem
                            icon={Shield}
                            title="Privacy & Security"
                            subtitle="Control your privacy settings"
                            color="#00C853"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    <View style={styles.card}>
                        <MenuItem
                            icon={HelpCircle}
                            title="Help Center"
                            subtitle="Get help with your account"
                            color="#9C27B0"
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton}>
                    <LogOut size={20} color="#F44336" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Version 1.0.0</Text>
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
    profileHeader: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 24,
        paddingHorizontal: 20,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#0066CC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: '#FFF',
    },
    verifiedBadge: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#00C853',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFF',
    },
    profileName: {
        fontSize: 24,
        fontWeight: '700' as const,
        color: '#000',
        marginBottom: 4,
    },
    profileJoined: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 24,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '700' as const,
        color: '#000',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#000',
        marginBottom: 12,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        overflow: 'hidden',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 13,
        color: '#666',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#000',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginLeft: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    menuIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuContent: {
        flex: 1,
        marginLeft: 12,
    },
    menuTitle: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#000',
        marginBottom: 2,
    },
    menuSubtitle: {
        fontSize: 13,
        color: '#666',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        marginHorizontal: 20,
        marginTop: 24,
        padding: 16,
        borderRadius: 12,
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#F44336',
    },
    footer: {
        alignItems: 'center',
        paddingVertical: 24,
    },
    footerText: {
        fontSize: 13,
        color: '#999',
    },
});
