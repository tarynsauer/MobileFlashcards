import React from 'react'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { createDeck } from '../utils/api'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

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

class CreateDeck extends React.Component {
  state = {
    title: '',
  }

  handleChange = (value) => {
    this.setState({title: value})
  }

  submitForm = (e) => {
    const { dispatch, navigate } = this.props
    const { title } = this.state

    createDeck(title).then(deck =>
      dispatch(addDeck(deck)))
      .then(() => navigate('Deck', { title: title, questions: [] }))
  }

  render() {
    const { container, h1text, form, input } = styles
    const { title } = this.state

    return (
      <View style={container}>
        <Text style={h1text}>Create New Deck</Text>
        <View style={form}>
          <Text>Title:</Text>
          <TextInput style={input} name='title' type='text' value={title} onChangeText={this.handleChange} />
          <Button title='Create Deck' disabled={title.length === 0} onPress={this.submitForm} />
        </View>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  return {
    navigate: navigation.navigate,
  }
}

export default connect(mapStateToProps)(withNavigation(CreateDeck))
