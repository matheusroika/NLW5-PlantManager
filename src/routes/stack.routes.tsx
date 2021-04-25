import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../../styles/colors'

import { Welcome } from '../pages/Welcome'
import { UserIdentification } from '../pages/UserIdentification'
import { Confirmation } from '../pages/Confirmation'
import { PlantSave } from '../pages/PlantSave'
import { PlantsConfirmation } from '../pages/PlantsConfirmation'
import TabRoutes from './tab.routes'

const stack = createStackNavigator()

const StackRoutes: React.FC = () => (
  <stack.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      }
    }}
  >
    <stack.Screen
      name='Welcome'
      component={Welcome}
    />

    <stack.Screen
      name='UserIdentification'
      component={UserIdentification}
    />

    <stack.Screen
      name='Confirmation'
      component={Confirmation}
    />

    <stack.Screen
      name='PlantSelect'
      component={TabRoutes}
    />

    <stack.Screen
      name='PlantSave'
      component={PlantSave}
    />

    <stack.Screen
      name='PlantsConfirmation'
      component={PlantsConfirmation}
    />

    <stack.Screen
      name='MyPlants'
      component={TabRoutes}
    />

  </stack.Navigator>
)

export default StackRoutes