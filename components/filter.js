import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight
} from 'react-native';

export default class Filter extends Component {

  constructor (props) {
    super(props);
    this.state = {
      activeFilter: this.props.showAll
    }
  }

  getStyle = (filter) => {
    if (filter.text === this.state.activeFilter.text) {
      return [styles.tab, styles.active];
    }
    return styles.tab;
  }

  onFilter = (filter) => {
    filter.handler();
    this.setState({activeFilter: filter});
  }

  render() {
    return (<View style={{ flex: 1, flexDirection: 'row'}}>
              <TouchableHighlight style={this.getStyle(this.props.showAll)} onPress={() => { this.onFilter(this.props.showAll) }}><Text>{this.props.showAll.text}</Text></TouchableHighlight>
              <TouchableHighlight style={this.getStyle(this.props.completed)} onPress={() => { this.onFilter(this.props.completed) }}><Text>{this.props.completed.text}</Text></TouchableHighlight>
              <TouchableHighlight style={this.getStyle(this.props.inComplete)} onPress={() => { this.onFilter(this.props.inComplete) }}><Text>{this.props.inComplete.text}</Text></TouchableHighlight>
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
