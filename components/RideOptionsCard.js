import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'
import 'intl';
import "intl/locale-data/jsonp/en";

const data = [
  {
    id: "Uber-X-123",
    tittle: "Guina X",
    multiplier: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Uber-XL-456",
    tittle: "Guina XL",
    multiplier: 1.4,
    image: "https://links.papareact.com/5w8"
  },
  {
    id: "Uber-Lux-789",
    tittle: "Guina Lux",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf"
  },
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity 
          onPress={() => navigation.navigate("NavigateCard")}
          style={[tw`absolute top-3 left-5 z-50 p-3 rounded-full`]}
        >
          <Icon name="chevron-left" type="fontawesome"/>
        </TouchableOpacity>
      </View>
        <Text 
          style={tw`text-center py-5 text-xl`}>Tamanho de viagem: {travelTimeInformation?.distance?.text}
        </Text>

        <FlatList 
          style={{height: 100}}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item : { id, tittle, multiplier, image }, item}) => (
            <TouchableOpacity 
                onPress={() => setSelected(item)}
               style={tw`flex-row items-center justify-between px-7 ${id === selected?.id && 'bg-gray-200'}`}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: "contain"
                }}
                source={{uri: image}}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{tittle}</Text>
                <Text>{travelTimeInformation ? travelTimeInformation.duration?.text : 'Tempo'}</Text>
              </View>
              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat("pt-BR", {
                  style: 'currency',
                  currency: 'BRL',
                }).format(
                  (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * multiplier) / 60
                )}
              </Text>
            </TouchableOpacity>
          )}
        />

        <View style={[tw`mt-auto border-t border-gray-200`]}>
          <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
            <Text style={tw`text-center text-white text-xl`}>Chamar {selected?.tittle}</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})