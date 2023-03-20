import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import moment from 'moment';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Platform,
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
import axios from 'axios';
import {LinearTextGradient} from 'react-native-text-gradient';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/EvilIcons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
// import localization from 'moment/locale/en';

function Home(props: any): JSX.Element {
  useEffect(() => {
    requestPermissions(); // console.log('anu')
  }, []);

  // ==================== CURRENT WEATHER API =================== //

  const [dataCurrent, setDataCurrent] = useState(null);
  const GET_API = async (obj: Object) => {
    const result = await JSON.parse(JSON.stringify(obj));
    console.log('latitude', result.coords.latitude);
    try {
      const Aresult = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=4ba77eaf49de4165a8822148230103&q=${result.coords.latitude},${result.coords.longitude}`,
      );
      setDataCurrent(JSON.parse(JSON.stringify(Aresult.data)));
      // console.log('ini aresult', JSON.parse(JSON.stringify(Aresult.data)));
    } catch (error) {
      console.log('eror lurd');
    }
  };

  // ================== CURRENT WEATHER API =======================//

  // ==================== FORECAST WEATHER API =================== //

  const [dataForecast, setDataForecast] = useState(null);
  const GET_API_FORECAST = async (obj: Object) => {
    const result = await JSON.parse(JSON.stringify(obj));
    console.log('latitude', result.coords.latitude);
    try {
      const Aresult = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${result.coords.latitude},${result.coords.longitude}?unitGroup=metric&include=days%2Ccurrent&key=TCV2D52HKZ6R6KJQZBMG64BPS&contentType=json`,
      );
      setDataForecast(JSON.parse(JSON.stringify(Aresult.data)));
      // console.log('ini aresult', JSON.parse(JSON.stringify(Aresult.data)));
      // console.log('ini aresult', JSON.parse(JSON.stringify(Aresult.data.days)));

    } catch (error) {
      console.log('eror lurd');
    }
  };

  // ================== FORECAST WEATHER API =======================//

  // ================== ASTRONOMY WEATHER API ======================//
  const [dataAstro, setDataAstro] = useState(null);
  const GET_API_ASTRO = async (obj: Object) => {
    const result = await JSON.parse(JSON.stringify(obj));
    // console.log('latitude',result.coords.latitude)
    try {
      const Aresult = await axios.get(
        `http://api.weatherapi.com/v1/astronomy.json?key=4ba77eaf49de4165a8822148230103&q=${result.coords.latitude},${result.coords.longitude}`,
      );
      setDataAstro(JSON.parse(JSON.stringify(Aresult.data.astronomy)));
      // console.log('ini aresult',JSON.parse(JSON.stringify(Aresult.data)))
    } catch (error) {
      console.log('eror lurd astronya');
    }
  };

  // ==================== ASTRONOMY WEATHER API =================//

  const [location, setLocation] = useState(null);

  async function requestPermissions() {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      Geolocation.getCurrentPosition(info => {
        GET_API(info);
        GET_API_ASTRO(info);
        GET_API_FORECAST(info);
      });
    }
  }

  const RenderIcon = () => {
    switch (dataCurrent?.current?.condition?.code) {
      case 1000:
        return (
          <Image
            source={require('../assets/shiny.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1003 || 1006 || 1030 || 1135 || 1147:
        return (
          <Image
            source={require('../assets/cloudy.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1063 || 1150 || 1153 || 1180 || 1183 || 1204:
        return (
          <Image
            source={require('../assets/light-rain.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1066 ||
        1069 ||
        1072 ||
        1114 ||
        1117 ||
        1168 ||
        1171 ||
        1210 ||
        1213 ||
        1216 ||
        1219 ||
        1225 ||
        1255 ||
        1258:
        return (
          <Image
            source={require('../assets/snow.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1087:
        return (
          <Image
            source={require('../assets/storm.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1273 || 1276:
        return (
          <Image
            source={require('../assets/thunder-rain.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1279 || 1282:
        return (
          <Image
            source={require('../assets/snowstorm.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1186 || 1189 || 1207 || 1240:
        return (
          <Image
            source={require('../assets/rain.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1192 || 1195 || 1243 || 1246:
        return (
          <Image
            source={require('../assets/rainy.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1198 || 1201:
        return (
          <Image
            source={require('../assets/snow-rainy.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
      case 1237 || 1249 || 1252 || 1261 || 1264:
        return (
          <Image
            source={require('../assets/icicle.png')}
            alt="NULL"
            size="xl"
            // style={{width: 200, height: 150}}
          />
        );
    }
  };

  // moment.updateLocale('en',localization)
  let date = moment().locale('en');

  const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <View style={{flex: 1}}>
        <LinearGradient
          colors={['#df9227', '#a9816d', '#1f1f37', '#020024']}
          style={{flex: 1, padding: 10}}>
          <TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: '#ffffff', fontSize: 20}}>
                {dataCurrent?.location?.name}
              </Text>
              <Icon name="arrow-up-right" size={22} />
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 30, color: '#ffffff'}}>Good Morning</Text>
            <IconButton
              style={{marginTop: -3}}
              size="xs"
              borderRadius="full"
              icon={<Icon1 name="dots-vertical-circle-outline" size={30} />}
            />
          </View>
          <Center style={{marginTop: 10}}>
            <RenderIcon />
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/hot.png')}
                alt="NULL"
                size="sm"
                style={{alignSelf: 'center', marginTop: 7}}
              />
              <Text style={{fontSize: 100}}>
                {dataForecast?.currentConditions?.temp.toFixed(0)}℃
              </Text>
            </View>
            <Text style={{fontSize: 30}}>
              {dataCurrent?.current?.condition?.text}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text>{date.format('dddd Do MMMM YYYY')}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('MoreScreen')}
                style={{flexDirection: 'row', marginTop: 20}}>
                <LinearTextGradient
                  style={{fontSize: 22}}
                  locations={[0.1, 0.25, 1]}
                  colors={['#5c5c9b', '#7a6987', '#faa89a']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}>
                  <Text style={{alignSelf: 'center'}}>Next days</Text>
                </LinearTextGradient>
                <Icon2
                  name="arrow-right"
                  size={32}
                  style={{alignSelf: 'center'}}
                />
              </TouchableOpacity>
            </View>
          </Center>
          <View
            style={{
              marginTop: 30,
              marginHorizontal: 10,
              flex: 1,
              justifyContent: 'center',
            }}>
            {/* =====sunrise & sunset======= */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* sunrise */}
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/sun.png')}
                  alt="NULL"
                  size="7"
                  style={{alignSelf: 'center', marginRight: 7}}
                />
                <View>
                  <Text>Sunrise</Text>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {dataForecast?.currentConditions?.sunrise}
                  </Text>
                </View>
              </View>
              {/* sunrise */}
              {/* sunset */}
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/sunset.png')}
                  alt="NULL"
                  size="7"
                  style={{alignSelf: 'center', marginRight: 7}}
                />
                <View>
                  <Text>Sunset</Text>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    {dataForecast?.currentConditions?.sunset}
                  </Text>
                </View>
              </View>
              {/* sunset */}
            </View>
            <Divider bg="coolGray.500" my="5" />
            {/* =====sunrise & sunset======= */}

            {/* =====Wind MPH & Humidity======= */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {/* sunset */}
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/humidity.png')}
                  alt="NULL"
                  size="7"
                  style={{alignSelf: 'center', marginRight: 7}}
                />
                <View>
                  <Text>Humidity</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    {dataCurrent?.current?.humidity} %
                  </Text>
                </View>
              </View>
              {/* sunset */}
              {/* sunset */}
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/humidity.png')}
                  alt="NULL"
                  size="7"
                  style={{alignSelf: 'center', marginRight: 7}}
                />
                <View>
                  <Text>Moon Phase</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    {dataAstro?.astro?.moon_phase}
                  </Text>
                </View>
              </View>
            </View>
            <Divider bg="coolGray.500" my="5" />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
               {/* sunset */}
               <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/cardinal-points.png')}
                  alt="NULL"
                  size="7"
                  style={{alignSelf: 'center', marginRight: 7}}
                />
                <View>
                  <Text>Wind Direction</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    {dataCurrent?.current?.wind_dir}
                  </Text>
                </View>
              </View>
              {/* sunset */}
              {/* sunset */}
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/wind.png')}
                  alt="NULL"
                  size="7"
                  style={{alignSelf: 'center', marginRight: 7}}
                />
                <View>
                  <Text>Wind MPH</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    {dataCurrent?.current?.wind_mph} mph
                  </Text>
                </View>
              </View>
              {/* sunset */}
            </View>
            <Divider bg="coolGray.500" mt="5" />
          </View>
        </LinearGradient>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({});

export default Home;
