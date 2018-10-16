import React from 'react'
import { Text, View } from 'react-native'

export default class Deck extends React.Component {
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        <Text>Cards go here...</Text>
      </View>
    )
  }
}
