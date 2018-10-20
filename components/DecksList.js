import React from 'react'
import { AppLoading} from 'expo'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { fetchDeckResults } from '../utils/api'
import DeckDetails from './DeckDetails'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
})

export default class DecksList extends React.Component {
  state = {
    data: {},
    ready: false,
  }

  componentDidMount () {
    fetchDeckResults().then(data =>
      this.setState(
        {
          data: data,
          ready: true,
        })
    )
  }

  render() {
    const { data, ready } = this.state

    if (ready === false) {
      return <AppLoading />
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.h2text}>
            Flashcard Decks
          </Text>
          <FlatList
            data={Object.values(data)}
            renderItem={({item}) => <DeckDetails key={item.title} title={item.title} questions={item.questions} />}
          />
        </View>
      )
    }
  }
}
