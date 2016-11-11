import React, {Component} from 'react';
import  {
  TextInput
} from 'react-native';

export default class AddTodo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: 'Enter the Text'
    }
  }

  render() {
    return (
              <TextInput
              value={this.state.text}
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText = {(text) => { this.setState({text}); }}
              editable={true}
              onSubmitEditing={ (event) => { this.props.onSubmitEditing({text: event.nativeEvent.text}) }}
              ></TextInput>
            );
  }
}

