import React from 'react'
import { AppLoading} from 'expo'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { fetchDeckResults } from '../utils/api'
import { receiveDecks } from '../actions'
import DeckDetails from './DeckDetails'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1text: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 25,
  },
})

class DecksList extends React.Component {
  state = {
    ready: false,
  }

  componentDidMount () {
    const { dispatch } = this.props

    fetchDeckResults().then(decks =>
      dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  render() {
    if (this.state.ready === false) {
      return <AppLoading />
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.h1text}>
            Flashcard Decks
          </Text>
          <FlatList
            data={Object.values(this.props.decks)}
            renderItem={({item}) => <DeckDetails key={item.title} title={item.title} questions={item.questions} />}
          />
        </View>
      )
    }
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(DecksList)
