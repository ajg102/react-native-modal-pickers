# react-native-modal-pickers

## About
Small, lightweight React Native picker component which appears as a modal for ios and android.

## Installation
```
npm i react-native-modal-pickers
```

## Basic Usage
```
import React, { useState } from "react";
import { Text, View } from "react-native";
import ModalPicker from "react-native-modal-pickers";

const ITEMS = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Pear", value: "pear" },
  { label: "Orange", value: "orange" },
  { label: "Kiwi", value: "kiwi" },
  { label: "Mango", value: "mango" }
];

export default function App() {
  const [item, setItem] = useState("");

  const itemSelectedHandler = (val) => {
    setItem(val);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{item}</Text>
      <Picker
        pickerItems={ITEMS}
        onValueChanged={itemSelectedHandler}
        selectedItem={item}
        title="Favorite Fruit"
        placeholder="What is your favorite fruit?"
        shouldCloseOnChange={false}
      />
    </View>
  );
}
```
## API

| Prop | Description | Required |
| --- | --- | --- |
| selectedItem | The current selected value of the list used in the component | Yes |
| onValueChange | Change handler, called when user changes the selected value | Yes |
| pickerItems | An array of objects to display as items | Yes |
| valueKey | Specify an object key to use for the picker item's value. Default = "value" | No |
| labelKey | Specify and object key to use for the picker item's label. Default = "label" | No |
| disabled | Boolean to control whether to allow the modal picker to be opened or not | No |
| title | String shown to user in ios header or at the top of android dialog | No |
| placeholder | String shown to user in container when no value has been selected | No |
| containerStyle | Style object to apply to the pressable containing displaying the label of the selected item | No |
| titleStyle | Style object for the title displayed in the ios header or top of android dialog | No |
| selectedItemTextStyle | Style object for the selected value displayed within the container | No |
| itemTextStyle | Style object to apply to list item text | No |
| color | Color to apply to the background of the modal. Default = '#fff' | No |
| selectedItemStyle | Addtional styles to apply to the selected item in the modal list view | No |
| iOSHeaderStyles | Additional styles to apply to ios header | No |
| headerTintColor | Color to apply to ios header title and back button and android dialog title. Will override iOSHeaderStyles and titleStyle | No |
| shouldCloseOnChange | Whether the modal should dismiss when the user selects a new value. Default = false | No |
| checkedColor | Color to apply to android radio button when selected and ios checkmark. Default = 'blue' | No |
| uncheckedColor | Colort to apply to the android radio buttons not selected. Default = '#ddd' | No |
| closeButtonText | Text to display as the ios back button in the header or in the footer of the android dialog | No |
| closeButtonContainerStyle | Style object to apply to the android close button container | No |
| closeButtonTextStyle | Style object to apply to the android close button text | No |
| renderIcon | Function which returns a react component within the pressable container next to the selected item | No |
