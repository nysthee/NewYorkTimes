import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BookItem from './BookItem';
import config from '../config';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 24,
  },
  list: {
    flex: 1,
    flexDirection: 'row',
  },
  listContent: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    fontSize: 24,
    padding: 42,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },
  sectionDivider: {
    padding: 8,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
  },
  headingText: {
    flex: 1,
    fontSize: 24,
    alignSelf: 'center',
  },
});


class App extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    fetch(`http://api.nytimes.com/svc/books/lists/hardcover-fiction?response-format%20=json&api-key=${config.ny_times_api_key}`)
      .then(response => response.json())
      .then((rjson) => {
        console.log(rjson);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(rjson.body),
        });
      }
    )
    .catch((error) => {
      console.warn(error);
    });
  }

  renderHeader() {
    return (
      <View style={styles.sectionDivider}>
        <Text style={styles.headingText}>
          Bestsellers in Hardcover Fiction
        </Text>
      </View>);
  }

  renderFooter() {
    return (
      <View style={styles.sectionDivider}>
        <Text>Data from the New York Times bestsellers list.</Text>
      </View>);
  }

  renderRow(rowData) {
    return (
      <BookItem
        style={{ marginTop: 24 }}
        coverURL={rowData.book_details[0].book_image}
        title={rowData.book_details[0].title}
        author={rowData.book_details[0].author}
      />
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderHeader={this.renderHeader}
        renderFooter={this.renderFooter}
      />
    );
  }
}

export default App;
