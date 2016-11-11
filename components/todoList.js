import Store from '../store';
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
        Store.getState()
    );

    Store.subscribe(() => {
      console.log('Notify');
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(Store.getState())
      });
    });

  }

  renderRow(todo) {
    return (
            <Text
              style={styles.row}
              onPress={() => { Store.dispatch({type: 'ADD_TODO', item: {id: 3, text: 'Try', completed: false }}); }}
            >
              {todo.text}
            </Text>
            );
  }

  render () {
    return (<ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
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
