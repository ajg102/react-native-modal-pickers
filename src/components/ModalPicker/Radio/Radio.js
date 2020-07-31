import React, { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

const BORDER_WIDTH = 2;

const Radio = ({
  checkedColor = "blue",
  uncheckedColor = "#ddd",
  state = false,
}) => {
  const prevState = useRef(state);
  const borderAnimRef = useRef(new Animated.Value(BORDER_WIDTH));
  const scaleRef = useRef(new Animated.Value(1));
  const radioColor = state ? checkedColor : uncheckedColor;
  useEffect(() => {
    if ((state = prevState.current)) return;
    else if (state) {
      scaleRef.current.setValue(1.2);
      prevState.current = state;
      Animated.timing(scaleRef.current, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      borderAnimRef.current.setValue(10);
      prevState.current = state;
      Animated.timing(borderAnimRef.current, {
        toValue: BORDER_WIDTH,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  }, [state]);

  return (
    <Animated.View
      style={[
        styles.radio,
        {
          borderColor: radioColor,
          borderWidth: borderAnimRef.current,
        },
      ]}
    >
      {state ? (
        <View style={[StyleSheet.absoluteFill, styles.radioContainer]}>
          <Animated.View
            style={[
              styles.dot,
              {
                backgroundColor: radioColor,
                transform: [{ scale: scaleRef.current }],
              },
            ]}
          />
        </View>
      ) : null}
    </Animated.View>
  );
};

export default Radio;

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
  },
  radioContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 8,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
  },
});
