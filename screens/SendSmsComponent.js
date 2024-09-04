import React from 'react';
import { View, Button, Alert } from 'react-native';

const SendSmsComponent = () => {
  const API_URL = 'http://api.iransmsservice.com/v2/sms/send/simple'; 

  const sendSimpleSms = async () => {
    const apikey = '4nH28xq0uiwHbzLrSOxewVxuFOkfmwT1SvLEbkIl7HA'; 
    const message = '123456';
    const sender = '3000260026'; 
    const receptor = '+989056860284'; 

    try {
      const headers = {
        'Content-Type': 'applicatddddddion/json',
        'apikey': apikey,
      };

      const body = {
        message: message,
        sender: sender,
        receptor: receptor,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        Alert.alert('Error', `Failed to send OTP. Server responded with status ${response.status}`);
        return;
      }

      // Try to parse the JSON response
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        const rawText = await response.text(); // Get the raw text if JSON parsing fails
        console.error('Failed to parse JSON:', rawText);
        Alert.alert('Error', 'Failed to parse server response.');
        return;
      }

      // Handle the parsed JSON data
      if (data && data.result === 'success') {
        Alert.alert('Success', 'OTP sent successfully!');
        console.log('OTP sent successfully:', data);
      } else {
        Alert.alert('Error', `Failed to send OTP: ${data.result || 'Unknown error'}`);
        console.log('Failed to send OTP:', data);
      }
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      Alert.alert('Error', 'An error occurred while sending OTP');
    }
  };

  return (
    <View>
      <Button title="Send SMS" onPress={sendSimpleSms} />
    </View>
  );
};

export default SendSmsComponent;
