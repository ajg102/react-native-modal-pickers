import React from "react";
import {
  TouchableWithoutFeedback,
  View,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";

const Overlay = (
  {
    children,
    onBackdropPress = () => {},
    overlayStyle = {},
    isVisible = false,
  },
  rest
) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      onRequestClose={onBackdropPress}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.container} pointerEvents="box-none">
        <View style={[styles.overlay, overlayStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .4)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "white",
    borderRadius: 3,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: "rgba(0, 0, 0, .3)",
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
    }),
  },
});
