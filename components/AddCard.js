import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { addCard } from '../utils/api'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { updateDeck } from '../actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  input: {
    width: 300,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  form: {
    marginTop: 35,
    marginBottom: 35,
  },
})

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
      <View style={styles.container}>
        <Text style={styles.h1text}>{this.props.title}</Text>
        <Text style={styles.h2text}>Add new card</Text>
        <View style={styles.form}>
          <Text>Question:</Text>
          <TextInput style={styles.input} name='question' type='text' value={question} onChangeText={(text) => this.setState({question: text})} />
          <Text>Answer:</Text>
          <TextInput style={styles.input} name='answer' type='text' value={answer} onChangeText={(text) => this.setState({answer: text})} />
        </View>
        <Button style={styles.button} title='Add Card' disabled={(question.length === 0 || answer.length === 0)} onPress={this.submitForm} />
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
