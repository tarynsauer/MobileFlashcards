import React from 'react'
import { AppLoading} from 'expo'
import { Button, StyleSheet, Text, View } from 'react-native'
import { shuffle } from '../utils/helpers'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  h1text: {
    marginBottom: 25,
    fontSize: 36,
    fontWeight: 'bold',
  },
  question: {
    marginBottom: 10,
    fontSize: 24,
    color: 'teal',
  },
  answer: {
    marginBottom: 25,
    fontSize: 20,
    color: 'teal',
  },
  answerContainer: {
    marginBottom: 25,
    marginTop: 25,
  },
  count: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 15,
    color: 'gray',
    fontWeight: 'bold',
  },
})

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
    this.setState({
      correctCount: 0,
      incorrectCount: 0,
      unansweredQuestions: shuffle(this.props.questions),
      answeredQuestions: [],
      showAnswer: false,
    })
  }

  render() {
    const { correctCount, incorrectCount, unansweredQuestions, answeredQuestions } = this.state
    const { container, h1text, question, count, answerContainer, answer } = styles

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
          <View style={container}>
            <Text style={h1text}>{this.props.title}</Text>
            <Text style={question}>{currentQuestion.question}</Text>
            <Text style={count}>{unansweredQuestions.length} / {unansweredQuestions.length + answeredQuestions.length}</Text>
            {this.state.showAnswer &&
                <View style={answerContainer}>
                  <Text style={answer}>{currentQuestion.answer}</Text>
                  <Button color='green' title='Correct' onPress={()=> this.advanceDeck(currentQuestion, 'correctCount')} />
                  <Button color='red' title='Incorrect' onPress={()=> this.advanceDeck(currentQuestion, 'incorrectCount')} />
                </View>}
            {!this.state.showAnswer && <Button title='Show Answer' onPress={()=> this.setState({showAnswer: true})} />}
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
