import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { addCard } from '../utils/api'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { updateDeck } from '../actions'

class AddCard extends React.Component {
  state = {
    question: '',
    answer: '',
  }

  submitForm = (e) => {
    const { dispatch, title, navigation } = this.props
    const { answer, question }  = this.state

    addCard(title, question, answer).then(deck =>
      dispatch(updateDeck(deck)))
        .then(() => navigation.goBack())
  }

  render() {
    const { answer, question }  = this.state

    return (
      <View>
        <Text>Add Card Form</Text>
        <TextInput name='question' type='text' value={question} onChangeText={(text) => this.setState({question: text})} />
        <TextInput name='answer' type='text' value={answer} onChangeText={(text) => this.setState({answer: text})} />
        <Button title='Add Card' disabled={(question.length === 0 || answer.length === 0)} onPress={this.submitForm} />
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  return {
    navigation: navigation,
    title: navigation.state.params.title,
  }
}

export default connect(mapStateToProps)(withNavigation(AddCard))
