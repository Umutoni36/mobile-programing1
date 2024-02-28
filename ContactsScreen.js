import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';

const ContactsScreen = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Permissions.askAsync(Permissions.CONTACTS);
            if (status !== 'granted') {
                console.log('Contacts permission denied');
                return;
            }

            const { data } = await Contacts.getContactsAsync({});
            setContacts(data);
        })();
    }, []);

    const handleAddContact = async () => {
        try {
            const contact = {
                [Contacts.Fields.FirstName]: 'John',
                [Contacts.Fields.LastName]: 'Doe',
                [Contacts.Fields.Emails]: [{ label: 'work', email: 'john.doe@example.com' }],
                [Contacts.Fields.PhoneNumbers]: [{ label: 'mobile', number: '1234567890' }],
            };

            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                await Contacts.addContactAsync(contact);
                alert('Contact added successfully!');
            } else {
                alert('Permission to add contacts denied.');
            }
        } catch (error) {
            console.error('Failed to add contact:', error);
            alert('Failed to add contact. Please try again.');
        }
    };

    const renderContactItem = ({ item }) => (
        <View style={styles.contactItem}>
            <Text>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
                <Text>{item.phoneNumbers[0].number}</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderContactItem}
            />
            <Button title="Add Contact" onPress={handleAddContact} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    contactItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default ContactsScreen;
