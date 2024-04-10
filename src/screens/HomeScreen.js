import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, StatusBar, Platform} from 'react-native';
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../theme';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/loading';
import {
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
} from '../../api/moviedb';

const ios = Platform.OS == 'ios';
const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    //console.log('got trending movies:', data);
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    //console.log('got upcoming movies:', data);
    if (data && data.results) setUpComing(data.results);
    setLoading(false);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    //console.log('got topRated movies:', data);
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  };
  return (
    <View className="flex-1 bg-neutral-800">
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
        <StatusBar style="light" />
        <View className="flex-row items-center justify-between mx-4">
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}>
          {trending.length > 0 && <TrendingMovies data={trending} />}
          <MovieList title="UpComing" data={upComing} />
          <MovieList title="Top Rated" data={topRated} />
        </ScrollView>
      )}
    </View>
  );
};

//make this component available to the app
export default HomeScreen;
