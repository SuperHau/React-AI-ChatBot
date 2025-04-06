import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getChatGPTResponse } from '../api';
import Features from '../components/Features';
import { dummyMessages } from '../constants/App';

export default function HomeScreen() {
    const [messages, setMessages] = useState(dummyMessages);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const clear = () => {
        setMessages([]);
    }

    const handleSend = async () => {
        if (result.trim()) {
            const userMessage = {
                role: 'user',
                content: result
            };

            setMessages([...messages, userMessage]);
            setResult('');
            setLoading(true);

            try {
                const response = await getChatGPTResponse([...messages, userMessage]);
                const assistantReply = {
                    role: 'assistant',
                    content: response.choices[0].message.content
                };
                setMessages(prevMessages => [...prevMessages, assistantReply]);
            } catch (error) {
                console.error('Failed to get response from ChatGPT:', error.response ? error.response.data : error.message);
                if (error.response && error.response.data && error.response.data.error) {
                    const errorMessage = error.response.data.error.message;
                    if (error.response.data.error.type === "insufficient_quota") {
                        alert('You have exceeded your quota. Please check your OpenAI account and billing details.');
                    } else {
                        alert(`Failed to get response from ChatGPT: ${errorMessage}`);
                    }
                } else {
                    alert('Failed to get response from ChatGPT. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <View className="flex-1 bg-white">
            <SafeAreaView className="flex-1 flex mx-5">
                <View className="flex-row justify-center">
                    <Image source={require('../../assets/image/icon.png')} style={{ height: hp(15), width: hp(15) }} />
                </View>
                {
                    messages && messages.length > 0 ? (
                        <View className="space-y-2 flex-1">
                            <Text style={{ fontSize: wp(5) }} className="text-gray-700 font-semibold ml-1">
                                Assistant
                            </Text>
                            <View style={{ height: hp(60) }} className="bg-neutral-200 rounded-3xl p-4">
                                <ScrollView bounces={false} className="space-y-4" showsVerticalScrollIndicator={false}>
                                    {
                                        messages.map((message, index) => {
                                            if (message.role === 'assistant') {
                                                if (message.content.includes('https')) {
                                                    return (
                                                        <View key={index} className="flex-row justify-start">
                                                            <View className="p-2 flex rounded-2xl bg-emerald-200 rounded-tl-none">
                                                                <Image source={{ uri: message.content }} className="rounded-2xl" resizeMode='contain' style={{ height: wp(60), width: wp(60) }} />
                                                            </View>
                                                        </View>
                                                    )
                                                } else {
                                                    return (
                                                        <View key={index} style={{ width: wp(70) }} className="bg-emerald-200 rounded-xl p-2 rounded-tl-none">
                                                            <Text>{message.content}</Text>
                                                        </View>
                                                    )
                                                }
                                            } else {
                                                return (
                                                    <View key={index} className="flex-row justify-end">
                                                        <View style={{ width: wp(70) }} className="bg-white rounded-xl p-2 rounded-tr-none">
                                                            <Text>{message.content}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    ) : (
                        <Features />
                    )
                }
                <View className="flex justify-center items-center my-4 px-4">
                    <View className="w-full flex-row items-center bg-white rounded-full shadow-md p-2">
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: 'transparent',
                                borderWidth: 1,
                                borderRadius: 20,
                                paddingHorizontal: 10,
                                flex: 1
                            }}
                            placeholder="Nhập văn bản"
                            onChangeText={text => setResult(text)}
                            value={result}
                            editable={!loading}
                        />
                        <TouchableOpacity onPress={handleSend} className="bg-blue-500 rounded-full p-2 ml-2" disabled={loading}>
                            <Text className="text-white font-semibold">{loading ? 'Đang gửi...' : 'Gửi'}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        messages.length > 0 && (
                            <TouchableOpacity onPress={clear} className="bg-neutral-300 rounded-full p-2 mt-2">
                                <Text className="text-black font-semibold">Trở về</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </SafeAreaView>
        </View>
    );
}