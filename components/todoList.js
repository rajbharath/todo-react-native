import React, {Component} from 'react';
import  {
  ListView
} from 'react-native';
import TodoRow from './todoRow';

export default class TodoList extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  render () {
    const dataSource = this.state.dataSource.cloneWithRows(this.props.todos);
    return (<ListView
            dataSource={dataSource}
            enableEmptySections={true}
            renderRow={ (todo) => <TodoRow todo={todo} toggleTodo={this.props.toggleTodo}></TodoRow> }>
            </ListView>
            )
  }
}
