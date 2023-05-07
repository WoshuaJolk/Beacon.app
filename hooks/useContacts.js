import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import { extractLast10Digits } from '../helperFunctions';
import useRegisteredPhoneNumbers from './useRegisteredPhoneNumbers';
import { useNavigation } from '@react-navigation/native'

const useContacts = (shouldFetchContacts) => {
  const [contacts, setContacts] = useState([]);
  const registeredUsersPhoneNumbers = useRegisteredPhoneNumbers();
  const navigation = useNavigation()

  useEffect(() => {
    if (!shouldFetchContacts) {
      return; // Do nothing if shouldFetchContacts is false
    }

    const fetchContacts = async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.ImageAvailable,
            Contacts.Fields.Image,
          ],
        });

        // Separate arrays for registered and non-registered contacts
        const registeredContacts = [];
        const nonRegisteredContacts = [];

        // Process the contacts data
        data.forEach((contact) => {
          const phoneNumber = contact.phoneNumbers?.[0]?.number || '';
          const last10Digits = extractLast10Digits(phoneNumber);
          const isRegistered = registeredUsersPhoneNumbers.has(last10Digits);
          const processedContact = {
            id: contact.id,
            name: contact.name,
            imageAvailable: contact.imageAvailable,
            image: contact.image,
            phoneNumber: last10Digits,
            isRegistered,
          };
          if (isRegistered) {
            registeredContacts.push(processedContact);
          } else {
            nonRegisteredContacts.push(processedContact);
          }
        });

        // Concatenate the two arrays with registered contacts first
        setContacts([...registeredContacts, ...nonRegisteredContacts]);
      }
      else {
        navigation.navigate('Map')
      }
    };

    fetchContacts();
  }, [registeredUsersPhoneNumbers, shouldFetchContacts, navigation]);

  return contacts;
};

export default useContacts;
