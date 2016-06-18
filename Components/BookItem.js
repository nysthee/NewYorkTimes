import React, { PropTypes } from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  bookItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#AAAAAA',
    borderBottomWidth: 2,
    padding: 5,
  },
  cover: {
    flex: 1,
    height: 150,
    resizeMode: 'contain',
  },
  info: {
    flex: 3,
    alignItems: 'flex-end',
    flexDirection: 'column',
    alignSelf: 'center',
    padding: 20,
  },
  author: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const BookItem = (props) => {
  return (
    <View style={styles.bookItem}>
      <Image style={styles.cover} source={{ uri: props.coverURL }} />
      <View style={styles.info}>
        <Text style={styles.author}>{props.author}</Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </View>
  );
};

BookItem.propTypes = {
  coverURL: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default BookItem;
