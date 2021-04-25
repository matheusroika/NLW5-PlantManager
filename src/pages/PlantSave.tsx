import { useNavigation, useRoute } from '@react-navigation/core'
import React, { useState } from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native'
import { SvgFromUri } from 'react-native-svg'
import DateTimePicker, { Event } from '@react-native-community/datetimepicker'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import waterdropImg from '../assets/waterdrop.png'

import { Button } from '../components/Button'
import { format, isBefore } from 'date-fns'
import { PlantProps, savePlant } from '../libs/storage'

interface Params {
  plant: PlantProps
}

export function PlantSave() {
  const navigation = useNavigation()
  const route = useRoute()
  const { plant } = route.params as Params

  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios')

  function handleDateTimeChange(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState)
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date())
      return Alert.alert('Escolha uma hora no futuro! ⏰')
    }

    if(dateTime) {
      setSelectedDateTime(dateTime)
    }
  }

  function openDateTimePickerForAndroid() {
    setShowDatePicker(oldState => !oldState)
  }

  async function handleSave() {
    try {
      await savePlant({...plant, dateTimeNotification: selectedDateTime})
      navigation.navigate('PlantsConfirmation')
    } catch {
      Alert.alert('Não foi possível salvar sua planta 😢')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <SvgFromUri
        uri={plant.photo}
        height={176}
        width={176}
        style={styles.plantImage}
      />

      <Text style={styles.plantName}>{plant.name}</Text>
      <Text style={styles.plantAbout}>{plant.about}</Text>

      <View>
        <View style={styles.tipContainer}>
          <Image source={waterdropImg} style={styles.tipImage}/>
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.controllerLabel}>Escolha o melhor horário para ser lembrado:</Text>

        {showDatePicker && (
        <DateTimePicker
          style={styles.dateTimePicker}
          value={selectedDateTime}
          mode="time"
          display="spinner"
          onChange={handleDateTimeChange}
        />
        )}

        {Platform.OS === 'android' && (
          <TouchableOpacity style={styles.changeTimeButton} onPress={openDateTimePickerForAndroid}>
            <Text style={styles.changeTimeText}>{format(selectedDateTime, 'HH:mm')}</Text>
          </TouchableOpacity>
        )}

        <Button title="Cadastrar planta" onPress={handleSave}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.shape,
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  plantImage: {
    marginTop: 50,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 32,
  },
  plantAbout: {
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 16,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.blue_light,
    padding: 16,
    borderRadius: 20,
    marginTop: 32,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    fontFamily: fonts.text,
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    color: colors.blue,
    marginLeft: 24,
  },
  controllerLabel: {
    fontFamily: fonts.text,
    fontSize: 14,
    textAlign: 'center',
    color: colors.body_dark,
    marginTop: 32,
  },
  dateTimePicker: {
    marginTop: 16,
    marginBottom: 32,
  },
  changeTimeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 24,
  },
  changeTimeText: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
  }
})