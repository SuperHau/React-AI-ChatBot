import { View, Text , Image} from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Features() {
    return (
        <View style={{height: hp(60)}} className = "space-y-4">

            <Text style={{fontSize: wp(6.5)}} className="font-semibold text-gray-700">Features</Text>

            {/* ChatGPT */}
            <View className = "bg-emerald-200 p-4 rounded-xl space-y-1">
                <View>
                    <Image source={require('../../assets/image/chatgpticon.png')}style={{height: hp(4), width: hp(4)}}/>
                    <Text style={{fontSize: wp(4.8)}} className = "font-semibold text-gray-700">Chat GPT</Text>
                </View>
                <Text style={{fontSize: wp(3.8)}} className = "font-medium text-gray-700">
                    ChatGPT là một trợ lý ảo dựa trên trí tuệ nhân tạo của OpenAI, có khả năng hiểu và tạo ra văn bản tự nhiên.
                </Text>
            </View>



        </View>
        
    )
}