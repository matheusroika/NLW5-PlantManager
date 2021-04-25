import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
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

export interface StoragePlantProps {
  [id: string]: {
    data: PlantProps;
    notificationId: string;
  }
}

export async function savePlant(plant: PlantProps) {
  try {
    const nextTime = new Date(plant.dateTimeNotification)
    const now = new Date()

    const { times, repeat_every } = plant.frequency
    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times)
      nextTime.setDate(now.getDate() + interval)
    } else {
      nextTime.setDate(now.getDate() + 1)
    }

    const seconds = Math.abs(
      Math.round((now.getTime() - nextTime.getTime()) / 1000)
    )

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey! 🌱',
        body: `Está na hora de cuidar da sua ${plant.name} ⏰`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true,
      }
    })

    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const oldPlants = data ? (JSON.parse(data) as StoragePlantProps) : {}
    
    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
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

export async function removePlant(id:string) {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants')
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {}

    await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId)
    delete plants[id]

    await AsyncStorage.setItem('@plantmanager:plants', JSON.stringify(plants))
  }

  catch (error) {
    throw new Error(error)
  }
}