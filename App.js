import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Button, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import AddCard from './components/AddCard'
import StartQuiz from './components/StartQuiz'
import DecksList from './components/DecksList'
import CreateDeck from './components/CreateDeck'
import EndQuiz from './components/EndQuiz'
import Deck from './components/Deck'
import { setLocalNotification } from './utils/helpers'

const Tabs = createBottomTabNavigator({
  Home: {
    screen: DecksList,
  },
  'Create Deck': {
    screen: CreateDeck,
  },
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: () => ({
      title: 'Flashcard Decks',
    }),
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title} Deck`,
    }),
  },
  StartQuiz: {
    screen: StartQuiz,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title} Quiz`,
    }),
  },
  EndQuiz: {
    screen: EndQuiz,
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.title} Score`,
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: () => ({
      title: 'Add Card',
    }),
  },
})

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
