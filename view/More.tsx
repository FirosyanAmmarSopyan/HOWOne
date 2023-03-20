import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  IconButton,
  NativeBaseProvider,
  Divider,
  Image,
  Center,
  AlertDialog,
} from 'native-base';
import {LinearTextGradient} from 'react-native-text-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

function More(): JSX.Element {


  const navigation = useNavigation();
  const slemek = [
    {
      id: 1,
      day: 'sunday',
      weather: 'Thunder',
      celcius: '18',
    }
  ];

  const Lists = () => {
    return (
      <View>
        {slemek.map(item => {
          return (
            <View key={item.id}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Text
                  style={{color: 'white', fontSize: 20, alignSelf: 'center'}}>
                  {item.day}
                </Text>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Image
                    source={require('../assets/storm.png')}
                    alt="NULL"
                    style={{width: 30, height: 30}}
                  />
                  <Text style={{color: 'white', fontSize: 20}}>{item.weather}</Text>
                </View>
                <Text
                  style={{fontSize: 50, fontWeight: 'bold', color: 'white'}}>
                 {dataForecast?.currentConditions?.temp.toFixed(0)}℃
                </Text>
              </View>
              <Divider bg="coolGray.300" my="2" />
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <NativeBaseProvider>
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#5624d5', '#6e39dd', '#513164', '#020024']}
          style={{flex: 1, padding: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Icon2
                  name="arrow-left"
                  size={35}
                  style={{alignSelf: 'center', color: 'white'}}
                />
                <Text style={{fontSize: 25, color: 'white'}}>Back</Text>
              </View>
            </TouchableOpacity>
            <Image
              source={require('../assets/storm.png')}
              alt="NULL"
              size="lg"
              // style={{width: 200, height: 150}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Icon3
              name="calendar-alt"
              size={25}
              style={{color: 'white', marginRight: 10}}
            />
            <Text style={{fontSize: 25, color: 'white'}}>This Week</Text>
          </View>
          <ScrollView style={{marginTop: 25}}>
            <Lists />
          </ScrollView>
        </LinearGradient>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});

export default More;
