import React, { useState, useMemo, useRef, useEffect } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import Overlay from "../Overlay/Overlay";
import Pressable from "../../Pressable/Pressable";
import Radio from "../Radio/Radio";

const Picker = ({
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
  closeButtonText = "DONE",
  closeButtonContainerStyle = {},
  closeButtonTextStyle = {},
  selectedItemStyle = {},
  checkedColor = "blue",
  uncheckedColor = "#ddd",
  disabled = false,
  headerTintColor,
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
      <Radio
        state={item[valueKey] === selectedItem}
        uncheckedColor={uncheckedColor}
        checkedColor={checkedColor}
      />
    </Pressable>
  );

  return (
    <>
      <Pressable
        onPress={openOverlay}
        containerStyle={[containerStyle]}
        disabled={disabled}
      >
        <Text style={[selectedItemTextStyle]}>
          {selectedLabel ? selectedLabel : placeholder}
        </Text>
      </Pressable>
      <Overlay
        onBackdropPress={closeOverlay}
        isVisible={isOpen}
        overlayStyle={{
          backgroundColor: color,
          width: "85%",
          maxHeight: "90%",
        }}
      >
        <View style={styles.androidHeader}>
          <Text
            style={[
              styles.title,
              titleStyle,
              headerTintColor && { color: headerTintColor },
            ]}
          >
            {title}
          </Text>
        </View>
        <FlatList
          data={pickerItems}
          extraData={labelKey}
          keyExtractor={(item, index) => item[valueKey] + index}
          renderItem={_renderItem}
          initialScrollIndex={selectedIndex}
          getItemLayout={(data, index) => ({
            length: 56,
            offset: 56 * index,
            index,
          })}
        />
        <View style={styles.androidFooter}>
          <Pressable
            onPress={closeOverlay}
            containerStyle={[styles.closeButton, closeButtonContainerStyle]}
          >
            <Text style={[styles.title, closeButtonTextStyle]}>
              {closeButtonText}
            </Text>
          </Pressable>
        </View>
      </Overlay>
    </>
  );
};

const styles = StyleSheet.create({
  androidHeader: {
    width: "100%",
    height: 56,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  androidFooter: {
    width: "100%",
    height: 56,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 12,
  },
  listItem: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  listItemText: {
    fontSize: 16,
    opacity: 0.87,
  },
  selected: {
    fontSize: 17,
    fontWeight: "500",
    opacity: 1,
  },
});

export default Picker;
