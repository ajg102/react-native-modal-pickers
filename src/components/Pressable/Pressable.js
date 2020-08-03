import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Platform,
} from "react-native";

const isAndroid = Platform.OS === "android";

const Pressable = (
  {
    children,
    onPress = () => {},
    containerStyle = {},
    androidBackground = TouchableNativeFeedback.Ripple("#ccc", false),
    disabled = false,
  },
  rest
) => {
  return isAndroid ? (
    <TouchableNativeFeedback
      onPress={onPress}
      background={androidBackground}
      disabled={disabled}
      {...rest}
    >
      <View style={containerStyle}>{children}</View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
      disabled={disabled}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Pressable;
