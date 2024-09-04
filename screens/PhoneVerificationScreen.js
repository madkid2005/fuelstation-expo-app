import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

const PhoneVerificationScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const sendSms = async () => {
    try {
      const response = await axios.post(
        'http://api.iransmsservice.com/v2/sms/send/simple',
        {
          phoneNumber: phoneNumber,
          message: 'Your verification code is: 1234',
        },
        {
          headers: {
            Authorization: 'LT6+BLE1Vu5oLpwlvJBrLBCvkgTpCvKrfvxNgf53I8s', // در صورت نیاز به Bearer
          },
        }
      );

      if (response.data.success) {
        console.log('SMS sent successfully');
        navigation.navigate('CodeVerification', { phoneNumber });
      } else {
        console.error('Error sending SMS:', response.data.error);
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  return (
    <View>
      <Text>Enter your phone number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="Phone Number"
      />
      <Button title="Send Code" onPress={sendSms} />
    </View>
  );
};

export default PhoneVerificationScreen;
