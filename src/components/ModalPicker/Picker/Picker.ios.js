import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import Pressable from "../../Pressable/Pressable";
import { getStatusBarHeight } from "../../../helpers/getStatusBarHeight";
import Checkmark from "../../../assets/checkmark.png";

const SCREEN = Dimensions.get("screen");

const Picker = ({
  renderIcon = () => null,
  onValueChanged = () => {},
  overlayStyle = {},
  containerStyle = {},
  titleStyle = {},
  selectedItem = "",
  selectedItemTextStyle = {},
  itemTextStyle = {},
  pickerItems = [],
  valueKey = "value",
  labelKey = "label",
  title = "Select Item",
  color = "#fff",
  placeholder = "Click here",
  shouldCloseOnChange = false,
  closeButtonText = "Back",
  closeButtonContainerStyle = {},
  closeButtonTextStyle = {},
  selectedItemStyle = {},
  iOSHeaderStyles = {},
  checkedColor = "blue",
  uncheckedColor = "#ddd",
  headerTintColor,
  disabled = false,
}) => {
  const [isOpen, setOpen] = useState(false);

  const selectedIndex = pickerItems.findIndex(
    (item) => item[valueKey] === selectedItem
  );

  const openOverlay = () => setOpen(true);

  const closeOverlay = () => setOpen(false);

  const onChangeHandler = (val) => {
    onValueChanged(val);
    if (shouldCloseOnChange) {
      closeOverlay();
    }
  };

  const selectedLabel = useMemo(() => {
    const sel = pickerItems.find((item) => item[valueKey] === selectedItem);
    if (sel) {
      return sel[labelKey] ? sel[labelKey] : null;
    } else return null;
  }, [pickerItems, labelKey, valueKey, selectedItem]);

  const _renderItem = ({ item }) => (
    <Pressable
      onPress={() => onChangeHandler(item[valueKey])}
      containerStyle={styles.listItem}
    >
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          styles.listItemText,
          itemTextStyle,
          item[valueKey] === selectedItem && {
            ...styles.selected,
            color: checkedColor,
            ...selectedItemStyle,
          },
        ]}
      >
        {item[labelKey]}
      </Text>
      {item[valueKey] === selectedItem && (
        <Image
          source={Checkmark}
          fadeDuration={0}
          style={[styles.checkmark, { tintColor: checkedColor }]}
        />
      )}
    </Pressable>
  );

  return (
    <>
      <Pressable
        onPress={openOverlay}
        containerStyle={[containerStyle]}
        disabled={disabled}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[selectedItemTextStyle]}
        >
          {selectedLabel ? selectedLabel : placeholder}
        </Text>
        {renderIcon()}
      </Pressable>
      <Modal
        visible={isOpen}
        animationType="slide"
        onRequestClose={closeOverlay}
      >
        <View
          style={[
            styles.header,
            { height: getDefaultHeaderHeight(SCREEN, getStatusBarHeight()) },
            iOSHeaderStyles,
          ]}
        >
          <Pressable
            onPress={closeOverlay}
            containerStyle={styles.backContainer}
          >
            <Image
              source={require("../../../assets/backIcon/back-icon.png")}
              fadeDuration={0}
              style={[
                styles.icon,
                title.length < 30 && styles.iconWithLabel,
                headerTintColor && { tintColor: headerTintColor },
              ]}
            />
            <Text
              style={[
                styles.label,
                titleStyle,
                headerTintColor && { color: headerTintColor },
              ]}
            >
              {closeButtonText}
            </Text>
          </Pressable>
          <Text
            style={[
              styles.headerText,
              titleStyle,
              headerTintColor && { color: headerTintColor },
            ]}
          >
            {title}
          </Text>
        </View>
        <FlatList
          style={{ flex: 1, backgroundColor: color }}
          data={pickerItems}
          extraData={labelKey}
          keyExtractor={(item, index) => item[valueKey] + index}
          renderItem={_renderItem}
          initialScrollIndex={selectedIndex}
          initialNumToRender={20}
          getItemLayout={(data, index) => ({
            length: 56,
            offset: 56 * index,
            index,
          })}
          ListFooterComponent={() => <View style={{ height: 60 }} />}
        />
      </Modal>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "blue",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingBottom: 12,
  },
  headerText: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },
  backContainer: {
    alignItems: "center",
    flexDirection: "row",
    position: "absolute",
    left: 0,
    ...Platform.select({
      ios: null,
      default: {
        marginVertical: 3,
        marginHorizontal: 11,
      },
    }),
  },
  icon: Platform.select({
    ios: {
      height: 21,
      width: 13,
      tintColor: "white",
      marginLeft: 8,
      //marginRight: 22,
      marginVertical: 12,
      resizeMode: "contain",
      //transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    default: {
      height: 24,
      width: 24,
      margin: 3,
      resizeMode: "contain",
      //transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  }),
  iconWithLabel:
    Platform.OS === "ios"
      ? {
          marginRight: 6,
        }
      : {},
  label: {
    fontSize: 17,
    // Title and back label are a bit different width due to title being bold
    // Adjusting the letterSpacing makes them coincide better
    letterSpacing: 0.35,
    color: "white",
  },
  listItem: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderBottomWidth: 0.25,
  },
  listItemText: {
    fontSize: 16,
    opacity: 0.87,
    maxWidth: Dimensions.get("screen").width - 50,
  },
  selected: {
    fontSize: 17,
    fontWeight: "500",
    opacity: 1,
  },
  checkmark: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    margin: 3,
  },
});

export const getDefaultHeaderHeight = (layout, statusBarHeight) => {
  const isLandscape = layout.width > layout.height;

  let headerHeight;

  if (Platform.OS === "ios") {
    if (isLandscape && !Platform.isPad) {
      headerHeight = 32;
    } else {
      headerHeight = 44;
    }
  } else if (Platform.OS === "android") {
    headerHeight = 56;
  } else {
    headerHeight = 64;
  }

  return headerHeight + statusBarHeight;
};
