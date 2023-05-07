import { useEffect, useState } from 'react'
import firebase from '../database/firebase'

const useRegisteredPhoneNumbers = () => {
  const [registeredUsersPhoneNumbers, setRegisteredUsersPhoneNumbers] = useState(new Set())

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      const usersRef = firebase.firestore().collection('users')
      const snapshot = await usersRef.get()
      const registeredPhoneNumbers = new Set()
      snapshot.forEach((doc) => {
        const phoneNumber = doc.data().phoneNumber
        registeredPhoneNumbers.add(phoneNumber)
      })
      setRegisteredUsersPhoneNumbers(registeredPhoneNumbers)
    }
    fetchRegisteredUsers()
  }, [])

  return registeredUsersPhoneNumbers
}

export default useRegisteredPhoneNumbers