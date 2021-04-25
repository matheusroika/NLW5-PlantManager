import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import colors from '../../styles/colors'
import { PlantSelect } from '../pages/PlantSelect'
import { MaterialIcons } from '@expo/vector-icons'
import { MyPlants } from '../pages/MyPlants'
import { Platform } from 'react-native'

const tab = createBottomTabNavigator()

const TabRoutes = () => {
  return (
    <tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88,
        }
      }}
    >
      <tab.Screen
        name="Nova planta"
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <tab.Screen
        name="Minhas plantinhas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />

    </tab.Navigator>
  )
}

export default TabRoutes