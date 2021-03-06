import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import { Button } from '../components/Button'

export function Confirmation() {
  const navigation = useNavigation()

  function handleConfirmation() {
    navigation.navigate('PlantSelect')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
          😁
        </Text>

        <Text style={styles.title}>
          Prontinho
        </Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button title="Começar" onPress={handleConfirmation}/>
        </View>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30,
  },
  emoji: {
    fontSize: 96,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 64,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    color: colors.heading,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 60,
    marginTop: 48,
  }
})