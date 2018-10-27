import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import AddCard from './AddCard'
import CreateDeck from './CreateDeck'
import Deck from './Deck'
import DecksList from './DecksList'
import EndQuiz from './EndQuiz'
import StartQuiz from './StartQuiz'

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

export default MainNavigator
