import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const [userName, setUserName] = useState<string>()

  useEffect(() => {
    async function getName() {
      const user = await AsyncStorage.getItem('@plantmanager:user')
      setUserName(user || '')
    }

    getName()
  },[])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hello}>{title ? title : 'Olá,'}</Text>
        <Text style={styles.name}>{subtitle ? subtitle : userName}</Text>
      </View>
      <Image source={{uri: 'https://github.com/matheusroika.png'}} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  hello: {
    fontFamily: fonts.complement,
    fontSize: 32,
    color: colors.heading
  },
  name: {
    fontFamily: fonts.heading,
    fontSize: 32,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
})