import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, FlatList } from 'react-native';

// تبدیل تاریخ میلادی به شمسی
const toJalali = (gYear, gMonth, gDay) => {
  const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

  let gy = gYear - 1600;
  let gm = gMonth - 1;
  let gd = gDay - 1;

  let g_day_no =
    365 * gy +
    Math.floor((gy + 3) / 4) -
    Math.floor((gy + 99) / 100) +
    Math.floor((gy + 399) / 400);

  for (let i = 0; i < gm; ++i) g_day_no += g_days_in_month[i];

  if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0))
    g_day_no++;

  g_day_no += gd;

  let j_day_no = g_day_no - 79;

  let j_np = Math.floor(j_day_no / 12053);
  j_day_no %= 12053;

  let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
  j_day_no %= 1461;

  if (j_day_no >= 366) {
    jy += Math.floor((j_day_no - 1) / 365);
    j_day_no = (j_day_no - 1) % 365;
  }

  let jm, jd;
  for (jm = 0; jm < 11 && j_day_no >= j_days_in_month[jm]; ++jm)
    j_day_no -= j_days_in_month[jm];

  jm++;
  jd = j_day_no + 1;

  return `${jy}/${jm < 10 ? '0' : ''}${jm}/${jd < 10 ? '0' : ''}${jd}`;
};

// ایجاد یک تقویم ساده جلالی
const generateJalaliCalendar = (year, month) => {
  const daysInMonth = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
  const days = [];
  for (let i = 1; i <= daysInMonth[month - 1]; i++) {
    days.push(i);
  }
  return days;
};

const JalaliCalendar = ({ selectedDate, onDateChange }) => {
  const today = toJalali(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(selectedDate || today);
  const [currentYear, setCurrentYear] = useState(parseInt(today.split('/')[0]));
  const [currentMonth, setCurrentMonth] = useState(parseInt(today.split('/')[1]));

  const days = generateJalaliCalendar(currentYear, currentMonth);

  const onDayPress = (day) => {
    const formattedDate = `${currentYear}/${currentMonth < 10 ? '0' : ''}${currentMonth}/${day < 10 ? '0' : ''}${day}`;
    setSelected(formattedDate);
    onDateChange(formattedDate);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={selected}
          placeholder="انتخاب تاریخ"
          editable={false}
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.calendarContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setCurrentYear(prev => prev - 1)}>
                <Text style={styles.arrow}>{"<<"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                if (currentMonth === 1) {
                  setCurrentMonth(12);
                  setCurrentYear(prev => prev - 1);
                } else {
                  setCurrentMonth(prev => prev - 1);
                }
              }}>
                <Text style={styles.arrow}>{"<"}</Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>{`${currentYear}/${currentMonth < 10 ? '0' : ''}${currentMonth}`}</Text>
              <TouchableOpacity onPress={() => {
                if (currentMonth === 12) {
                  setCurrentMonth(1);
                  setCurrentYear(prev => prev + 1);
                } else {
                  setCurrentMonth(prev => prev + 1);
                }
              }}>
                <Text style={styles.arrow}>{">"}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentYear(prev => prev + 1)}>
                <Text style={styles.arrow}>{">>"}</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={days}
              numColumns={7}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => onDayPress(item)} style={styles.dayContainer}>
                  <Text style={styles.dayText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
          <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>بستن</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 5,
    width: '100%',
    backgroundColor: 'white',
  },
  input: {
    padding: 10,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrow: {
    fontSize: 18,
    padding: 10,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    width: 60, // عرض ثابت بزرگتر برای هر روز
    height: 60, // ارتفاع ثابت بزرگتر برای هر روز
  },
  dayText: {
    fontSize: 15, // اندازه فونت بزرگتر
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default JalaliCalendar;
