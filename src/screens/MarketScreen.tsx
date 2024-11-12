import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';

interface Stock {
  id: string;
  name: string;
  symbol: string;
  price: string;
  change: string;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
}

const availableStocks: Stock[] = [
  { id: '1', name: 'Apple', symbol: 'AAPL', price: '$150.25', change: '1.25%' },
  { id: '2', name: 'Tesla', symbol: 'TSLA', price: '$900.10', change: '-0.85%' },
  { id: '3', name: 'Amazon', symbol: 'AMZN', price: '$3,200.50', change: '0.15%' },
  { id: '4', name: 'Microsoft', symbol: 'MSFT', price: '$280.50', change: '1.10%' },
];

const newsData: NewsItem[] = [
  { id: '1', title: 'Apple Surpasses Earnings Expectations', description: 'Apple has reported a significant increase in earnings...' },
  { id: '2', title: 'Tesla Announces New Model', description: 'Tesla is set to release a new model next quarter...' },
  { id: '3', title: 'Amazon Expands into New Markets', description: 'Amazon has announced expansion into South America...' },
];

const MarketScreen: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Stock[]>([]);

  const addToWatchlist = (stock: Stock) => {
    if (!watchlist.find((item) => item.id === stock.id)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Watchlist Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Watchlist</Text>
      </View>

      {watchlist.length > 0 ? (
        <FlatList
          data={watchlist}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.stockCard}>
              <Text style={styles.stockName}>{item.name}</Text>
              <Text style={styles.stockPrice}>{item.price}</Text>
              <Text style={[styles.stockChange, { color: item.change.startsWith('-') ? 'red' : 'green' }]}>
                {item.change}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.emptyText}>Add stocks to your watchlist</Text>
      )}

      {/* Available Stocks Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Available Stocks</Text>
      </View>

      <FlatList
        data={availableStocks}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => addToWatchlist(item)} style={styles.stockCard}>
            <Text style={styles.stockName}>{item.name}</Text>
            <Text style={styles.stockPrice}>{item.price}</Text>
            <Text style={[styles.stockChange, { color: item.change.startsWith('-') ? 'red' : 'green' }]}>
              {item.change}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* News Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>News</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {newsData.map((news) => (
        <View key={news.id} style={styles.newsCard}>
          <Text style={styles.newsTitle}>{news.title}</Text>
          <Text style={styles.newsDescription}>{news.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1C22',
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAll: {
    fontSize: 14,
    color: '#FFC107',
  },
  stockCard: {
    backgroundColor: '#282C34',
    borderRadius: 10,
    padding: 15,
    width: 150,
    marginRight: 10,
    alignItems: 'center',
  },
  stockName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  stockPrice: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  stockChange: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
  },
  newsCard: {
    backgroundColor: '#282C34',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  newsDescription: {
    fontSize: 14,
    color: '#B0B0B0',
    marginTop: 5,
  },
});

export default MarketScreen;
