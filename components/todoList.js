import React, {Component} from 'react';
import  {
  ListView,
  Text,
  StyleSheet
} from 'react-native';

export default class TodoList extends Component {
  constructor () {
    super();
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };

    this.state.dataSource = this.state.dataSource.cloneWithRows(
        [
          { id: 1, text: 'Learn React', completed: false },
          { id: 2, text: 'Learn React Native', completed: false }
        ]
    );
  }

  renderRow(todo) {
    return (
            <Text
              style = {styles.row}
            >
              {todo.text}
            </Text>
            );
  }
  render () {
    return (<ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}>
            </ListView>
            )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    padding: 10
  }
});
