import React from 'react'
import { AppLoading} from 'expo'
import { Button, Text, View } from 'react-native'
import { shuffle } from '../utils/helpers'
import { withNavigation } from 'react-navigation'

class EndQuiz extends React.Component {
  render() {
    const { score, title } = this.props.navigation.state.params

    return (
      <View>
        <Text>{title} Quiz results: {score}%</Text>
        <Button title='Restart Quiz' onPress={() => this.props.navigation.navigate('StartQuiz', {title: title})} />
        <Button title='Back to Deck' onPress={() => this.props.navigation.navigate('Deck', {title: title})} />
      </View>
    )
  }
}

export default withNavigation(EndQuiz)
