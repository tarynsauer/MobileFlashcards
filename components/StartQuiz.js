import React from 'react'
import { AppLoading} from 'expo'
import { Button, Text, View } from 'react-native'
import { shuffle } from '../utils/helpers'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

class StartQuiz extends React.Component {
  state = {
    correctCount: 0,
    incorrectCount: 0,
    unansweredQuestions: [],
    answeredQuestions: [],
    showAnswer: false,
  }

  componentDidMount () {
    this.setState({
      unansweredQuestions: shuffle(this.props.questions),
    })
  }

  advanceDeck (currentQuestion, countKey) {
    this.setState((prevState, props) => ({
      [countKey]: prevState[countKey] + 1,
      unansweredQuestions: [...prevState.unansweredQuestions.slice(0,0), ...prevState.unansweredQuestions.slice(1)],
      answeredQuestions: [...prevState.answeredQuestions, currentQuestion],
      showAnswer: false,
    }))
  }

  resetQuiz () {
    this.setState((prevState, props) => ({
      correctCount: 0,
      incorrectCount: 0,
      unansweredQuestions: shuffle(this.props.questions),
      answeredQuestions: [],
      showAnswer: false,
    }))
  }

  render() {
    const { correctCount, incorrectCount, unansweredQuestions, answeredQuestions } = this.state

    if (unansweredQuestions.length === 0 && answeredQuestions.length === 0) {
      return <AppLoading />
    } else {
      const currentQuestion = unansweredQuestions[0]
      const title = this.props.title

      if (unansweredQuestions.length === 0) {
        this.resetQuiz()
        const score = Math.round(correctCount/(correctCount + incorrectCount) * 100)

        return (
          this.props.navigate('EndQuiz', {title: title, score: score})
        )
      } else {
        return (
          <View>
            <Text>Questions remaining: {unansweredQuestions.length}</Text>
            <Text>Question: {currentQuestion.question}</Text>
            {this.state.showAnswer && <Text>Answer: {currentQuestion.answer}</Text>}
            <Button title='Show Answer' onPress={()=> this.setState({showAnswer: true})} />
            <Button title='Correct' onPress={()=> this.advanceDeck(currentQuestion, 'correctCount')} />
            <Button title='Incorrect' onPress={()=> this.advanceDeck(currentQuestion, 'incorrectCount')} />
          </View>
        )
      }
    }
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

export default connect(mapStateToProps)(withNavigation(StartQuiz))
