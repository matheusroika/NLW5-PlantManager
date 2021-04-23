import React, { useState } from 'react'
import { StatusBar, Image, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform } from 'react-native'
import colors from '../../styles/colors'

import wateringImg from '../assets/watering.png'
import { Button } from '../components/Button'

export function Welcome() {
  const [isVisible, setIsVisible] = useState(true)
 
  function toggleVisibility() {
    setIsVisible(!isVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}
        suas plantas {'\n'}
        de forma fácil
      </Text>
      
      { isVisible && <Image source={wateringImg} style={styles.image}/> }

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <Button title='>' onPress={toggleVisibility} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  image: {
    width: 292,
    height: 284,
  },
})