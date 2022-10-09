import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import tw from "tailwind-react-native-classnames";
import { selectOrigin } from '../slices/navSlice';

const data = [
    {
        id: "123",
        tittle: "Pedir veículo",
        image: "https://i.ibb.co/JBsQ3wm/carLogo.png",
        screen: "MapScreen",
    },
    {
        id: "456",
        tittle: "Pedir comida",
        image: "https://i.ibb.co/wLLMzVC/foodLogo.png",
        screen: "EatScreen",
    }
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
        data={data}
        horizontal 
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
                onPress={() => navigation.navigate(item.screen)}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-100 m-2 w-40`}
            >
                <View style={tw`${!origin && 'opacity-20'}`}>
                    <Image 
                        style={{width: 120, height: 120, resizeMode: "contain"}}
                        source={{uri: item.image}} />
                </View>
                <Text style={tw`mt-2 text-lg font-semibold`}>{item.tittle}</Text>
                <Icon 
                style={tw`p-2 rounded-full w-10 mt-4 bg-black ml-20`}
                    name='arrowright'
                    color="white"
                    type='antdesign'
                />
            </TouchableOpacity>
        )}
    />
  );
};

export default NavOptions;