import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { MapPin, DollarSign, Image as ImageIcon, X } from 'lucide-react-native';

export default function CreateListingScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        photos: [] as string[],
        spaceType: '',
        hourlyRate: '',
        dailyRate: '',
        description: '',
    });

    const totalSteps = 4;

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            {Array.from({ length: totalSteps }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.stepDot,
                        index + 1 <= step && styles.stepDotActive,
                    ]}
                />
            ))}
        </View>
    );

    const renderStep1 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Add Photos</Text>
            <Text style={styles.stepDescription}>
                Upload clear photos of your parking space. Good photos get more bookings!
            </Text>
            <View style={styles.photosGrid}>
                {formData.photos.length < 5 && (
                    <TouchableOpacity style={styles.photoUpload}>
                        <ImageIcon size={32} color="#999" />
                        <Text style={styles.photoUploadText}>Add Photo</Text>
                    </TouchableOpacity>
                )}
                {formData.photos.map((photo, index) => (
                    <View key={index} style={styles.photoPreview}>
                        <Image source={{ uri: photo }} style={styles.photoImage} />
                        <TouchableOpacity
                            style={styles.photoRemove}
                            onPress={() => {
                                const newPhotos = formData.photos.filter((_, i) => i !== index);
                                setFormData({ ...formData, photos: newPhotos });
                            }}
                        >
                            <X size={16} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <TouchableOpacity
                style={styles.sampleButton}
                onPress={() => {
                    setFormData({
                        ...formData,
                        photos: [
                            'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800',
                            'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800',
                        ],
                    });
                }}
            >
                <Text style={styles.sampleButtonText}>Use Sample Photos</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Location Details</Text>
            <Text style={styles.stepDescription}>
                Where is your parking space located?
            </Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Space Title</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Downtown Covered Garage"
                    value={formData.title}
                    onChangeText={(text) => setFormData({ ...formData, title: text })}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="123 Main St, City, State"
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                />
            </View>
            <TouchableOpacity style={styles.mapButton}>
                <MapPin size={20} color="#000" />
                <Text style={styles.mapButtonText}>Set Location on Map</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Space Details</Text>
            <Text style={styles.stepDescription}>
                Tell us about your parking space
            </Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Space Type</Text>
                <View style={styles.typeGrid}>
                    {['Garage', 'Driveway', 'Outdoor', 'Street'].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.typeButton,
                                formData.spaceType === type && styles.typeButtonActive,
                            ]}
                            onPress={() => setFormData({ ...formData, spaceType: type })}
                        >
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    formData.spaceType === type && styles.typeButtonTextActive,
                                ]}
                            >
                                {type}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Describe your parking space..."
                    value={formData.description}
                    onChangeText={(text) => setFormData({ ...formData, description: text })}
                    multiline
                    numberOfLines={4}
                />
            </View>
        </View>
    );

    const renderStep4 = () => (
        <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Set Your Pricing</Text>
            <Text style={styles.stepDescription}>
                How much do you want to charge?
            </Text>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Hourly Rate</Text>
                <View style={styles.priceInput}>
                    <DollarSign size={20} color="#666" />
                    <TextInput
                        style={styles.priceInputField}
                        placeholder="0.00"
                        value={formData.hourlyRate}
                        onChangeText={(text) => setFormData({ ...formData, hourlyRate: text })}
                        keyboardType="decimal-pad"
                    />
                    <Text style={styles.priceUnit}>/hour</Text>
                </View>
            </View>
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Daily Rate</Text>
                <View style={styles.priceInput}>
                    <DollarSign size={20} color="#666" />
                    <TextInput
                        style={styles.priceInputField}
                        placeholder="0.00"
                        value={formData.dailyRate}
                        onChangeText={(text) => setFormData({ ...formData, dailyRate: text })}
                        keyboardType="decimal-pad"
                    />
                    <Text style={styles.priceUnit}>/day</Text>
                </View>
            </View>
            <View style={styles.recommendationCard}>
                <Text style={styles.recommendationTitle}>💡 Pricing Tip</Text>
                <Text style={styles.recommendationText}>
                    Similar spaces in your area charge $8-12/hour. Competitive pricing helps you get more bookings!
                </Text>
            </View>
        </View>
    );

    const renderCurrentStep = () => {
        switch (step) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            case 3: return renderStep3();
            case 4: return renderStep4();
            default: return null;
        }
    };

    const canProceed = () => {
        switch (step) {
            case 1: return formData.photos.length > 0;
            case 2: return formData.title && formData.address;
            case 3: return formData.spaceType && formData.description;
            case 4: return formData.hourlyRate && formData.dailyRate;
            default: return false;
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Create Listing',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={styles.headerButton}>Cancel</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
            >
                {renderStepIndicator()}
                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {renderCurrentStep()}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    {step > 1 && (
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setStep(step - 1)}
                        >
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            !canProceed() && styles.nextButtonDisabled,
                            step === 1 && styles.nextButtonFull,
                        ]}
                        disabled={!canProceed()}
                        onPress={() => {
                            if (step < totalSteps) {
                                setStep(step + 1);
                            } else {
                                router.back();
                            }
                        }}
                    >
                        <Text style={styles.nextButtonText}>
                            {step === totalSteps ? 'Publish Listing' : 'Continue'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerButton: {
        fontSize: 16,
        color: '#000',
    },
    stepIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        gap: 8,
    },
    stepDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
    },
    stepDotActive: {
        width: 32,
        backgroundColor: '#000',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    stepContent: {
        padding: 20,
    },
    stepTitle: {
        fontSize: 28,
        fontWeight: '700' as const,
        color: '#000',
        marginBottom: 8,
    },
    stepDescription: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
        lineHeight: 24,
    },
    photosGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 16,
    },
    photoUpload: {
        width: 100,
        height: 100,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed' as const,
        justifyContent: 'center',
        alignItems: 'center',
    },
    photoUploadText: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    photoPreview: {
        width: 100,
        height: 100,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    photoImage: {
        width: '100%',
        height: '100%',
    },
    photoRemove: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sampleButton: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
        alignItems: 'center',
    },
    sampleButtonText: {
        fontSize: 14,
        fontWeight: '600' as const,
        color: '#000',
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#000',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#000',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    mapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#000',
        gap: 8,
    },
    mapButtonText: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#000',
    },
    typeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    typeButton: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFF',
    },
    typeButtonActive: {
        borderColor: '#000',
        backgroundColor: '#F5F5F5',
    },
    typeButtonText: {
        fontSize: 15,
        fontWeight: '600' as const,
        color: '#666',
    },
    typeButtonTextActive: {
        color: '#000',
    },
    priceInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        gap: 8,
    },
    priceInputField: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600' as const,
        color: '#000',
    },
    priceUnit: {
        fontSize: 16,
        color: '#666',
    },
    recommendationCard: {
        backgroundColor: '#FFF9E6',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFE082',
    },
    recommendationTitle: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#000',
        marginBottom: 8,
    },
    recommendationText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 12,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    backButton: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#000',
    },
    nextButton: {
        flex: 2,
        backgroundColor: '#000',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    nextButtonFull: {
        flex: 1,
    },
    nextButtonDisabled: {
        backgroundColor: '#E0E0E0',
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '600' as const,
        color: '#FFF',
    },
});
