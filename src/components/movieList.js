//import liraries
import React from 'react';
import {Dimensions, View, Text, Image} from 'react-native';
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {styles} from '../theme';
import {useNavigation} from '@react-navigation/native';
import {image185} from '../api/moviedb';
var {width, height} = Dimensions.get('window');

// create a component
const MovieList = ({title, data, hideSeeAll}) => {
  let movieName = 'Ant-Man and the Wasp:Quantumania';
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {data?.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View className="space-y-1 mr-4">
                <Image
                  //source={require('../../assets/moviePoster2.jpeg')}
                  source={{uri: image185(item.poster_path)}}
                  className="rounded-3xl"
                  style={{width: width * 0.33, height: height * 0.22}}
                />
                <Text className="text-neutral-300 ml-1">
                  {item?.title?.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
