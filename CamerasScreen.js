import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CameraRoll } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';

const CamerasScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const toggleCameraType = () => {
        setCameraType(
            cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };

    const toggleFlashMode = () => {
        setFlashMode(
            flashMode === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : flashMode === Camera.Constants.FlashMode.on
                    ? Camera.Constants.FlashMode.auto
                    : Camera.Constants.FlashMode.off
        );
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            CameraRoll.saveToCameraRoll(photo.uri);
        }
    };

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.camera}
                type={cameraType}
                flashMode={flashMode}
            />
            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlButton} onPress={toggleCameraType}>
                    <AntDesign name="retweet" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.captureButton} onPress={takePicture} />
                <TouchableOpacity style={styles.controlButton} onPress={toggleFlashMode}>
                    <AntDesign name="thunderbolt" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    controlButton: {
        padding: 10,
    },
    captureButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
});

export default CamerasScreen;
