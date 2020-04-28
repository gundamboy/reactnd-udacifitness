import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { getMetricMetaInfo,  timeToString } from "../utils/helpers";
import UdaciSlider from './UdaciSlider';
import UdaciStepper from "./UdaciStepper";
import DateHeader from "./DateHeader";
import { Ionicons } from '@expo/vector-icons';
import TextButton from "./TextButton";

function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}

export default class AddEntry extends Component {
    // metrics we are tracking
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0,
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] + step

            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {

        this.setState((state) => {
            const count = state[metric] - getMetricMetaInfo(metric).step

            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState((state) => ({
            ...state,
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        //update state
        this.setState(() => ({
                run: 0,
                bike: 0,
                swim: 0,
                sleep: 0,
                eat: 0,
        }))

        // Update Redux


        // Update DB


        // Clear local notification

    }

    reset = () => {
        const key = timeToString();


        // Update Redux


        // Route to home


        // Update DB
    }

    render() {
        const metaInfo = getMetricMetaInfo();

        if( this.props.alreadyLogged ) {
            return (
                <View>
                    <Ionicons
                    name='ios-happy-outline'
                    size={100}
                    />
                    <Text>You have already logged your information for today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest } = metaInfo[key];
                    const value = this.state[key];

                    return (
                        <View key={key}>
                            {getIcon()}
                            {type === 'slider'
                                ? <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                : <UdaciStepper
                                    value={value}
                                    onIncrement={(value) => this.increment(key)}
                                    onDecrement={(value) => this.decrement(key)}
                                    {...rest}
                                />
                            }
                        </View>
                    )
                })}

                <SubmitBtn onPress={this.submit} />
            </View>
        );
    }
}
