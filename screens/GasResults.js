import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import moment from 'moment-jalaali';

const GasResults = ({ results }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [logoURL, setLogoURL] = useState('https://s8.uupload.ir/files/logo_z2b9.png'); // Set your logo URL here


  const handleButtonClick = () => {
    const now = moment();
    const formattedTime = now.format('HH:mm:ss');
    const formattedDate = now.format('jYYYY/jMM/jDD');
    setCurrentTime(`تاریخ: ${formattedDate} - ساعت: ${formattedTime}`);
  };


  const generatePDF = async () => {
    try {
      
  
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                padding: 10px;
                margin: 0;
                direction: rtl;
                text-align: right;
              }
              .container {
                padding: 10px;
                background-color: #fff;
              }
              .header {
                padding: 5px;
                margin-bottom: 5px;

              }
              .header-text {
                color: #000;
                font-size: 14px;
                font-weight: bold;
                margin: 0 0 5px 0;

              }
              .table {
                width: 70%;
                margin: auto;
                border: 1px solid #000;
                padding: 5px;
                justify-content: center;
              }
              .text-center {
                text-align: center;
              }
              .section-header {
                font-size: 16px;
                font-weight: bold;
                margin-bottom: 5px;
                color: #ffc107;
                text-align: center;
              }
              .button {
                background-color: #ffc107;
                padding: 5px;
                border-radius: 5px;
                text-align: center;
              }
              .button-text {
                color: #000000;
                font-size: 14px;
              }
              .row {
                display: flex;
                flex-direction: row;
              }
              .cell {
                flex: 1;
                border: 1px solid #000;
                text-align: center;
                padding: 5px;
              }
              .cell-text {
                font-size: 12px;
                margin: 0;
              }
              .totals {
                margin-top: 5px;
              }
              .total-row {
                text-align: right; /* Align text to the right */
              }
                  .header-image {
                width: 200px; /* تنظیم اندازه تصویر */
                margin-bottom: 10px; /* فاصله از پایین */
                text-align: center;
              }
                .headers{
                text-align: center;
                font-weight: bold;


                }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="headers">
 <img src="${logoURL}" class="header-image" alt="Logo"/>

                 </div>
                <p class="header-text">نام جایگاه: ${results.names}</p>
                <p class="header-text">کنترل کننده: ${results.namesboos}</p>
                <p class="header-text">دوره کنترل: از ${results.startDateJS} تا ${results.endDateJS}</p>
                <p class="header-text">تاریخ بازدید: ${results.formattedDateJV}</p>
                <p class="header-text">ساعت: ${results.formattedTimeJV}</p>
              </div>
              <div class="table">
                <p class="section-header">گزارش عملیات نفتگاز</p>
                <p class="cell-text">ابتدای دوره: ${results.allgazs}</p>
                <p class="cell-text">مقدار رسیده: ${results.receivedGazJV}</p>
                ${results.tanksGasG && results.tanksGasG.length > 0 ? results.tanksGasG.map((_, index) => `
                  <div class="row">
                    <p class="cell-text">موجودی مخزن  ${index + 1}: ${results.tanksGasG[index]}</p>
                  </div>
                `).join('') : ''}
                <p class="cell-text">جمع مخازن: ${results.finalGasQuantity}</p>
                <div class="row">
                  <div class="cell"><p class="cell-text">فروش</p></div>
                  <div class="cell"><p class="cell-text">انتها دوره</p></div>
                  <div class="cell"><p class="cell-text">ابتدا دوره</p></div>
                  <div class="cell"><p class="cell-text">نازل</p></div>
                </div>
                ${results.MadkidXG && results.MadkidXG.length > 0 ? results.MadkidXG.map((_, index) => `
                  <div class="row">
                    <div class="cell"><p class="cell-text">${results.MadkidZG[index]}</p></div>
                    <div class="cell"><p class="cell-text">${results.MadkidYG[index]}</p></div>
                    <div class="cell"><p class="cell-text">${results.MadkidXG[index]}</p></div>
                    <div class="cell"><p class="cell-text">${index + 1}</p></div>
                  </div>
                `).join('') : ''}
 <div class="totals">
        <div class="row total-row">
          <div class="cell"><p class="cell-text">کل فروش مکانیکی بنزین:</p></div>
          <div class="cell"><p class="cell-text">${results.totalMechanicalSalesGas}</p></div>
        </div>
        <div class="row total-row">
          <div class="cell"><p class="cell-text">کل فروش الکترونیکی بنزین طبق گزارش سامانه:</p></div>
          <div class="cell"><p class="cell-text">${results.electrogazJV}</p></div>
        </div>
        <div class="row total-row">
          <div class="cell"><p class="cell-text">مقدار سرک / کسری بنزین:</p></div>
          <div class="cell"><p class="cell-text">${results.shortageOrSurplusGas} ${results.vaziatGaz}</p></div>
        </div>
        
        <div class="row total-row">
          <div class="cell"><p class="cell-text">مقدار مغایرت مکانیکی و الکترونیکی بنزین:</p></div>
          <div class="cell"><p class="cell-text">${results.HG}</p></div>
        </div>
      </div>
    </div>
               <div class="text-center " style=" display: flex; justify-content: space-between; width:70% ; padding-right: 110px; padding-top:20px;>
                  <p class="cell-text">امضا:</p>
                  <p class="cell-text">تاریخ گزارش:</p>
              </div>
            </div>
          </body>
        </html>
      `;


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
        <Text style={styles.sectionHeader}>گزارش عملیات نفتگاز</Text>
       <Text style={styles.cellText}>ابتدای دوره : {results.allgazs}</Text>
       <Text style={styles.cellText}>مقدار رسیده : {results.receivedGazJV}</Text>
        {results.tanksGasG && results.tanksGasG.length > 0 && results.tanksGasG.map((_, index) => (
          <View key={`tanksGasG-${index}`}>
            <Text style={styles.cellText}>موجودی مخزن {index + 1} : {results.tanksGasG[index]}</Text>
          </View>
        ))}
      <Text style={[styles.cellText, styles.paddintb]}>جمع مخازن : {results.finalGasQuantity}</Text>

        <View style={styles.row}>
          <View style={styles.cell}><Text style={styles.cellText}>فروش</Text></View>
          <View style={styles.cell}><Text style={styles.cellText}>انتها دوره </Text></View>
          <View style={styles.cell}><Text style={styles.cellText}>ابتدا دوره </Text></View>
          <View style={styles.cell}><Text style={styles.cellText}>نازل </Text></View>
        </View>
        {results.MadkidXG && results.MadkidXG.length > 0 && results.MadkidXG.map((_, index) => (
          <View key={`MadkidXG-${index}`} style={styles.row}>
            <Text style={styles.cell}>{results.MadkidZG[index]}</Text>
            <View style={styles.cell}><Text style={styles.cellText}>{results.MadkidYG[index]}</Text></View>
            <View style={styles.cell}><Text style={styles.cellText}>{results.MadkidXG[index]}</Text></View>
            <View style={styles.cell}><Text style={styles.cellText}>{index + 1}</Text></View>
          </View>
        ))}

        <View style={styles.totals}>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کل فروش مکانیکی نفتگاز: {results.totalMechanicalSalesGas}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>کل فروش الکترونیکی نفتگاز طبق گزارش سامانه: {results.electrogazJV}</Text></View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>مقدار سرک / کسری نفتگاز: {results.shortageOrSurplusGas} {results.vaziatGaz}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.cell}><Text style={styles.cellText}>مقدار مغایرت مکانیکی و الکترونیکی نفتگاز: {results.HG}</Text></View>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={generatePDF}>
          <Text style={styles.buttonText}>ساخت PDF</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    padding: 20,
    color: '#000',
  },
  header: {
    backgroundColor: '#ffc107',
    padding: 10,
    marginBottom: 10,
  },
  headerText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
  },
  paddintt: {
    paddingTop: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffc107',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffc107',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  paddintb: {
    paddingBottom: 10,
  },
  cellText: {
    fontSize: 14,
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
