import React, { useEffect, useState } from 'react'
import { StatusBar, Image, Text, TouchableOpacity, SafeAreaView, StyleSheet, Platform, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'

import fonts from '../../styles/fonts'
import colors from '../../styles/colors'
import wateringImg from '../assets/watering.png'
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function Welcome() {
  const navigation = useNavigation()
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    async function getName() {
      const user = await AsyncStorage.getItem('@plantmanager:user')
      setUserName(user || '')
      if (user) return navigation.navigate('MyPlants')
    }

    getName()
  },[])

  function nextPage() {
    navigation.navigate('UserIdentification')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie{'\n'}
        suas plantas de{'\n'}
        forma fácil
      </Text>
      
      <Image
        source={wateringImg}
        style={styles.image}
        resizeMode='contain'
      />

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={nextPage}>
        <Feather name="chevron-right" style={styles.buttonIcon}/>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 32,
    textAlign: 'center',
    lineHeight: 38,
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 44,
    color: colors.heading,
  },
  image: {
    height: Dimensions.get('window').width * 0.7,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 28,
  }
})