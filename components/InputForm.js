import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import moment from 'moment-jalaali';
import JalaliCalendar from './JalaliCalendar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons

const InputForm = ({ onCalculate }) => {
  const [fuelname, setFuelName] = useState('');
  const [startDate, setStartDate] = useState(null);
  
  const [endDate, setEndDate] = useState(null);
  
  const [boosname, setBoosName] = useState('');
  const [electrofuel, setElectroFuel] = useState('');
  const [electrogaz, setElectroGaz] = useState('');
  const [allfuel, setAllFuel] = useState('');
  const [allgaz, setAllGaz] = useState('');
  const [receivedFuel, setReceivedFuel] = useState('');
  const [receivedGas, setReceivedGas] = useState('');
  const [nozzlesFuel, setNozzlesFuel] = useState([]);
  const [nozzlesGas, setNozzlesGas] = useState([]);
  const [tanksFuel, setTanksFuel] = useState([]);
  const [tanksGas, setTanksGas] = useState([]);
  const [numNozzlesFuel, setNumNozzlesFuel] = useState('');
  const [numNozzlesGas, setNumNozzlesGas] = useState('');
  const [numTanksFuel, setNumTanksFuel] = useState('');
  const [numTanksGas, setNumTanksGas] = useState('');
  const [fuelType, setFuelType] = useState(null);
  const [step, setStep] = useState(0); // Ensure step starts at 0 or a valid index

  const { theme } = useContext(ThemeContext);

  const initializeNozzles = (num, setNozzles) => {
    const count = parseInt(num, 10);
    if (!isNaN(count)) {
      const newNozzles = Array(count).fill({ startPeriod: '', endPeriod: '', result: '' });
      setNozzles(newNozzles);
    }
  };

  const initializeTanks = (num, setTanks) => {
    const count = parseInt(num, 10);
    if (!isNaN(count)) {
      const newTanks = Array(count).fill({ endQuantity: '' });
      setTanks(newTanks);
    }
  };

  const updateNozzleFuel = (index, field, value) => {
    const newNozzlesFuel = [...nozzlesFuel];
    newNozzlesFuel[index] = { ...newNozzlesFuel[index], [field]: value };
    if (field === 'startPeriod' || field === 'endPeriod') {
      const start = parseFloat(newNozzlesFuel[index].startPeriod) || 0;
      const end = parseFloat(newNozzlesFuel[index].endPeriod) || 0;
      newNozzlesFuel[index].result = (end - start).toString();
    }
    setNozzlesFuel(newNozzlesFuel);
  };

  const updateNozzleGas = (index, field, value) => {
    const newNozzlesGas = [...nozzlesGas];
    newNozzlesGas[index] = { ...newNozzlesGas[index], [field]: value };
    if (field === 'startPeriod' || field === 'endPeriod') {
      const start = parseFloat(newNozzlesGas[index].startPeriod) || 0;
      const end = parseFloat(newNozzlesGas[index].endPeriod) || 0;
      newNozzlesGas[index].result = (end - start).toString();
    }
    setNozzlesGas(newNozzlesGas);
  };

  const updateTankFuel = (index, value) => {
    const newTanksFuel = [...tanksFuel];
    newTanksFuel[index] = { ...newTanksFuel[index], endQuantity: value };
    setTanksFuel(newTanksFuel);
  };

  const updateTankGas = (index, value) => {
    const newTanksGas = [...tanksGas];
    newTanksGas[index] = { ...newTanksGas[index], endQuantity: value };
    setTanksGas(newTanksGas);
  };

  const steps = [
   
    [
      {
        label: 'نام جایگاه',
        value: fuelname,
        onChangeText: setFuelName,
        keyboardType: 'default',
      },
      {
        label: 'نام کنترل کننده',
        value: boosname,
        onChangeText: setBoosName,
        keyboardType: 'default',
      },
    ],
    [
      {
        label: 'لطفا یکی از موارد زیر انتخاب کنید',
        component: (
           <View style={styles.buttonGroup}>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: fuelType === 'Gasoline' ? '#ff3333' : color="#007BFF" } // Set Gasoline button color
        ]}
        onPress={() => setFuelType('Gasoline')}
      >
        <MaterialCommunityIcons name="fuel" size={20} color="#fff" />
        <Text style={styles.buttonText}>بنزین</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: fuelType === 'Gas' ? 'yellow' : color="#007BFF" } // Set Gas button color
        ]}
        onPress={() => setFuelType('Gas')}
      >
        <MaterialCommunityIcons name="gas-cylinder" size={20} color="#fff" />
        <Text style={[styles.buttonText, { color: '#fff' }]}>گاز</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: fuelType === 'Both' ? '#ff9900' : color="#007BFF" } // Set Both button color
        ]}
        onPress={() => setFuelType('Both')}
      >
        <MaterialCommunityIcons name="fuel" size={20} color="#fff" />
        <MaterialCommunityIcons name="gas-cylinder" size={20} color="#fff" />
        <Text style={styles.buttonText}>هردو</Text>
      </TouchableOpacity>
    </View>
        ),
      },
    ],
    [
      {
        label: 'تاریخ شروع',
        value: startDate,
        component: (
          <JalaliCalendar selectedDate={startDate} onDateChange={setStartDate} />
        ),
      },
      {
        label: 'تاریخ پایان',
        value: endDate,
        component: (
          <JalaliCalendar selectedDate={endDate} onDateChange={setEndDate} />
        ),
      },
    ],
    [
      {
        label: 'تعداد مخازن بنزین',
        value: numTanksFuel,
        onChangeText: text => {
          setNumTanksFuel(text);
          initializeTanks(text, setTanksFuel);
        },
        keyboardType: 'numeric',
        condition: fuelType !== 'Gas', // Show if not Gas
      },
      {
        label: 'تعداد مخازن گاز',
        value: numTanksGas,
        onChangeText: text => {
          setNumTanksGas(text);
          initializeTanks(text, setTanksGas);
        },
        keyboardType: 'numeric',
        condition: fuelType !== 'Gasoline', // Show if not Gasoline
      },
    ],
    
    [
      {
        label: 'تعداد نازل‌های بنزین',
        value: numNozzlesFuel,
        onChangeText: text => {
          setNumNozzlesFuel(text);
          initializeNozzles(text, setNozzlesFuel);
        },
        keyboardType: 'numeric',
        condition: fuelType !== 'Gas', // Show if not Gas
      },
      {
        label: 'تعداد نازل‌های گاز',
        value: numNozzlesGas,
        onChangeText: text => {
          setNumNozzlesGas(text);
          initializeNozzles(text, setNozzlesGas);
        },
        keyboardType: 'numeric',
        condition: fuelType !== 'Gasoline', // Show if not Gasoline
      },
    ],
    [
      {
        label: 'مقدار ابتدای دوره بنزین',
        value: allfuel,
        onChangeText: setAllFuel,
        keyboardType: 'numeric',
        condition: fuelType !== 'Gas', // Show if not Gas
      },
      {
        label: 'مقدار ابتدای دوره گاز',
        value: allgaz,
        onChangeText: setAllGaz,
        keyboardType: 'numeric',
        condition: fuelType !== 'Gasoline', // Show if not Gasoline
      },
    ],
    [
      {
        label: 'مقدار رسیده دوره بنزین',
        value: receivedFuel,
        onChangeText: setReceivedFuel,
        keyboardType: 'numeric',
        condition: fuelType !== 'Gas', // Show if not Gas
      },
      {
        label: 'مقدار رسیده دوره گاز',
        value: receivedGas,
        onChangeText: setReceivedGas,
        keyboardType: 'numeric',
        condition: fuelType !== 'Gasoline', // Show if not Gasoline
      },
    ],
    [
      ...tanksFuel.map((tank, index) => ({
        label: `مقدار ( مخزن بنزین ) شماره ${index + 1}`,
        component: (
          <View key={index}>
            <TextInput
              style={styles.input}
              value={tank.endQuantity}
              placeholder=""
              onChangeText={value => updateTankFuel(index, value)}
              keyboardType="numeric"
            />
          </View>
        ),
        condition: fuelType !== 'Gas', // Show if not Gas
      })),
      ...tanksGas.map((tank, index) => ({
        label: `مقدار ( مخزن گاز ) شماره ${index + 1}`,
        component: (
          <View key={index}>
            <TextInput
              style={styles.input}
              value={tank.endQuantity}
              placeholder=""
              onChangeText={value => updateTankGas(index, value)}
              keyboardType="numeric"
            />
          </View>
        ),
        condition: fuelType !== 'Gasoline', // Show if not Gasoline
      })),
    ],
    
    [
      ...nozzlesFuel.map((nozzle, index) => ({
        label: `مقدار ( نازل بنزین ) شماره ${index + 1}`,
        component: (
          <View key={index} style={styles.nozzleContainer}>
            <TextInput
              style={styles.input}
              value={nozzle.startPeriod}
              placeholder="توتالایزر ابتدا"

              onChangeText={value => updateNozzleFuel(index, 'startPeriod', value)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={nozzle.endPeriod}
              placeholder="توتالایزر انتها"
              
              onChangeText={value => updateNozzleFuel(index, 'endPeriod', value)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={nozzle.result}
              placeholder="نتیجه"
              editable={false}
            />
          </View>
        ),
        condition: fuelType !== 'Gas', // Show if not Gas
      })),
      ...nozzlesGas.map((nozzle, index) => ({
        label: `مقدار ( نازل گاز ) شماره  ${index + 1}`,
        component: (
          <View key={index} style={styles.nozzleContainer}>
            <TextInput
              style={styles.input}
              value={nozzle.startPeriod}
              placeholder="توتالایزر ابتدا"
              onChangeText={value => updateNozzleGas(index, 'startPeriod', value)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={nozzle.endPeriod}
              placeholder="توتالایزر انتها"
              onChangeText={value => updateNozzleGas(index, 'endPeriod', value)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={nozzle.result}
              placeholder="نتیجه"

              editable={false}
            />
          </View>
        ),
        condition: fuelType !== 'Gasoline', // Show if not Gasoline
      })),
    ],
   
    [
      {
        label: 'کل فروش الکترونیکی بنزین طبق سامانه',
        value: electrofuel,
        onChangeText: setElectroFuel,
        keyboardType: 'numeric',
        condition: fuelType !== 'Gas', // Show if not Gas
      },
      {
        label: 'کل فروش الکترونیکی گاز طبق سامانه',
        value: electrogaz,
        onChangeText: setElectroGaz,
        keyboardType: 'numeric',
        condition: fuelType !== 'Gasoline', // Show if not Gasoline
      },
    ],
    
   
    
  ];

  const currentStepFields = steps[step];

  const renderStepFields = () => {
    return currentStepFields
      .filter(field => field.condition === undefined || field.condition)
      .map((field, index) => (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.label}>{field.label}</Text>
          {field.component ? (
            field.component
          ) : (
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChangeText}
              keyboardType={field.keyboardType}
              editable={!field.disabled}
            />
          )}
        </View>
      ));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    const now = moment();
    const formattedTime = now.format('HH:mm:ss');
    const formattedDate = now.format('jYYYY/jMM/jDD');
    // Calculation logic here
    const formData = {
      formattedDate,
      formattedTime,
      fuelname,
      boosname,
      electrofuel,
      electrogaz,
      allfuel,
      allgaz,
      receivedFuel,
      receivedGas,
      startDate,
      endDate,
      nozzlesFuel,
      nozzlesGas,
      tanksFuel,
      tanksGas,
    };
    onCalculate(formData);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderStepFields()}
        <View style={styles.buttonGroup}>
          {step > 0 && (
            <TouchableOpacity style={[styles.button, styles.prevButton]} onPress={handlePrev}>
              <Text style={styles.buttonText}>قبلی</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNext}>
            <Text style={styles.buttonText}>{step === steps.length - 1 ? 'ثبت' : 'بعدی'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 13,
    fontSize: 16,
    marginBottom: 10, 
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nozzleContainer: {
    marginBottom: 20, // Adjust the value to increase or decrease the space
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  prevButton: {
    backgroundColor: 'red',
  },
  nextButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  
});

export default InputForm;