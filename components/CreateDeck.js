import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { createDeck } from '../utils/api'
import { withNavigation } from 'react-navigation'

class CreateDeck extends React.Component {
  state = {
    title: '',
  }

  handleChange = (value) => {
    this.setState({title: value})
  }

  submitForm = (e) => {
    createDeck(this.state.title).then(data =>
      this.props.navigation.navigate('Deck', { title: this.state.title, questions: [] })
    )
  }

  render() {
    return (
      <View>
        <Text>Create Deck</Text>
        <TextInput name='title' type='text' value={this.state.title} onChangeText={this.handleChange} />
        <Button title='Create' disabled={this.state.title.length === 0} onPress={this.submitForm} />
      </View>
    )
  }
}

export default withNavigation(CreateDeck)
