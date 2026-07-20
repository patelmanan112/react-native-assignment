import React, { useRef, useState, useEffect } from "react";
import { View, Text, Image, Alert, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { CustomButton } from "@/components/ui/CustomButton";
import { Card } from "@/components/ui/Card";
import { Colors, Layout } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSurvey } from "@/hooks/SurveyContext";

export default function CameraScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const cameraRef = useRef<CameraView>(null);
    const router = useRouter();
    const { draftSurvey, updateDraft } = useSurvey();
    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState<string | null>(draftSurvey.photoUri || null);
    const [captureTime, setCaptureTime] = useState<string>("");
    const [loading, setLoading] = useState(false);

    if (!permission) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
            </View>
        );
    }

    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text style={[styles.permissionText, { color: Colors[colorScheme].text }]}>
                    Camera Permission Required
                </Text>
                <CustomButton title="Allow Camera" onPress={requestPermission} />
            </View>
        );
    }

    const takePhoto = async () => {
        try {
            if (!cameraRef.current) return;
            setLoading(true);
            const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
            if (photo && photo.uri) {
                setImage(photo.uri);
                setCaptureTime(new Date().toLocaleString());
            }
        } catch (error) {
            Alert.alert("Error", "Unable to capture image");
        } finally {
            setLoading(false);
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            quality: 0.7,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const pickedUri = result.assets[0].uri;
            setImage(pickedUri);
            setCaptureTime(new Date().toLocaleString());
            updateDraft({ photoUri: pickedUri });
        }
    };

    const submitImage = () => {
        if (!image) {
            Alert.alert("Error", "Please select an image first.");
            return;
        }

        updateDraft({ photoUri: image });

        try {
            router.push('/(drawer)/location' as any);
        } catch (error) {
            console.warn('Failed to navigate to location screen', error);
            Alert.alert('Success', 'Photo attached to survey draft');
        }
    };

    const deletePhoto = () => {
        Alert.alert(
            "Delete Photo",
            "Are you sure you want to delete this photo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setImage(null);
                        setCaptureTime("");
                        updateDraft({ photoUri: undefined });
                    }
                }
            ]
        );
    };

    if (image) {
        return (
            <ScreenContainer>
                <Card>
                    <Text style={[styles.heading, { color: Colors[colorScheme].text }]}>Preview Image</Text>
                    <Image source={{ uri: image }} style={styles.image} />
                    {captureTime ? (
                        <Text style={[styles.time, { color: Colors[colorScheme].textSecondary }]}>
                            Captured at: {captureTime}
                        </Text>
                    ) : null}
                    
                    <CustomButton 
                        title="Use This Photo" 
                        onPress={submitImage} 
                        style={{ marginTop: Layout.spacing.lg }} 
                    />
                    <CustomButton 
                        title="Retake / Select Another" 
                        onPress={() => setImage(null)} 
                        variant="secondary"
                        style={{ marginTop: Layout.spacing.md }} 
                    />
                    <CustomButton 
                        title="Delete Photo" 
                        onPress={deletePhoto} 
                        variant="danger"
                        style={{ marginTop: Layout.spacing.md }} 
                    />
                </Card>
            </ScreenContainer>
        );
    }

    return (
        <ScreenContainer scrollable={false}>
            <View style={styles.cameraContainer}>
                <CameraView ref={cameraRef} style={styles.camera} facing="back" />
                {loading && (
                    <ActivityIndicator size="large" color={Colors[colorScheme].tint} style={styles.loader} />
                )}
            </View>
            <View style={styles.controls}>
                <CustomButton title="Capture Photo" onPress={takePhoto} />
                <CustomButton 
                    title="Pick From Gallery" 
                    onPress={pickImage} 
                    variant="outline" 
                    style={{ marginTop: Layout.spacing.md }} 
                />
            </View>
        </ScreenContainer>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    permissionText: {
        fontSize: 18,
        marginBottom: Layout.spacing.lg,
        fontWeight: "bold",
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: Layout.spacing.md,
    },
    image: {
        width: "100%",
        height: 350,
        borderRadius: Layout.radius.md,
    },
    time: {
        marginTop: Layout.spacing.sm,
        fontSize: 14,
        textAlign: 'center'
    },
    cameraContainer: {
        flex: 1,
        borderRadius: Layout.radius.lg,
        overflow: "hidden",
        marginBottom: Layout.spacing.lg,
        position: 'relative'
    },
    camera: {
        flex: 1,
    },
    loader: {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: [{ translateX: -18 }, { translateY: -18 }]
    },
    controls: {
        paddingBottom: Layout.spacing.xl,
    }
});
