import React from 'react'
import { Button, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'

class DeckDetails extends React.Component {
  render() {
    console.log(this.props)
    const { questions, navigation, title } = this.props

    return (<View>
      <Text>{title}</Text>
      <Text>Cards: {questions.length}</Text>
      <Button title={title} onPress={() => navigation.navigate('Deck')} />
    </View>
    )
  }
}

export default withNavigation(DeckDetails)
