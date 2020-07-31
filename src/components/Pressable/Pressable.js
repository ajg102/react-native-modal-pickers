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
  },
  rest
) => {
  return isAndroid ? (
    <TouchableNativeFeedback
      onPress={onPress}
      background={androidBackground}
      {...rest}
    >
      <View style={containerStyle}>{children}</View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress} style={containerStyle} {...rest}>
      {children}
    </TouchableOpacity>
  );
};

export default Pressable;
