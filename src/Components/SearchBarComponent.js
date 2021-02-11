import React, { useState } from 'react'
import { View } from 'react-native';

import { SearchBar } from 'react-native-elements';

export default function SearchBarComponent() {

    const [searchBarText, setsearchBarText] = useState('');

    return (
        <View>
            <SearchBar
                lightTheme={true}
                placeholder='Search'
                onChangeText={(e) => setsearchBarText(e)}
                value={searchBarText}
            />
        </View>
    )
}
