import Store from '../store';
import React, {Component} from 'react';
import  {
  ListView,
  Text,
  StyleSheet
} from 'react-native';

export default class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  renderRow(todo) {
    return (
            <Text
              style={styles.row}
              >
              {todo.text}
            </Text>
            );
  }

  render () {
    const dataSource = this.state.dataSource.cloneWithRows(this.props.todos);
    return (<ListView
            dataSource={dataSource}
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
