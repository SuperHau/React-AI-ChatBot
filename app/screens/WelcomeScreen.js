import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useNavigation } from 'expo-router';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <GestureHandlerRootView>
        <SafeAreaView className = "flex-1 flex justify-around bg-white">
            <View className="space-y-2">
                <Text style={{fontSize: wp(10)}} className = "text-center font-blod text-gray-700">
                    CHATGPT CLONE
                </Text>
                <Text style={{fontSize: wp(5)}} className="text-center font-semibold text-gray-800 tracking-wider">
                    Design by Giang,Hậu
                </Text>
            </View>
            <View className = "flex-row justify-center">
                <Image source={require('../../assets/image/icon.png')} style={{width: wp(75), height: wp(75)}}/>
            </View>
            <TouchableOpacity onPress={()=> navigation.navigate('Home')} className="bg-emerald-600 mx-5 p-4 rounded-2xl">
                <Text style={{fontSize: wp(6)}} className = "text-center font-bold text-white text-2xl">Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
        </GestureHandlerRootView>
    )
}