import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SearchBar } from 'react-native-elements';

export default function Search() {

    const [search, setSearch] = useState("");

    return (
        <View>
            <SearchBar
                round
                value={search}
                placeholder="Search your favorite Crypto"
                containerStyle={{ backgroundColor: '#16171a', }}
                underlineColorAndroid={'transparent'}
                onChangeText={(e) => {setSearch(e)
                    console.log(e)}}
            />
        </View>
    )
}

