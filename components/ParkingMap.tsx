import { ParkingListing } from '@/types';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

interface ParkingMapProps {
    listings: ParkingListing[];
    onListingPress: (id: string) => void;
}

export default function ParkingMap({ listings, onListingPress }: ParkingMapProps) {
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude: 43.6532,
                longitude: -79.3832,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
            }}
        >
            {listings.map((listing) => (
                <Marker
                    key={listing.id}
                    coordinate={{
                        latitude: listing.latitude,
                        longitude: listing.longitude,
                    }}
                    onPress={() => onListingPress(listing.id)}
                >
                    <View style={styles.markerContainer}>
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>${listing.hourlyRate}</Text>
                        </View>
                    </View>
                </Marker>
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: width,
        height: height,
    },
    markerContainer: {
        alignItems: 'center',
    },
    marker: {
        backgroundColor: '#000',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    markerText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '700',
    },
});
