import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { createDeck } from '../utils/api'
import { withNavigation } from 'react-navigation'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

class CreateDeck extends React.Component {
  state = {
    title: '',
  }

  handleChange = (value) => {
    this.setState({title: value})
  }

  submitForm = (e) => {
    const { dispatch } = this.props

    createDeck(this.state.title).then(deck =>
      dispatch(addDeck(deck)))
      .then(() => this.props.navigate('Deck', { title: this.state.title, questions: [] }))
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

function mapStateToProps (state, { navigation }) {
  return {
    navigate: navigation.navigate,
  }
}

export default connect(mapStateToProps)(withNavigation(CreateDeck))
