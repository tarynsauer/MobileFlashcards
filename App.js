import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import AddCard from './components/AddCard'
import StartQuiz from './components/StartQuiz'
import DecksList from './components/DecksList'
import CreateDeck from './components/CreateDeck'
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
  AddCard: { screen: AddCard},
})

export default class App extends React.Component {
  render() {
    return (
      <MainNavigator />
    )
  }
}

