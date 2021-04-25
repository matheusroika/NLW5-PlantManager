import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

import { Button } from '../components/Button'

export function UserIdentification() {
  const navigation = useNavigation()
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [name, setName] = useState<string>()

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputBlur() {
    setIsFocused(false)
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value)
    setName(value)
  }

  async function handleSubmit() {
    if(!name) return Alert.alert('Precisamos saber como te chamar 😅')

    try {
      await AsyncStorage.setItem('@plantmanager:user', name)
      navigation.navigate('Confirmation')
    } catch {
      Alert.alert('Não foi possível salvar o seu nome 😢')
    } 
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.form} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.emoji}>
            { isFilled ? '😄' : '😀' }
          </Text>
          <Text style={styles.title}>
            Como podemos{'\n'}
            chamar você?
          </Text>

          <TextInput
            style={[styles.input, (isFocused || isFilled) && { borderColor: colors.green }]}
            placeholder="Digite um nome"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onChangeText={handleInputChange}
          />

          <View style={styles.footer}>
            <Button title="Confirmar" onPress={handleSubmit} />
          </View> 
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  form: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 44,
  },
  emoji: {
    fontSize: 36,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 24,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 24,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: '100%',
    fontSize: 18,
    marginTop: 48,
    padding: 10,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    width: '100%',
    paddingHorizontal: 20,
  }
})