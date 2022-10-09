import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch } from "react-redux";
import {setDestination, setOrigin} from "../slices/navSlice";
import * as Location from 'expo-location';


const HomeScreen = () => {
    const dispatch = useDispatch();

    let origin = {};

    let addressInfo = {
        street: 'Rua?',
        number: 'Número?',
        district: "Distrito?",
        subregion: "Cidade?",
        region: "Estado?",
        country: "País"
    }

    const [location, setLocation] = useState(null);
    const [description, setDescription] = useState(null);
    const [address, setAddress] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    useEffect(() => {
        (async () => {
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            
            let location = await Location.getCurrentPositionAsync({});
            let { longitude, latitude } = location.coords;
            let address = await Location.reverseGeocodeAsync({latitude, longitude});
            setLocation(location);
            setAddress(address);
            if (address[0].street) addressInfo.street = address[0].street;
            if (address[0].streetNumber) addressInfo.number = address[0].streetNumber;
         if (address[0].district) addressInfo.district = address[0].district;
         if (address[0].subregion) addressInfo.subregion = address[0].subregion;
         if (address[0].region) addressInfo.region = address[0].region;
         if (address[0].country) addressInfo.country = address[0].country;  
         setDescription(`${addressInfo.street}, ${addressInfo.number} - ${addressInfo.district}, ${addressInfo.subregion} - ${addressInfo.region}, ${addressInfo.country}`); 
        })();
    }, []);

    return (
        <SafeAreaView style={[tw`bg-white h-full`]}>
            <View style={tw`p-5`}>
                <Image 
                style={{
                    width: 100, 
                    height: 100,
                    resizeMode: "contain",
                }}
                source={{
                    uri: "https://i.ibb.co/JC1QWB8/guina-Black.png",
                }}
                />

                <GooglePlacesAutocomplete 
                  placeholder="De onde ?"
                  styles={{
                    container: {
                        flex: 0,
                    },
                    textInput: {
                        fontSize: 18,
                    },
                  }}
                  onPress={(data, details = null) => {
                      
                      if (location) {
                          origin.lat = location.coords.latitude;
                          origin.lng = location.coords.longitude;
                          
                    
                        
                    } else {
                        origin = details.geometry.location;
                    }
                    dispatch(
                        setOrigin({
                            location: origin,
                            description: description
                        })
                    );
                    dispatch(setDestination(null))
                  }}
                  fetchDetails={true}
                  enablePoweredByContainer={false}
                  minLength={2}
                  query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: 'pt-BR'
                  }}
                  nearbyPlacesAPI="GooglePlacesSearch"
                  debounce={400}
                />
                <NavOptions />
                <NavFavourites />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    text: {
        color: "blue",
    },
  });