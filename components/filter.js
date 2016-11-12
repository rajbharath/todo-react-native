import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

export default class Filter extends Component {

  constructor () {
    super();
  }

  getStyle = (filter) => {
    if (filter.type === this.props.activeFilter.type) {
      return [styles.tab, styles.active];
    }
    return styles.tab;
  }

  render() {
    return (<View style={{ flex: 1, flexDirection: 'row'}}>
              <TouchableHighlight style={this.getStyle(this.props.showAll)} onPress={() => { this.props.onFilter(this.props.showAll) }}><Text>{this.props.showAll.text}</Text></TouchableHighlight>
              <TouchableHighlight style={this.getStyle(this.props.completed)} onPress={() => { this.props.onFilter(this.props.completed) }}><Text>{this.props.completed.text}</Text></TouchableHighlight>
              <TouchableHighlight style={this.getStyle(this.props.inComplete)} onPress={() => { this.props.onFilter(this.props.inComplete) }}><Text>{this.props.inComplete.text}</Text></TouchableHighlight>
            </View>
            );
  }
}


const styles = {
  tab: {
    borderWidth: 1,
    padding: 10,
    alignSelf: 'stretch',
    height: 40,
    borderColor: 'gray'
  },
  active: {
    backgroundColor: 'red'
  }
}
