//import liraries
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {image185} from '../api/moviedb';

var {width, height} = Dimensions.get('window');
const Cast = ({cast, navigation}) => {
  let personName = 'Keanu Reevs';
  let characterName = 'John Wick';

  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => navigation.navigate('Person', person)}>
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <Image
                    source={{uri: image185(person?.profile_path)}}
                    //source={require('../../assets/cast1.webp')}
                    style={{width: width * 0.1, height: height * 0.1}}
                  />
                </View>
                <Text className="text-white text-xs mt-1">
                  {person?.character.length > 10
                    ? person?.character.slice(0, 10) + '...'
                    : person?.character}
                </Text>
                <Text className="text-white text-xs mt-1">
                  {person?.original_name.length > 10
                    ? person?.original_name.slice(0, 10) + '...'
                    : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;
