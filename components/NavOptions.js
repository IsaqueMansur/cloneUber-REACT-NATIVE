import React from 'react';
import {Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import tw from "tailwind-react-native-classnames";

const data = [
    {
        id: "123",
        tittle: "Get a ride",
        image: "https://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "456",
        tittle: "Order food",
        image: "https://links.papareact.com/28w",
        screen: "EatScreen",
    }
];

const NavOptions = () => {
  return (
    <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <TouchableOpacity
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-100 m-2 w-40`}
            >
                <View>
                    <Image 
                      style={{width: 120, height: 120, resizeMode: "contain"}}
                    
                      source={{uri: item.image}} />
                </View>
                <Text style={tw`mt-2 text-lg font-semibold`}>{item.tittle}</Text>
            </TouchableOpacity>
        )}
    />
  );
};

export default NavOptions;