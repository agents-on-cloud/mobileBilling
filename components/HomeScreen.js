import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import axios from 'axios';
export default function HomeScreen({navigation}) {
  const [togle, setTogle] = useState(false);
  const [togle2, setTogle2] = useState(false);
  const [togle3, setTogle3] = useState(false);
  const [fixedOpenAndClose, setFixedOpenAndClose] = useState([]);
  const [openAndClose, setOpenAndClose] = useState([]);
  const [due_date, setDue_date] = useState('');
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    if (togle) {
      getCashRegister();
    }
  }, [togle, togle2, togle3]);

  useEffect(() => {
    const arr = fixedOpenAndClose.filter(ele => {
      return ele.Date === due_date;
    });
    setOpenAndClose(arr);
  }, [due_date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1 + '';
    if (month.length === 1) month = '0' + month;
    let day = currentDate.getDate() + '';
    if (day.length === 1) day = '0' + day;
    setDue_date(year + '-' + month + '-' + day);
    setDate(currentDate);
  };

  const showDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
      minimumDate: new Date(),
    });
  };
  const getCashRegister = async () => {
    try {
      const responseOpenAndClose = await axios.get(
        `http://10.0.2.2:30162/cashRegister/cash/today`,
      );
      setFixedOpenAndClose(responseOpenAndClose.data);
      setOpenAndClose(responseOpenAndClose.data);
    } catch {
      console.log('Error');
    }
  };
  let today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .substr(0, 10);
  const removeFilter = () => {
    setOpenAndClose(fixedOpenAndClose);
  };
  return (
    <View style={style.container}>
      <View>
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            View Cash Opening Closing
          </Text>
          <Icon
            size={30}
            name="plus"
            color="#009688"
            onPress={() => {
              setTogle(!togle);
              setTogle2(false);
              setTogle3(false);
            }}
          />
        </View>
        {togle ? (
          <ScrollView>
            <View
              style={{minheight: 200, backgroundColor: '#009688', padding: 25}}>
              <View
                style={{
                  marginTop: 30,
                  paddingHorizontal: 20,
                }}>
                <View>
                  <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                    <Icon name="money" size={60} color="#fff" />
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 25,
                    }}>
                    Cash Registry
                  </Text>
                  {/* <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: '#fff',
                      fontSize: 15,
                    }}>
                    Today is {today}
                  </Text>

                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: 10,
                    }}>
                    <Icon
                      name="calendar"
                      size={25}
                      color="#fff"
                      onPress={showDate}
                    />
                  </Text> */}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop:10
                  }}>
                  <Text
                    style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>
                    Today is : {today}
                  </Text>
                  <Text>
                    <Icon
                      name="calendar"
                      size={25}
                      color="#fff"
                      onPress={showDate}
                    />
                    {/* <Icon
                      style={{
                        color: '#fff',
                      }}
                      name="remove"
                      size={25}
                      onPress={removeFilter}
                    /> */}
                  </Text>
                </View>
              </View>
              <FlatList
                data={openAndClose}
                renderItem={({item}) => (
                  <TouchableOpacity>
                    <View>
                      <View style={style.viewCashRegistry}>
                        <View>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              borderRadius: 5,
                              textAlign: 'center',
                            }}>
                            {item.Type}
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              borderRadius: 5,
                              textAlign: 'center',
                            }}>
                            Actual: {item.ActualAmount} JD
                          </Text>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              borderRadius: 5,
                              textAlign: 'center',
                            }}>
                            Expected: {item.ExpectedAmount} JD
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.CashRegister_id}
              />
            </View>
          </ScrollView>
        ) : null}
        {/*  ------------------------------------------------------- */}
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            View List of Receivables / Payable
          </Text>
          <Icon
            size={30}
            color="#009688"
            name="plus"
            onPress={() => {
              setTogle(false);
              setTogle2(!togle2);
              setTogle3(false);
            }}
          />
        </View>
        {togle2 ? (
          <View
            style={{minheight: 200, backgroundColor: '#009688', padding: 25}}>
            {/* Start Expenses */}
            {/* Start Filter Expenses */}
            <View
              style={{
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15}}>
                Today is : {today}
              </Text>
              <Text>
                <Icon
                  name="calendar"
                  size={25}
                  color="#FFF"
                  onPress={showDate}
                />
              </Text>
            </View>
            {/* End Filter Expenses */}
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
                Expenses
              </Text>
            </View>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 15,
              }}>
              <Text
                style={{
                  backgroundColor: '#FFF',
                  padding: 20,
                  fontWeight: 'bold',
                  borderRadius: 5,
                  textAlign: 'center',
                }}>
                Provider
                {'\n'}
                10 JD
              </Text>

              <Text
                style={{
                  backgroundColor: '#FFF',
                  padding: 20,
                  fontWeight: 'bold',
                  borderRadius: 5,
                  textAlign: 'center',
                }}>
                Inventory
                {'\n'}
                10 JD
              </Text>

              <Text
                style={{
                  backgroundColor: '#FFF',
                  padding: 20,
                  fontWeight: 'bold',
                  borderRadius: 5,
                  textAlign: 'center',
                }}>
                Facilities
                {'\n'}
                10 JD
              </Text>
            </View>
            {/* End Expenses */}

            {/* Start Revenue  */}
            <Text style={{fontWeight: 'bold', fontSize: 18, color: '#fff'}}>
              Revenue
            </Text>
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  backgroundColor: '#FFF',
                  padding: 20,
                  borderRadius: 5,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Appointment
                {'\n'}
                50 JD
              </Text>

              <Text
                style={{
                  backgroundColor: '#FFF',
                  padding: 20,
                  borderRadius: 5,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Products
                {'\n'}
                50 JD
              </Text>

              <Text></Text>
            </View>
            {/* End Expenses */}
          </View>
        ) : null}
        {/*  ------------------------------------------------------- */}
        <View
          style={{
            marginTop: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            View List of Service Profit Breakdown
          </Text>
          <Icon
            size={30}
            name="plus"
            color="#009688"
            onPress={() => {
              setTogle(false);
              setTogle2(false);
              setTogle3(!togle3);
            }}
          />
        </View>
        {togle3 ? (
          <View style={{height: 200, backgroundColor: '#009688'}}></View>
        ) : null}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCashRegistry: {
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 2,
    borderColor: '#eee',
    width: '40%',
    // marginHorizontal: 50,
    borderRadius: 5,
  },
  filter: {
    color: 'green',
  },
});
