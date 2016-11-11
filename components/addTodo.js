import React, {Component} from 'react';
import  {
  TextInput
} from 'react-native';

const PLACEHOLDER_TEXT = 'Enter the Text';
const EMPTY_TEXT = '';

export default class AddTodo extends Component {

  constructor (props) {
    super(props);
    this.state = {text :  '' };
  }

  updateText = (text) => {
    this.setState({text});
  }

  submitEditing = (event) => {
   this.props.onSubmitEditing( {text: event.nativeEvent.text});
   this.updateText(EMPTY_TEXT);
  }

  render() {
    return (
            <TextInput
              placeholder={PLACEHOLDER_TEXT}
              value = {this.state.text}
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              editable={true}
              autoCorrect={false}
              onChangeText={this.updateText}
              onSubmitEditing={this.submitEditing}
            ></TextInput>
            );
  }
}

