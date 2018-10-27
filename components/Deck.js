import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  h1text: {
    marginBottom: 25,
    fontSize: 36,
    fontWeight: 'bold',
  },
   h2text: {
    marginBottom: 10,
    fontSize: 28,
    color: 'teal',
    fontWeight: 'bold',
  },
})

class Deck extends React.Component {
  startQuiz() {
    this.props.navigate('StartQuiz', { title: this.props.title })
  }

  render() {
    const { navigate, questions, title } = this.props
    const cardCount = questions.length
    const { container, h1text, h2text, buttonContainer } = styles

    return (
      <View style={container}>
        <Text style={h1text}>{title}</Text>
        <Text style={h2text}>{cardCount} {cardCount === 1 ? 'card' : 'cards'}</Text>
        <View style={buttonContainer}>
          <Button title='Add Card' onPress={() => navigate('AddCard', { title: title, questions: questions })} />
          <Button title='Start Quiz' disabled={questions.length === 0} onPress={this.startQuiz.bind(this)} />
        </View>
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
