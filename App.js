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
import DeckDetails from './components/DeckDetails'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Tabs = createBottomTabNavigator({
  Home: { screen: DecksList},
  'Create Deck': { screen: CreateDeck},
})

const MainNavigator = createStackNavigator({
  Home: { screen: Tabs},
  Deck: { screen: Deck},
  DeckDetails: { screen: DeckDetails},
  StartQuiz: { screen: StartQuiz},
  EndQuiz: { screen: EndQuiz},
  AddCard: { screen: AddCard},
})

export default class App extends React.Component {
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
