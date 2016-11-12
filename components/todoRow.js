import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';

export default class TodoRow extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    const todo = this.props.todo;
    const toggleStyle = [styles.toggle];
    if (todo.completed) { toggleStyle.push(styles.toggleOn) };
    return (
            <View
              style={styles.row}
            >
              <TouchableHighlight onPress={() => {this.props.toggleTodo(todo);}}>
                <View
                  style={toggleStyle}
                >
                </View>
              </TouchableHighlight>
              <Text
                style={styles.row}
                >
                {todo.text}
              </Text>
            </View>
            );
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  toggleOn: {
    backgroundColor: 'green'
  },
  toggle: {
    height: 30,
    width: 30,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15
  }
});
