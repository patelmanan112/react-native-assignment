import React, { useRef, useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
} from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";


export default function CameraScreen() {

    const cameraRef = useRef(null);

    const [permission, requestPermission] = useCameraPermissions();

    const [image, setImage] = useState(null);
    const [captureTime, setCaptureTime] = useState("");
    const [loading, setLoading] = useState(false);


    if (!permission) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }


    if (!permission.granted) {
        return (
            <View style={styles.center}>
                <Text style={styles.permissionText}>
                    Camera Permission Required
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={requestPermission}
                >
                    <Text style={styles.buttonText}>
                        Allow Camera
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }


    const takePhoto = async () => {
        try {

            if (!cameraRef.current)
                return;

            setLoading(true);

            const photo = await cameraRef.current.takePictureAsync({
                quality: 1,
            });

            setImage(photo.uri);

            setCaptureTime(
                new Date().toLocaleString()
            );

        } catch (error) {

            Alert.alert(
                "Error",
                "Unable to capture image"
            );

        } finally {

            setLoading(false);

        }
    };


    const pickImage = async () => {

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
        });


        if (!result.canceled) {

            setImage(
                result.assets[0].uri
            );

            setCaptureTime(
                new Date().toLocaleString()
            );
        }
    };


    const submitImage = () => {

        if (!image) {

            Alert.alert(
                "Error",
                "Please select image"
            );

            return;
        }


        Alert.alert(
            "Success",
            "Attendance Submitted Successfully"
        );
    };


    const resetImage = () => {

        setImage(null);
        setCaptureTime("");

    };

    const deletePhoto = () => {

        Alert.alert(
            "Delete Photo",
            "Are you sure you want to delete this photo?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setImage(null);
                        setCaptureTime("");
                    }
                }
            ]
        );

    };


    if (image) {

        return (
            <ScrollView
                contentContainerStyle={styles.container}
            >

                <Text style={styles.heading}>
                    Preview Image
                </Text>

                <Image
                    source={{
                        uri: image
                    }}
                    style={styles.image}
                />

                <Text style={styles.time}>
                    Capture Time:
                </Text>

                <Text>
                    {captureTime}
                </Text>


                <TouchableOpacity
                    style={styles.button}
                    onPress={submitImage}
                >
                    <Text style={styles.buttonText}>
                        Submit Image
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.button}
                    onPress={resetImage}
                >
                    <Text style={styles.buttonText}>
                        Retake / Select Another
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={deletePhoto}
                >
                    <Text style={styles.buttonText}>
                        Delete Photo
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.heading}>
                Camera Module
            </Text>


            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing="back"
            />


            {
                loading &&
                <ActivityIndicator
                    size="large"
                    style={styles.loader}
                />
            }


            <TouchableOpacity
                style={styles.button}
                onPress={takePhoto}
            >
                <Text style={styles.buttonText}>
                    Capture Photo
                </Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
                onPress={pickImage}
            >
                <Text style={styles.buttonText}>
                    Pick From Gallery
                </Text>
            </TouchableOpacity>

        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: "#F5F7FA",
        alignItems: "center",
        padding: 20,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    heading: {
        fontSize: 26,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 20,
    },

    camera: {
        width: "100%",
        height: 350,
        borderRadius: 20,
        overflow: "hidden",
    },

    image: {
        width: "90%",
        height: 350,
        borderRadius: 20,
    },

    time: {
        marginTop: 15,
        fontWeight: "bold",
    },

    button: {
        width: "90%",
        backgroundColor: "#5aceca",
        padding: 15,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 15,
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

    loader: {
        position: "absolute",
        top: 250,
    },

    permissionText: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: "bold",
    }

});