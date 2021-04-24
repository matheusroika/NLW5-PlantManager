import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import colors from '../../styles/colors'
import fonts from '../../styles/fonts'

interface RoomSelectButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function RoomSelectButton({ title, active = false, ...rest }:RoomSelectButtonProps) {
  return (
    <RectButton style={[active ? styles.activeButton : styles.nonActiveButton, styles.button]} {...rest}>
      <Text style={[active ? styles.activeText : styles.nonActiveText, styles.text]}>{title}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 76,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginRight: 4,
  },
  text: {
    fontSize: 14,
  },
  nonActiveButton: {
    backgroundColor: colors.shape,
  },
  nonActiveText: {
    fontFamily: fonts.text,
    color: colors.heading
  },
  activeButton: {
    backgroundColor: colors.green_light,
  },
  activeText: {
    fontFamily: fonts.heading,
    color: colors.green_dark
  },
})