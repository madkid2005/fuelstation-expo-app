import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const CodeVerificationScreen = ({ route }) => {
  const { phoneNumber } = route.params;
  const [code, setCode] = useState('');

  const verifyCode = () => {
    // اینجا می‌توانید کد تایید را بررسی کنید
    if (code === '1234') { // فقط یک مثال
      Alert.alert('موفقیت', 'کد تایید درست است');
    } else {
      Alert.alert('خطا', 'کد تایید اشتباه است');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>کد تایید را وارد کنید:</Text>
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="کد تایید"
        keyboardType="number-pad"
        style={{ borderWidth: 1, marginBottom: 12, padding: 8 }}
      />
      <Button title="تایید کد" onPress={verifyCode} />
    </View>
  );
};

export default CodeVerificationScreen;
