import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {purple} from "../utils/colors";

const TextButton = ({ children, onPress, style={} }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styles.resetBtn, style]}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    resetBtn: {
        textAlign: 'center',
        color: purple
    },
});

export default TextButton;
