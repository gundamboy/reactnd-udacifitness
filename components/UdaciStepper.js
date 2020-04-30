import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {purple, white, gray} from "../utils/colors";

const UdaciStepper = ({ max, unit, step, value, onIncrement, onDecrement }) => {
    return (
        <View style={[styles.row,  {justifyContent: 'space-between'}]}>
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    style={Platform.OS === 'ios' ? [styles.iosBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0}] : styles.androidBtn}
                    onPress={onDecrement}>
                    {Platform.OS === 'ios' ?
                        <Entypo name={'minus'} size={30}  color={Platform.OS === 'ios' ? purple : white} />
                        :
                        <FontAwesome name={'minus'} size={30}  color={Platform.OS === 'ios' ? purple : white} />
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={Platform.OS === 'ios' ?  [styles.iosBtn, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0}] : styles.androidBtn}
                    onPress={onIncrement}>
                    {Platform.OS === 'ios' ?
                        <Entypo name={'plus'} size={30}  color={Platform.OS === 'ios' ? purple : white} />
                        :
                        <FontAwesome name={'plus'} size={30}  color={Platform.OS === 'ios' ? purple : white} />
                    }
                </TouchableOpacity>
            </View>

            <View style={styles.metricCounter}>
                <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
                <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    iosBtn: {
        backgroundColor: white,
        borderColor: purple,
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        paddingLeft: 25,
        paddingRight: 25
    },
    androidBtn: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2
    },
    metricCounter: {
        width: 85,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

export default UdaciStepper;
