import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { SvgFromUri } from 'react-native-svg'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
  }
}

export function PlantCard({ data, ...rest }:PlantProps) {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} style={styles.image} width={70} height={70} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 16,
    margin: 8,
  },
  image: {
    marginTop: 8,
  },
  text: {
    fontFamily: fonts.heading,
    fontSize: 16,
    color: colors.heading,
    marginTop: 12,
    marginBottom: 8,
  },
})