import React from 'react'
import { View, Text } from 'react-native'
import { SearchBar } from 'react-native-elements';

export default function Search() {
    return (
        <View>
            <SearchBar
                round
                placeholder="Search your favorite Crypto"
                containerStyle={{ backgroundColor: '#16171a', }}
                underlineColorAndroid={'transparent'}
            />
        </View>
    )
}

