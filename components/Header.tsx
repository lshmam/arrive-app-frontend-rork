import { Bell, ChevronDown, Send } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <View style={styles.headerLeft}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>A!</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.headerCenter}>
                <Text style={styles.headerLocation}>Toronto, ON</Text>
                <ChevronDown size={14} color="#FFF" />
            </TouchableOpacity>
            <View style={styles.headerRight}>
                <TouchableOpacity>
                    <Bell size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Send size={24} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#111',
    },
    headerLeft: {
        flex: 1,
        alignItems: 'flex-start',
    },
    logoContainer: {
        backgroundColor: '#EAB308',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    logoText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#000',
    },
    headerCenter: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    headerLocation: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },
    headerRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 16,
    },
});
