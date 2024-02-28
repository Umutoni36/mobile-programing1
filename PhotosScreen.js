import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const PhotosScreen = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Permission to access media library required!');
                }
            }

            const { assets } = await MediaLibrary.getAssetsAsync();
            setPhotos(assets);
        })();
    }, []);

    const renderPhotoItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log(item)}>
            <Image source={{ uri: item.uri }} style={styles.photoItem} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={(item) => item.id}
                renderItem={renderPhotoItem}
                numColumns={3}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    photoItem: {
        width: 100,
        height: 100,
        margin: 5,
    },
});

export default PhotosScreen;
