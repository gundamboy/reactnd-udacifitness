import React from 'react'
import { View, Text } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from "./components/History";
import {NavigationContainer} from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import AddEntry from "./components/AddEntry";
import EntryDetail from "./components/EntryDetail";
import Live from "./components/Live";
import {Platform} from "react-native-web";
import {purple, white} from "./utils/colors";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { setLocalNotification } from "./utils/helpers";

const Tab = createMaterialTopTabNavigator();

const RouteConfigs = {
    History: {
        name: "History",
        component: History,
        options: {tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />, title: 'History'}
    },
    AddEntry: {
        name: "Add Entry",
        component: AddEntry,
        options: {tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor} />, title: 'Add Entry'}
    },
    Live: {
        name: "Live",
        component: Live,
        options: {tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor}/>, title: 'Live'}
    }
};

const TabNavigatorConfig = {
    navigationOptions: {
        header: null
    },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? purple : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white :purple ,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
};


function Tabs () {
    return (
        <Tab.Navigator {...TabNavigatorConfig}>
            <Tab.Screen {...RouteConfigs['History']} />
            <Tab.Screen {...RouteConfigs['AddEntry']} />
            <Tab.Screen {...RouteConfigs['Live']} />
        </Tab.Navigator>
    )
}

const MainNavigation = createStackNavigator();



export default class App extends React.Component {
    componentDidMount() {
        setLocalNotification();
    }

    render() {
        return (
            <Provider store={createStore(reducer)}>
                <NavigationContainer>
                    <MainNavigation.Navigator initialRouteName="Home">
                        <MainNavigation.Screen name="Home" component={Tabs}/>
                        <MainNavigation.Screen name="EntryDetail" component={EntryDetail}/>
                    </MainNavigation.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}