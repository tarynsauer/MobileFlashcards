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
    const { dispatch } = this.props

    createDeck(this.state.title).then(deck =>
      dispatch(addDeck(deck)))
      .then(() => this.props.navigate('Deck', { title: this.state.title, questions: [] }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.h1text}>Create New Deck</Text>
        <View style={styles.form}>
          <Text>Title:</Text>
          <TextInput style={styles.input} name='title' type='text' value={this.state.title} onChangeText={this.handleChange} />
          <Button title='Create Deck' disabled={this.state.title.length === 0} onPress={this.submitForm} />
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
