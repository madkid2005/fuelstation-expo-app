import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import * as Print from 'expo-print';
import moment from 'moment-jalaali';

const GasResults = ({ results }) => {
  const [currentTime, setCurrentTime] = useState('');

  const handleButtonClick = () => {
    const now = moment();
    const formattedTime = now.format('HH:mm:ss');
    const formattedDate = now.format('jYYYY/jMM/jDD');
    setCurrentTime(`تاریخ: ${formattedDate} - ساعت: ${formattedTime}`);
  };

  const generatePDF = async () => {
    const nozzlesHtml = results.MadkidXG.map((_, index) => `
      <p>نازل ${index + 1}:</p>
      <p>شروع دوره: ${results.MadkidXG[index]}</p>
      <p>پایان دوره: ${results.MadkidYG[index]}</p>
    `).join('');

    const htmlContent = `
      <html>
        <body>
          <h1>گزارش جایگاه گاز</h1>
          <p>نام جایگاه: ${results.names}</p>
          <p>نام کنترل کننده: ${results.namesboos}</p>
          <p>ابتدای دوره گاز: ${results.allgazs}</p>
          <p>دوره رسید: ${results.receivedGazJV}</p>
          <p>کل فروش الکترونیکی گاز طبق سامانه: ${results.electrogazJV}</p>
          <p>جمع مخازن گاز: ${results.finalGasQuantity}</p>
          <p>مقدار فروش مکانیکی هر نازل گاز: ${results.mechanicalSalesPerNozzleGas.join(', ')}</p>
          <p>کل فروش مکانیکی دوره نازل‌های گاز: ${results.totalMechanicalSalesGas}</p>
          <p>کل موجودی گاز: ${results.totalGas}</p>
          <p>کل فراورده گاز خارج شده دوره از جایگاه: ${results.totalProductGasOut}</p>
          <p>بعد از فروش باید موجود باشد - گاز: ${results.afterSalesGas}</p>
          <p>تفاوت موجودی و فروش گاز: ${results.shortageOrSurplusGas > 0 ? `-${results.shortageOrSurplusGas}` : results.shortageOrSurplusGas}</p>
          <p>کسری مجاز گاز: ${results.allowableShortageGas}</p>
          <p>کسری غیرمجاز گاز: ${results.illegalShortageGas}</p>
          ${nozzlesHtml}
        </body>
      </html>
    `;

    try {
      await Print.printAsync({
        html: htmlContent,
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>نام جایگاه : {results.names}</Text>
        <Text style={styles.headerText}>کنترل کننده : {results.namesboos}</Text>
        <Text style={styles.headerText}>دوره کنترل : از {results.startDateJS} تا {results.endDateJS}</Text>
        <Text style={styles.headerText}>تاریخ بازدید : {results.formattedDateJV}</Text>
        <Text style={styles.headerText}>ساعت : {results.formattedTimeJV}</Text>
      </View>

      <View style={styles.table}>
        <Text style={styles.sectionHeader}>گزارش عملیات گاز</Text>
        
          <Text style={styles.cellText}>ابتدای دوره : {results.allgazs}</Text>
       <Text style={styles.cellText}>رسید : {results.receivedGazJV}</Text>
       
       {results.tanksGasG && results.tanksGasG.length > 0 && results.tanksGasG.map((_, index) => (
          <View key={`tanksGasG-${index}`} style={[styles.row, styles.rowReverse]}>
            <Text style={styles.cellText}>مخزن {index + 1}:</Text>
            <Text style={styles.cellText}>{results.tanksGasG[index]}</Text>
          </View>
        ))}
        <Text style={styles.cellText}>جمع مخازن : {results.finalGasQuantity}</Text>

          <View style={styles.row}>
          <View style={styles.cell}><Text style={styles.cellText}>فروش</Text></View>
          <View style={styles.cell}><Text style={styles.cellText}>انتها دوره </Text></View>
    <View style={styles.cell}><Text style={styles.cellText}>ابتدا دوره </Text></View>
    <View style={styles.cell}><Text style={styles.cellText}>نازل </Text></View>
        </View>
{results.MadkidXG && results.MadkidXG.length > 0 && results.MadkidXG.map((_, index) => (
  <View key={`MadkidXG-${index}`} style={styles.row}>
    <Text style={styles.cell}>{results.mechanicalSalesPerNozzleGas}</Text>

    <View style={styles.cell}><Text style={styles.cellText}> {results.MadkidYG[index]}</Text></View>
    <View style={styles.cell}><Text style={styles.cellText}>{results.MadkidXG[index]}</Text></View>
    <View style={styles.cell}><Text style={styles.cellText}>{index + 1}</Text></View>
  </View>
))}


        <View style={styles.totals}>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کل فروش مکانیکی گاز: {results.totalMechanicalSalesGas}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کل فروش الکترونیکی گاز طبق گزارش سامانه: {results.electrogazJV}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>مقدار سرک / کسری گاز: {results.shortageOrSurplusGas}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کسری غیر مجاز گاز: {results.illegalShortageGas}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>مقدار مغایرت مکانیکی و الکترونیکی گاز: {results.mechanicalElectronicDifference}</Text></View>
          </View>
        </View>
      </View>

      
      <Button title="ساخت PDF" onPress={generatePDF} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#1E90FF',
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ff3333',
    textAlign: 'right',
  },
row: {
    flexDirection: 'row',
    writingDirection: 'rtl', // Ensure the row's text direction is right-to-left
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  cellText: {
    fontSize: 14,
    textAlign: 'right',
    writingDirection: 'rtl', // Ensure the cell's text direction is right-to-left
  },
  nozzleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nozzleText: {
    fontSize: 14,
  },
  totals: {
    marginTop: 10,
  },
  totalRow: {
    fontSize: 14,
    marginBottom: 5,
  },
  timeContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  timeText: {
    fontSize: 16,
    textAlign: 'right',
  },
});

export default GasResults;
