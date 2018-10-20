import React from 'react'
import { Button, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'

class Deck extends React.Component {
  render() {
    const navigation = this.props.navigation
    const { questions, title } = navigation.state.params

    return (
      <View>
        <Text>{title}</Text>
        <Text>{questions.length}</Text>
        <Button title='Add Card' onPress={() => navigation.navigate('AddCard')} />
        <Button title='Start a Quiz' onPress={() => navigation.navigate('StartQuiz')} />
      </View>
    )
  }
}

export default withNavigation(Deck)
