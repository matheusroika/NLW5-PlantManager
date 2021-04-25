import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Image, Text, Platform, StatusBar } from 'react-native'
import { Header } from '../components/Header'

import waterdropImg from '../assets/waterdrop.png'
import { loadPlants, PlantProps } from '../libs/storage'
import { format, formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FlatList, RectButton } from 'react-native-gesture-handler'
import fonts from '../../styles/fonts'
import colors from '../../styles/colors'
import { SvgFromUri } from 'react-native-svg'

interface ExtendedPlantProps extends PlantProps {
  formattedDateTimeNotification: string;
}

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<ExtendedPlantProps[]>([])
  const [loading, setLoading] = useState(true)
  const [nextWaterTime, setNextWaterTime] = useState<string>()

  useEffect(() => {
    async function loadStorageData() {
      const plantsInStorage = await loadPlants()

      const nextTime = formatDistance(
        new Date(plantsInStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: ptBR }
      )

      setNextWaterTime(`Regue sua ${plantsInStorage[0].name} daqui a ${nextTime}.`)
      setMyPlants(plantsInStorage)
      setLoading(false)
    }

    loadStorageData()
  },[])

  const renderItem = ({ item }) => (
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
  )

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
    color: colors.shape,
    marginTop: 8,
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
})