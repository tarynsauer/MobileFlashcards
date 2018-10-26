import React from 'react'
import { Button, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Deck extends React.Component {

  startQuiz() {
    this.props.navigate('StartQuiz', { title: this.props.title })
    clearLocalNotification()
      .then(setLocalNotification)
  }

  render() {
    const { navigate, questions, title } = this.props

    return (
      <View>
        <Text>{title}</Text>
        <Text>{questions.length}</Text>
        <Button title='Add Card' onPress={() => navigate('AddCard', { title: title, questions: questions })} />
        <Button title='Start Quiz' disabled={questions.length === 0} onPress={this.startQuiz.bind(this)} />
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const deck = state[navigation.state.params.title]

  return {
    navigate: navigation.navigate,
    title: deck.title,
    questions: deck.questions,
  }
}

export default connect(mapStateToProps)(withNavigation(Deck))
