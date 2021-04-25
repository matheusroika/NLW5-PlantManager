import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import colors from '../../styles/colors'
import fonts from '../../styles/fonts'
import api from '../services/api'

import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { PlantCard } from '../components/PlantCard'
import { RoomSelectButton } from '../components/RoomSelectButton'
import { PlantProps } from '../libs/storage'


interface RoomProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const navigation = useNavigation()

  const [rooms, setRooms] = useState<RoomProps[]>([])
  const [plants, setPlants] = useState<PlantProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
  const [loadingRooms, setLoadingRooms] = useState(true)
  const [loadingPlants, setLoadingPlants] = useState(true)
  const [roomSelected, setRoomSelected] = useState('all')

  function handleRoomSelection(room: string) {
    setRoomSelected(room)
    if(room === 'all') return setFilteredPlants(plants)
    
    const filtered = plants.filter(plant => plant.environments.includes(room))
    setFilteredPlants(filtered)
  }

  function handlePlantSelection(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant })
  }

  useEffect(() => {
    async function fetchRooms() {
      const { data } = await api.get('plants_environments', {
        params: {
          _sort: 'title',
          _order: 'asc'
        }
      })
      setRooms([
        {key: 'all', title: 'Todos'},
        ...data,
      ])
      setLoadingRooms(false)
    }

    async function fetchPlants() {
      const { data } = await api.get('plants', {
        params: {
          _sort: 'name',
          _order: 'asc'
        }
      })
      setPlants(data)
      setFilteredPlants(data)
      setLoadingPlants(false)
    }

    fetchPlants()
    fetchRooms()
  },[])

  if (loadingRooms || loadingPlants) return <Loading />
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Header />
          <Text style={styles.title}>Em qual ambiente</Text>
          <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
        </View>
        
        <View style={styles.buttonsContainer}>
          <FlatList
            data={rooms}
            keyExtractor={item => String(item.key)}
            renderItem={({ item }) => (
              <RoomSelectButton
                title={item.title}
                active={item.key === roomSelected}
                onPress={() => handleRoomSelection(item.key)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.buttons}
          />
        </View>
        
        <View style={styles.plantsContainer}>
          <FlatList
            data={filteredPlants}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <PlantCard data={item} onPress={() => handlePlantSelection(item)}/>
            )}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            contentContainerStyle={styles.plants}
          />
        </View>    
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 32,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.heading,
    marginTop: 20,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    color: colors.heading,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 112,
  },
  buttonsContainer: {
    marginTop: 24,
  },
  buttons: {
    marginLeft: 32,
    paddingRight: 64,
  },
  plantsContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 24,
  },
  plants: {
    marginTop: 20,
  },
})