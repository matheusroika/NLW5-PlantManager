import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Text, Platform, StatusBar, ListRenderItem, FlatListProps, Alert } from 'react-native'
import { Header } from '../components/Header'

import waterdropImg from '../assets/waterdrop.png'
import { loadPlants, PlantProps, removePlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FlatList, RectButton, Swipeable } from 'react-native-gesture-handler'
import fonts from '../../styles/fonts'
import colors from '../../styles/colors'
import { SvgFromUri } from 'react-native-svg'
import { Loading } from '../components/Loading'
import Animated from 'react-native-reanimated'
import { Feather } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/core'

interface ExtendedPlantProps extends PlantProps {
  formattedDateTimeNotification: string;
}

export function MyPlants() {
  const isFocused = useIsFocused()
  const plantsInStorage = loadPlants()

  const [myPlants, setMyPlants] = useState<ExtendedPlantProps[]>(plantsInStorage)
  const [loading, setLoading] = useState(true)
  const [nextWaterTime, setNextWaterTime] = useState<string>()

  useEffect(() => {
    async function loadStorageData() {
      const plantsInStorage = await loadPlants()
      
      setMyPlants(plantsInStorage)
      setLoading(false)
    }

    loadStorageData()
  },[isFocused])

  useEffect(() => {
    if (myPlants && myPlants.length > 0 && !(myPlants instanceof Promise)) {
      const nextTime = formatDistance(
        new Date(myPlants[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      )

      setNextWaterTime(`Regue sua ${myPlants[0].name} daqui a ${nextTime}.`)
    }
  },[myPlants])

  async function callRemovePlant(id:number) {
    try {
      await removePlant(String(id))
      setMyPlants(oldData => oldData.filter(item => item.id !== id))
    } catch (error) {
      Alert.alert('Não foi possível deletar sua planta. 😢')
    }
  }

  function handleRemove(plant:PlantProps) {
    Alert.alert('Deletar', `Deseja mesmo deletar sua ${plant.name}?`, [
      {
        text: 'Não 😅',
        style: 'cancel'
      },
      {
        text: 'Sim 😥',
        onPress: () => {callRemovePlant(plant.id)}
      }

    ])
  }

  const renderItem = ({ item }:any) => (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View>
            <RectButton style={styles.buttonRemove} onPress={() => {handleRemove(item)}}>
              <Feather name="trash" size={24} color={colors.white} style={styles.buttonRemoveIcon}/>
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.plant}>
        <SvgFromUri uri={item.photo} width={56} height={56}/>
        <Text style={styles.plantName}>{item.name}</Text>
        <View style={styles.waterTimeContainer}>
          <Text style={styles.waterAt}>Regar às</Text>
          <Text style={styles.waterTime}>
            {myPlants.find(plant => String(plant.id) === String(item.id))?.formattedDateTimeNotification}
          </Text>
        </View>
      </RectButton>
    </Swipeable>
  )

  if (loading) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Minhas" subtitle="Plantinhas"/>

      <View style={styles.tipContainer}>
        <Image source={waterdropImg} style={styles.tipImage}/>
        <Text style={styles.tipText}>{nextWaterTime}</Text>
      </View>

      <View style={styles.plantsContainer}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList 
          data={myPlants}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.blue_light,
    padding: 16,
    borderRadius: 20,
    marginTop: 32,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    fontFamily: fonts.text,
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
    color: colors.blue,
    marginLeft: 24,
  },
  plantsContainer: {
    flex: 1,
    marginTop: 40,
    width: '100%',
  },
  plantsTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginBottom: 8,
  },
  plant: {
    height: 80,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.shape,
    marginTop: 8,
    borderRadius: 20,
  },
  plantName: {
    fontFamily: fonts.body,
    fontSize: 18,
    color: colors.body_dark,
    marginLeft: 24,
  },
  waterTimeContainer: {
    marginLeft: 'auto',
  },
  waterAt: {
    fontFamily: fonts.text,
    fontSize: 13,
    color: colors.body_light,
  },
  waterTime: {
    fontFamily: fonts.body,
    fontSize: 13,
    textAlign: 'right',
    color: colors.body_dark,
  },
  buttonRemove: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 100,
    height: 80,
    backgroundColor: colors.red,
    borderRadius: 20,
    marginTop: 8,
    position:'relative',
    right: 36,
    marginRight: -36
  },
  buttonRemoveIcon: {
    marginRight: 24,
  },
})