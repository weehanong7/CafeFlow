import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { addMenuItem } from '../../../store/menuSlice';

const AddMenuItemScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (name && price) {
      dispatch(addMenuItem({
        id: Date.now().toString(),
        name,
        price: parseFloat(price),
        category,
        description,
      }));
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="decimal-pad"
      />
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Beverage" value="beverage" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description (optional)"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  orderItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTime: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  paymentStatus: {
    fontSize: 14,
    textTransform: 'uppercase',
  },
  buttonGroup: {
    marginBottom: 20,
  },
  salesContainer: {
    padding: 20,
    alignItems: 'center',
  },
  salesLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  salesAmount: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddMenuItemScreen;
