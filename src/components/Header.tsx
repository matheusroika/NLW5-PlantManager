import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.hello}>Olá,</Text>
        <Text style={styles.name}>Matheus</Text>
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
    paddingHorizontal: 32,
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