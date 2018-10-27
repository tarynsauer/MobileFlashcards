import React from 'react'
import { AppLoading} from 'expo'
import { Button, StyleSheet, Text, View } from 'react-native'
import { shuffle } from '../utils/helpers'
import { withNavigation } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1text: {
    fontSize: 36,
    fontWeight: 'bold',
  },
   h2text: {
    marginTop: 10,
    fontSize: 28,
    color: 'teal',
    fontWeight: 'bold',
  },

  buttonContainer: {
    marginTop: 35,
    marginBottom: 35,
  },
})

class EndQuiz extends React.Component {
  componentDidLoad() {
    clearLocalNotification().then(setLocalNotification)
  }

  render() {
    const { score, title } = this.props.navigation.state.params
    const { container, h1text, h2text, buttonContainer } = styles

    return (
      <View style={container}>
        <Text style={h1text}>{title} quiz results:</Text>
        <Text style={h2text}>{score}% correct</Text>
        <View style={buttonContainer}>
          <Button title='Restart Quiz' onPress={() => this.props.navigation.navigate('StartQuiz', {title: title})} />
          <Button title='Back to Deck' onPress={() => this.props.navigation.navigate('Deck', {title: title})} />
        </View>
      </View>
    )
  }
}

export default withNavigation(EndQuiz)
