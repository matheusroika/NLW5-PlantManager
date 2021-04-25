import AsyncStorage from '@react-native-async-storage/async-storage'
import { format } from 'date-fns'

export interface PlantProps {
  id: number;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [];
    frequency: {
      times: number;
      repeat_every: string;
    },
    dateTimeNotification: Date;
}

interface StoragePlantProps {
  [id: string]: {
    data: PlantProps
  }
}

export async function savePlant(plant: PlantProps) {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    
    const newPlant = {
      [plant.id]: {
        data: plant
      }
    }

    const allPlants = JSON.stringify({...newPlant, ...oldPlants})
    await AsyncStorage.setItem('@plantmanager:plants', allPlants)
  } catch (error) {
    throw new Error(error)
  }
}

export async function loadPlants() {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

    const plantsSorted = Object.keys(plants)
      .map(plant => {
        const currentPlant = plants[plant].data
        return {
          ...currentPlant,
          formattedDateTimeNotification: format(new Date(currentPlant.dateTimeNotification), 'HH:mm')
        }
      })
      .sort((a, b) =>
        Math.round(
          new Date(a.dateTimeNotification).getTime() - new Date(b.dateTimeNotification).getTime()
        )
      )
  
    return plantsSorted

  } catch (error) {
    throw new Error(error)
  }
}