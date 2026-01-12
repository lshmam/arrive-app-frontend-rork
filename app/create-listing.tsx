import { Link, useRouter } from 'expo-router';
import {
    Building2,
    Camera,
    Car,
    Check,
    CircleParking,
    Clock,
    HelpCircle,
    Home,
    Lock,
    MapPin,
    Minus,
    Navigation,
    Pencil,
    Plus,
    Shield,
    Sun,
    Train,
    Trees,
    X,
    Zap
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Types for form data
interface FormData {
    spaceType: string;
    address: string;
    city: string;
    postalCode: string;
    vehicleCapacity: number;
    spaceSize: string;
    accessHours: string;
    amenities: string[];
    photos: string[];
    title: string;
    description: string;
    bookingType: string;
    hourlyRate: string;
    dailyRate: string;
    weekendPremium: number;
}

// Space type options
const spaceTypes = [
    { id: 'garage', label: 'Garage', icon: Home },
    { id: 'driveway', label: 'Driveway', icon: Car },
    { id: 'carport', label: 'Carport', icon: Building2 },
    { id: 'outdoor', label: 'Outdoor Lot', icon: Trees },
    { id: 'street', label: 'Street Parking', icon: MapPin },
    { id: 'underground', label: 'Underground', icon: CircleParking },
];

// Amenity options
const amenityOptions = [
    { id: 'covered', label: 'Covered', icon: Home },
    { id: 'ev_charging', label: 'EV Charging', icon: Zap },
    { id: 'security_camera', label: 'Security Camera', icon: Camera },
    { id: 'gated', label: 'Gated Access', icon: Lock },
    { id: 'well_lit', label: 'Well Lit', icon: Sun },
    { id: '24_7', label: '24/7 Access', icon: Clock },
    { id: 'easy_access', label: 'Easy Entry', icon: Navigation },
    { id: 'near_transit', label: 'Near Transit', icon: Train },
];

// Space size options
const spaceSizes = ['Compact', 'Standard', 'Oversized', 'Any Vehicle'];

export default function CreateListingScreen() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        spaceType: '',
        address: '',
        city: '',
        postalCode: '',
        vehicleCapacity: 1,
        spaceSize: '',
        accessHours: '24/7',
        amenities: [],
        photos: [],
        title: '',
        description: '',
        bookingType: 'approve',
        hourlyRate: '',
        dailyRate: '',
        weekendPremium: 0,
    });

    // Total steps in the flow
    const totalSteps = 15;

    // Calculate which phase we're in (1, 2, or 3)
    const getPhase = () => {
        if (currentStep <= 5) return 1;
        if (currentStep <= 10) return 2;
        return 3;
    };

    // Calculate progress within current phase
    const getPhaseProgress = () => {
        const phase = getPhase();
        if (phase === 1) {
            return Math.min((currentStep / 5) * 100, 100);
        } else if (phase === 2) {
            return Math.min(((currentStep - 5) / 5) * 100, 100);
        } else {
            return Math.min(((currentStep - 10) / 5) * 100, 100);
        }
    };

    // Toggle amenity selection
    const toggleAmenity = (id: string) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(id)
                ? prev.amenities.filter(a => a !== id)
                : [...prev.amenities, id],
        }));
    };

    // Header with Save & Exit and Questions buttons
    const renderHeader = () => (
        <View style={styles.header}>
            <TouchableOpacity
                style={styles.headerButton}
                onPress={() => router.back()}
            >
                <X size={20} color="#000" />
            </TouchableOpacity>
            {currentStep > 0 && (
                <TouchableOpacity style={styles.headerButtonRight}>
                    <HelpCircle size={20} color="#000" />
                </TouchableOpacity>
            )}
        </View>
    );

    // Progress bar showing 3 phases
    const renderProgressBar = () => {
        if (currentStep === 0) return null;

        const phase = getPhase();
        const progress = getPhaseProgress();

        return (
            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    {/* Phase 1 */}
                    <View style={[styles.progressSegment, phase >= 1 && styles.progressSegmentActive]}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: phase === 1 ? `${progress}%` : phase > 1 ? '100%' : '0%' },
                            ]}
                        />
                    </View>
                    {/* Phase 2 */}
                    <View style={[styles.progressSegment, phase >= 2 && styles.progressSegmentActive]}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: phase === 2 ? `${progress}%` : phase > 2 ? '100%' : '0%' },
                            ]}
                        />
                    </View>
                    {/* Phase 3 */}
                    <View style={[styles.progressSegment, phase >= 3 && styles.progressSegmentActive]}>
                        <View
                            style={[
                                styles.progressFill,
                                { width: phase === 3 ? `${progress}%` : '0%' },
                            ]}
                        />
                    </View>
                </View>
            </View>
        );
    };

    // Step 0: Welcome intro
    const renderWelcome = () => (
        <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>It's easy to get started on ParkOn</Text>

            <View style={styles.welcomeSteps}>
                <View style={styles.welcomeStep}>
                    <Text style={styles.welcomeStepNumber}>1</Text>
                    <View style={styles.welcomeStepContent}>
                        <Text style={styles.welcomeStepTitle}>Tell us about your space</Text>
                        <Text style={styles.welcomeStepDesc}>
                            Share some basic info, like where it is and how many cars can park.
                        </Text>
                    </View>
                    <View style={styles.welcomeStepImage}>
                        <Text style={styles.welcomeEmoji}>🅿️</Text>
                    </View>
                </View>

                <View style={styles.welcomeStep}>
                    <Text style={styles.welcomeStepNumber}>2</Text>
                    <View style={styles.welcomeStepContent}>
                        <Text style={styles.welcomeStepTitle}>Make it stand out</Text>
                        <Text style={styles.welcomeStepDesc}>
                            Add photos plus a title and description—we'll help you out.
                        </Text>
                    </View>
                    <View style={styles.welcomeStepImage}>
                        <Text style={styles.welcomeEmoji}>📸</Text>
                    </View>
                </View>

                <View style={styles.welcomeStep}>
                    <Text style={styles.welcomeStepNumber}>3</Text>
                    <View style={styles.welcomeStepContent}>
                        <Text style={styles.welcomeStepTitle}>Finish up and publish</Text>
                        <Text style={styles.welcomeStepDesc}>
                            Choose a starting price, verify a few details, then publish your listing.
                        </Text>
                    </View>
                    <View style={styles.welcomeStepImage}>
                        <Text style={styles.welcomeEmoji}>🚀</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    // Step 1: Phase 1 Intro
    const renderPhase1Intro = () => (
        <View style={styles.phaseIntro}>
            <View style={styles.phaseImageContainer}>
                <Text style={styles.phaseEmoji}>🏠</Text>
            </View>
            <Text style={styles.phaseStep}>Step 1</Text>
            <Text style={styles.phaseTitle}>Tell us about your space</Text>
            <Text style={styles.phaseDesc}>
                In this step, we'll ask you which type of parking space you have and where it's located. Then let us know how many vehicles can fit.
            </Text>
        </View>
    );

    // Step 2: Space Type Selection
    const renderSpaceType = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Which of these best describes your parking space?</Text>
            <View style={styles.optionsGrid}>
                {spaceTypes.map(type => {
                    const IconComponent = type.icon;
                    const isSelected = formData.spaceType === type.id;
                    return (
                        <TouchableOpacity
                            key={type.id}
                            style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                            onPress={() => setFormData({ ...formData, spaceType: type.id })}
                        >
                            <IconComponent size={28} color={isSelected ? '#000' : '#666'} />
                            <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                                {type.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    // Step 3: Location Input
    const renderLocation = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Where's your parking space located?</Text>
            <Text style={styles.stepSubtitle}>
                Your address is only shared with renters after they've made a reservation.
            </Text>

            <View style={styles.inputContainer}>
                <MapPin size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your address"
                    value={formData.address}
                    onChangeText={text => setFormData({ ...formData, address: text })}
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.mapPreview}>
                <Text style={styles.mapPlaceholder}>📍 Map Preview</Text>
            </View>
        </View>
    );

    // Step 4: Confirm Address
    const renderConfirmAddress = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Confirm your address</Text>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Street address</Text>
                <TextInput
                    style={styles.formInput}
                    value={formData.address}
                    onChangeText={text => setFormData({ ...formData, address: text })}
                    placeholder="123 Main Street"
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>City</Text>
                <TextInput
                    style={styles.formInput}
                    value={formData.city}
                    onChangeText={text => setFormData({ ...formData, city: text })}
                    placeholder="Vancouver"
                    placeholderTextColor="#999"
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Postal code</Text>
                <TextInput
                    style={styles.formInput}
                    value={formData.postalCode}
                    onChangeText={text => setFormData({ ...formData, postalCode: text })}
                    placeholder="V5H 0B8"
                    placeholderTextColor="#999"
                />
            </View>
        </View>
    );

    // Step 5: Basic Details
    const renderBasicDetails = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Share some basics about your space</Text>
            <Text style={styles.stepSubtitle}>You'll add more details later.</Text>

            {/* Vehicle Capacity */}
            <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>Vehicle capacity</Text>
                <View style={styles.counterControls}>
                    <TouchableOpacity
                        style={[styles.counterButton, formData.vehicleCapacity <= 1 && styles.counterButtonDisabled]}
                        onPress={() => formData.vehicleCapacity > 1 && setFormData({ ...formData, vehicleCapacity: formData.vehicleCapacity - 1 })}
                        disabled={formData.vehicleCapacity <= 1}
                    >
                        <Minus size={20} color={formData.vehicleCapacity <= 1 ? '#ccc' : '#000'} />
                    </TouchableOpacity>
                    <Text style={styles.counterValue}>{formData.vehicleCapacity}</Text>
                    <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => setFormData({ ...formData, vehicleCapacity: formData.vehicleCapacity + 1 })}
                    >
                        <Plus size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Space Size */}
            <View style={styles.sizeSection}>
                <Text style={styles.sectionLabel}>Space size</Text>
                <View style={styles.sizeOptions}>
                    {spaceSizes.map(size => (
                        <TouchableOpacity
                            key={size}
                            style={[styles.sizeOption, formData.spaceSize === size && styles.sizeOptionSelected]}
                            onPress={() => setFormData({ ...formData, spaceSize: size })}
                        >
                            <Text style={[styles.sizeOptionText, formData.spaceSize === size && styles.sizeOptionTextSelected]}>
                                {size}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );

    // Step 6: Phase 2 Intro
    const renderPhase2Intro = () => (
        <View style={styles.phaseIntro}>
            <View style={styles.phaseImageContainer}>
                <Text style={styles.phaseEmoji}>✨</Text>
            </View>
            <Text style={styles.phaseStep}>Step 2</Text>
            <Text style={styles.phaseTitle}>Make your space stand out</Text>
            <Text style={styles.phaseDesc}>
                In this step, you'll add some of the amenities your space offers, plus photos. Then, you'll create a title and description.
            </Text>
        </View>
    );

    // Step 7: Amenities
    const renderAmenities = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Tell renters what your space offers</Text>
            <Text style={styles.stepSubtitle}>You can add more amenities after you publish.</Text>

            <View style={styles.amenitiesGrid}>
                {amenityOptions.map(amenity => {
                    const IconComponent = amenity.icon;
                    const isSelected = formData.amenities.includes(amenity.id);
                    return (
                        <TouchableOpacity
                            key={amenity.id}
                            style={[styles.amenityCard, isSelected && styles.amenityCardSelected]}
                            onPress={() => toggleAmenity(amenity.id)}
                        >
                            <IconComponent size={24} color={isSelected ? '#000' : '#666'} />
                            <Text style={[styles.amenityLabel, isSelected && styles.amenityLabelSelected]}>
                                {amenity.label}
                            </Text>
                            {isSelected && (
                                <View style={styles.amenityCheck}>
                                    <Check size={16} color="#000" />
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );

    // Step 8: Photos
    const renderPhotos = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Add photos of your parking space</Text>
            <Text style={styles.stepSubtitle}>
                You'll need at least 3 photos to get started. You can add more or make changes later.
            </Text>

            <TouchableOpacity style={styles.photoUploadButton}>
                <Plus size={24} color="#000" />
                <Text style={styles.photoUploadText}>Add photos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.photoUploadButton}>
                <Camera size={24} color="#000" />
                <Text style={styles.photoUploadText}>Take new photos</Text>
            </TouchableOpacity>

            {formData.photos.length === 0 && (
                <TouchableOpacity
                    style={styles.sampleButton}
                    onPress={() => {
                        setFormData({
                            ...formData,
                            photos: [
                                'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800',
                                'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800',
                                'https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?w=800',
                            ],
                        });
                    }}
                >
                    <Text style={styles.sampleButtonText}>Use sample photos for demo</Text>
                </TouchableOpacity>
            )}

            {formData.photos.length > 0 && (
                <View style={styles.photoGrid}>
                    {formData.photos.map((photo, index) => (
                        <View key={index} style={styles.photoPreview}>
                            <Image source={{ uri: photo }} style={styles.photoImage} />
                            <TouchableOpacity
                                style={styles.photoRemove}
                                onPress={() => setFormData({
                                    ...formData,
                                    photos: formData.photos.filter((_, i) => i !== index)
                                })}
                            >
                                <X size={16} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );

    // Step 9: Title
    const renderTitle = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Now, let's give your space a title</Text>
            <Text style={styles.stepSubtitle}>
                Short titles work best. Have fun with it—you can always change it later.
            </Text>

            <TextInput
                style={styles.titleInput}
                placeholder="Secure Downtown Garage"
                value={formData.title}
                onChangeText={text => setFormData({ ...formData, title: text.slice(0, 50) })}
                placeholderTextColor="#999"
                multiline
            />
            <Text style={styles.charCount}>{formData.title.length}/50</Text>
        </View>
    );

    // Step 10: Description
    const renderDescription = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Create your description</Text>
            <Text style={styles.stepSubtitle}>Share what makes your parking space special.</Text>

            <TextInput
                style={styles.descriptionInput}
                placeholder="Convenient covered parking in downtown area. Easy access from main street, well-lit at night..."
                value={formData.description}
                onChangeText={text => setFormData({ ...formData, description: text.slice(0, 500) })}
                placeholderTextColor="#999"
                multiline
                textAlignVertical="top"
            />
            <Text style={styles.charCount}>{formData.description.length}/500</Text>
        </View>
    );

    // Step 11: Phase 3 Intro
    const renderPhase3Intro = () => (
        <View style={styles.phaseIntro}>
            <View style={styles.phaseImageContainer}>
                <Text style={styles.phaseEmoji}>🚀</Text>
            </View>
            <Text style={styles.phaseStep}>Step 3</Text>
            <Text style={styles.phaseTitle}>Finish up and publish</Text>
            <Text style={styles.phaseDesc}>
                Finally, you'll choose booking settings, set up pricing, and publish your listing.
            </Text>
        </View>
    );

    // Step 12: Booking Settings
    const renderBookingSettings = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Pick your booking settings</Text>
            <Text style={styles.stepSubtitle}>You can change this at any time.</Text>

            <TouchableOpacity
                style={[styles.bookingOption, formData.bookingType === 'approve' && styles.bookingOptionSelected]}
                onPress={() => setFormData({ ...formData, bookingType: 'approve' })}
            >
                <View style={styles.bookingOptionContent}>
                    <Text style={styles.bookingOptionTitle}>Approve your first 5 bookings</Text>
                    <Text style={styles.bookingOptionRecommended}>Recommended</Text>
                    <Text style={styles.bookingOptionDesc}>
                        Start by reviewing reservation requests, then switch to Instant Book so renters can book automatically.
                    </Text>
                </View>
                <Shield size={24} color="#666" />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.bookingOption, formData.bookingType === 'instant' && styles.bookingOptionSelected]}
                onPress={() => setFormData({ ...formData, bookingType: 'instant' })}
            >
                <View style={styles.bookingOptionContent}>
                    <Text style={styles.bookingOptionTitle}>Use Instant Book</Text>
                    <Text style={styles.bookingOptionDesc}>
                        Let renters book automatically without waiting for approval.
                    </Text>
                </View>
                <Zap size={24} color="#666" />
            </TouchableOpacity>
        </View>
    );

    // Step 13: Pricing
    const renderPricing = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Now, set your price</Text>
            <Text style={styles.stepSubtitle}>You can change it anytime.</Text>

            <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Hourly rate</Text>
                <View style={styles.priceInputContainer}>
                    <Text style={styles.priceCurrency}>$</Text>
                    <TextInput
                        style={styles.priceInput}
                        placeholder="5"
                        value={formData.hourlyRate}
                        onChangeText={text => setFormData({ ...formData, hourlyRate: text })}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.priceEdit}>
                        <Pencil size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.priceSection}>
                <Text style={styles.priceLabel}>Daily rate</Text>
                <View style={styles.priceInputContainer}>
                    <Text style={styles.priceCurrency}>$</Text>
                    <TextInput
                        style={styles.priceInput}
                        placeholder="25"
                        value={formData.dailyRate}
                        onChangeText={text => setFormData({ ...formData, dailyRate: text })}
                        keyboardType="decimal-pad"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.priceEdit}>
                        <Pencil size={20} color="#666" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.viewSimilarButton}>
                <MapPin size={18} color="#E91E63" />
                <Text style={styles.viewSimilarText}>View similar listings</Text>
            </TouchableOpacity>
        </View>
    );

    // Step 14: Review & Publish
    const renderReview = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Review your listing</Text>
            <Text style={styles.stepSubtitle}>Here's what renters will see.</Text>

            <View style={styles.reviewCard}>
                {formData.photos.length > 0 && (
                    <Image source={{ uri: formData.photos[0] }} style={styles.reviewImage} />
                )}
                <View style={styles.reviewContent}>
                    <Text style={styles.reviewTitle}>{formData.title || 'Your Parking Space'}</Text>
                    <Text style={styles.reviewLocation}>{formData.city || 'Your City'}</Text>
                    <Text style={styles.reviewPrice}>
                        ${formData.hourlyRate || '0'}/hr · ${formData.dailyRate || '0'}/day
                    </Text>
                </View>
            </View>

            <View style={styles.reviewChecklist}>
                <View style={styles.checklistItem}>
                    <Check size={20} color="#00C853" />
                    <Text style={styles.checklistText}>Space type: {spaceTypes.find(t => t.id === formData.spaceType)?.label || 'Not set'}</Text>
                </View>
                <View style={styles.checklistItem}>
                    <Check size={20} color="#00C853" />
                    <Text style={styles.checklistText}>Capacity: {formData.vehicleCapacity} vehicle(s)</Text>
                </View>
                <View style={styles.checklistItem}>
                    <Check size={20} color="#00C853" />
                    <Text style={styles.checklistText}>{formData.amenities.length} amenities selected</Text>
                </View>
                <View style={styles.checklistItem}>
                    <Check size={20} color="#00C853" />
                    <Text style={styles.checklistText}>{formData.photos.length} photos uploaded</Text>
                </View>
            </View>
        </View>
    );

    // Step 15: Success
    const renderSuccess = () => (
        <View style={[styles.stepContainer, styles.successContainer]}>
            <View style={styles.successIconContainer}>
                <Check size={48} color="#FFF" />
            </View>
            <Text style={styles.successTitle}>Listing published!</Text>
            <Text style={styles.successSubtitle}>
                Your parking space is now live and visible to thousands of drivers.
            </Text>

            <View style={styles.successCard}>
                <Image source={{ uri: formData.photos[0] || 'https://images.unsplash.com/photo-1573348722427-f1d6d19f49f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80' }} style={styles.successImage} />
                <View style={styles.successContent}>
                    <Text style={styles.successCardTitle}>{formData.title}</Text>
                    <Link href="/(tabs)/listings" asChild>
                        <TouchableOpacity style={styles.successButton}>
                            <Text style={styles.successButtonText}>View Listing</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>

            <TouchableOpacity
                style={styles.dashboardButton}
                onPress={() => router.navigate('/(tabs)/dashboard')}
            >
                <Text style={styles.dashboardButtonText}>Return to Dashboard</Text>
            </TouchableOpacity>
        </View>
    );

    // Render current step content
    const renderStep = () => {
        switch (currentStep) {
            case 0: return renderWelcome();
            case 1: return renderPhase1Intro();
            case 2: return renderSpaceType();
            case 3: return renderLocation();
            case 4: return renderConfirmAddress();
            case 5: return renderBasicDetails();
            case 6: return renderPhase2Intro();
            case 7: return renderAmenities();
            case 8: return renderPhotos();
            case 9: return renderTitle();
            case 10: return renderDescription();
            case 11: return renderPhase3Intro();
            case 12: return renderBookingSettings();
            case 13: return renderPricing();
            case 14: return renderReview();
            case 15: return renderSuccess();
            default: return null;
        }
    };

    // Check if we can proceed to next step
    const canProceed = () => {
        switch (currentStep) {
            case 0: return true; // Welcome
            case 1: return true; // Phase intro
            case 2: return formData.spaceType !== '';
            case 3: return formData.address !== '';
            case 4: return formData.address !== '' && formData.city !== '';
            case 5: return formData.spaceSize !== '';
            case 6: return true; // Phase intro
            case 7: return formData.amenities.length > 0;
            case 8: return formData.photos.length >= 1;
            case 9: return formData.title.length >= 5;
            case 10: return formData.description.length >= 20;
            case 11: return true; // Phase intro
            case 12: return true;
            case 13: return formData.hourlyRate !== '' && formData.dailyRate !== '';
            case 14: return true;
            case 15: return true;
            default: return false;
        }
    };

    // Get button text based on current step
    const getButtonText = () => {
        if (currentStep === 0) return 'Get started';
        if (currentStep === 14) return 'Publish listing';
        return 'Next';
    };

    // Handle next button press
    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            // Publish listing
            router.back();
        }
    };

    // Handle back button press
    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <View style={styles.container}>
            {renderHeader()}
            {renderProgressBar()}

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {renderStep()}
            </ScrollView>

            {currentStep < 15 && (
                <View style={styles.footer}>
                    {currentStep > 0 && (
                        <TouchableOpacity onPress={handleBack}>
                            <Text style={styles.backButton}>Back</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={[
                            styles.nextButton,
                            !canProceed() && styles.nextButtonDisabled,
                            currentStep === 0 && styles.nextButtonFull,
                        ]}
                        onPress={handleNext}
                        disabled={!canProceed()}
                    >
                        <Text style={styles.nextButtonText}>{getButtonText()}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 16,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonRight: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressContainer: {
        paddingHorizontal: 20,
        marginBottom: 8,
    },
    progressBar: {
        flexDirection: 'row',
        gap: 4,
    },
    progressSegment: {
        flex: 1,
        height: 2,
        backgroundColor: '#E0E0E0',
        borderRadius: 1,
        overflow: 'hidden',
    },
    progressSegmentActive: {
        backgroundColor: '#E0E0E0',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#000',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 40,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: 50,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    backButton: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        textDecorationLine: 'underline',
    },
    nextButton: {
        backgroundColor: '#000',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 8,
    },
    nextButtonFull: {
        flex: 1,
        alignItems: 'center',
    },
    nextButtonDisabled: {
        backgroundColor: '#E0E0E0',
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },

    // Welcome screen
    welcomeContainer: {
        padding: 20,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000',
        marginBottom: 32,
        lineHeight: 36,
    },
    welcomeSteps: {
        gap: 24,
    },
    welcomeStep: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    welcomeStepNumber: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    welcomeStepContent: {
        flex: 1,
    },
    welcomeStepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    welcomeStepDesc: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
    },
    welcomeStepImage: {
        width: 80,
        height: 80,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeEmoji: {
        fontSize: 32,
    },

    // Phase intro
    phaseIntro: {
        padding: 20,
        alignItems: 'flex-start',
    },
    phaseImageContainer: {
        width: width - 40,
        height: 280,
        backgroundColor: '#F9F9F9',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    phaseEmoji: {
        fontSize: 80,
    },
    phaseStep: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
    },
    phaseTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
    },
    phaseDesc: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
    },

    // Step container
    stepContainer: {
        padding: 20,
    },
    stepTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
        lineHeight: 34,
    },
    stepSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
        lineHeight: 24,
    },

    // Options grid (space types)
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    optionCard: {
        width: (width - 52) / 2,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        alignItems: 'flex-start',
        gap: 12,
    },
    optionCardSelected: {
        borderColor: '#000',
        borderWidth: 2,
    },
    optionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666',
    },
    optionLabelSelected: {
        color: '#000',
        fontWeight: '600',
    },

    // Location input
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        color: '#000',
    },
    mapPreview: {
        height: 200,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPlaceholder: {
        fontSize: 18,
        color: '#999',
    },

    // Form inputs
    formGroup: {
        marginBottom: 20,
    },
    formLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    formInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },

    // Counter
    counterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    counterLabel: {
        fontSize: 16,
        color: '#000',
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    counterButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterButtonDisabled: {
        borderColor: '#F0F0F0',
    },
    counterValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        minWidth: 24,
        textAlign: 'center',
    },

    // Size options
    sizeSection: {
        marginTop: 24,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    sizeOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    sizeOption: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    sizeOptionSelected: {
        borderColor: '#000',
        backgroundColor: '#F5F5F5',
    },
    sizeOptionText: {
        fontSize: 14,
        color: '#666',
    },
    sizeOptionTextSelected: {
        color: '#000',
        fontWeight: '600',
    },

    // Amenities
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    amenityCard: {
        width: (width - 52) / 2,
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        position: 'relative',
    },
    amenityCardSelected: {
        borderColor: '#000',
        backgroundColor: '#F9F9F9',
    },
    amenityLabel: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    amenityLabelSelected: {
        color: '#000',
        fontWeight: '500',
    },
    amenityCheck: {
        position: 'absolute',
        top: 8,
        right: 8,
    },

    // Photos
    photoUploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        marginBottom: 12,
    },
    photoUploadText: {
        fontSize: 16,
        color: '#000',
    },
    sampleButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    sampleButtonText: {
        fontSize: 14,
        color: '#666',
        textDecorationLine: 'underline',
    },
    photoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 16,
    },
    photoPreview: {
        width: (width - 56) / 3,
        aspectRatio: 1,
        borderRadius: 8,
        overflow: 'hidden',
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

    // Title input
    titleInput: {
        fontSize: 24,
        fontWeight: '500',
        color: '#000',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    charCount: {
        fontSize: 14,
        color: '#999',
        marginTop: 8,
        textAlign: 'right',
    },

    // Description input
    descriptionInput: {
        fontSize: 16,
        color: '#000',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        padding: 16,
        minHeight: 160,
        textAlignVertical: 'top',
    },

    // Booking options
    bookingOption: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        marginBottom: 12,
        gap: 16,
    },
    bookingOptionSelected: {
        borderColor: '#000',
        borderWidth: 2,
    },
    bookingOptionContent: {
        flex: 1,
    },
    bookingOptionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    bookingOptionRecommended: {
        fontSize: 12,
        color: '#00C853',
        fontWeight: '600',
        marginBottom: 8,
    },
    bookingOptionDesc: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },

    // Pricing
    priceSection: {
        marginBottom: 32,
    },
    priceLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    priceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceCurrency: {
        fontSize: 40,
        fontWeight: '600',
        color: '#000',
    },
    priceInput: {
        flex: 1,
        fontSize: 40,
        fontWeight: '600',
        color: '#000',
    },
    priceEdit: {
        padding: 8,
    },
    viewSimilarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 24,
    },
    viewSimilarText: {
        fontSize: 14,
        color: '#000',
    },

    // Review
    reviewCard: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 24,
    },
    reviewImage: {
        width: '100%',
        height: 180,
    },
    reviewContent: {
        padding: 16,
    },
    reviewTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 4,
    },
    reviewLocation: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    reviewPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    reviewChecklist: {
        gap: 16,
    },
    checklistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    checklistText: {
        fontSize: 16,
        color: '#000',
    },

    // Success Screen
    successContainer: {
        alignItems: 'center',
        paddingTop: 60,
    },
    successIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#00C853',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000',
        marginBottom: 12,
        textAlign: 'center',
    },
    successSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
        lineHeight: 24,
    },
    successCard: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        overflow: 'hidden',
        marginBottom: 40,
    },
    successImage: {
        width: '100%',
        height: 200,
    },
    successContent: {
        padding: 20,
    },
    successCardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,
    },
    successButton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    successButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    dashboardButton: {
        paddingVertical: 12,
    },
    dashboardButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
});
