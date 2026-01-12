import { ParkingListing } from '@/types';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ParkingMapProps {
    listings: ParkingListing[];
    onListingPress: (id: string) => void;
}

export default function ParkingMap({ }: ParkingMapProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Map view is not available on web.</Text>
            <Text style={styles.subText}>Please use the list view or the mobile app.</Text>

            {/* Placeholder for visual consistency */}
            <View style={styles.placeholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
    },
    subText: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 8,
    },
    placeholder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        backgroundColor: '#E5E7EB',
    },
});
