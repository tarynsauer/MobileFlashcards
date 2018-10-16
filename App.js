import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import DecksList from './components/DecksList'
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
})

const MainNavigator = createStackNavigator({
  Home: { screen: Tabs},
  Deck: { screen: Deck},
  DeckDetails: { screen: DeckDetails},
})

export default class App extends React.Component {
  render() {
    return (
      <MainNavigator />
    )
  }
}

