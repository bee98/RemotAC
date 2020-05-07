import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity,Modal,TouchableHighlight,TextInput} from 'react-native';
const styles = StyleSheet.create({
  SubmitButtonStyle: {
    margin: 6,
    padding: 8,
    backgroundColor: '#deac50',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#fff',
    width: 77,
    height: 77,
  },
  temp: {
    fontWeight : 'bold',
    fontSize: 50,
    color: '#695f5c',
  },
  baseText: {
    fontFamily: 'sans-serif-medium',
    marginVertical: 20,
    color: '#837f5c',
    borderWidth: 1,
    borderColor: '#deac50',
    padding: 10,
    fontSize: 15,
    borderRadius: 10,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    margin :'auto',
    marginBottom: 12
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height:'80%',
    width:'80%',
  },
  openButton: {
    backgroundColor: "#deac50",
    borderRadius: 20,
    padding: 8,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});
function ac() {
  const [reset, setReset] = useState(true);
  const [temp, setTemp] = useState(24);
  const [fan, setFan] = useState(1);
  const [mode, setMode] = useState(0);
  const [time, setTime] = useState(0);
  const [swingOne, setSwingOne] = useState(true);
  const [swingTwo, setSwingTwo] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wait, setWait] = useState(true);
  const [req,setReq] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [value, onChangeText] = useState('');
  const profile = {
    power: require('./icons/power.png'),
    mode: require('./icons/mode.png'),
    time: require('./icons/time.png'),
    cool: require('./icons/cool.png'),
    heat: require('./icons/heat.png'),
    auto: require('./icons/automode.png'),
    dry: require('./icons/dry.png'),
    up: require('./icons/up.png'),
    down: require('./icons/down.png'),
    fan: require('./icons/fan.png'),
    swinglr: require('./icons/arrowlr.png'),
    temp: require('./icons/temp.png'),
    swingud: require('./icons/arrowud.png'),
  };
  function sendReq()
  {
    fetch('http://'+value+':3000/mode', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code:{power:reset,temp:temp,fan:fan,mode:mode,swingOne:swingOne,swingTwo:swingTwo,time:time}})
    }).then((response) => {
     // console.log(response.json());
    }).catch(e => console.log(e));
    
  }
  function onOff() {
    setReset(!reset);
    setMode(0);
    setTemp(24);
    setFan(1);
    setTime(0);
    setSwingOne(true);
    setSwingTwo(true);
    setReq(!req);
  }
  function up() {
    if (true == reset) return;
    if (30 > temp) setTemp(temp + 1);
    setReq(!req);
  }
  function down() {
    if (true == reset) return;
    if (18 < temp) setTemp(temp - 1);
    setReq(!req);
  }
  function modeSelect() {
    if (true == reset) return;
    if (0 == mode) {
      setMode(1);
      setReq(!req);
      return;
    }
    if (1 == mode) {
      setMode(2);
      setReq(!req);
      return;
    }
    if (2 == mode) {
      setMode(0);
      setReq(!req);
      return;
    }

  }
  function fanSelect() {
    if (true == reset) return;
    if (1 == fan) {
      setFan(2);
      setReq(!req);
      return;
    }
    if (2 == fan) {
      setFan(3);
      setReq(!req);
      return;
    }
    if (3 == fan) {
      setFan(4);
      setReq(!req);
      return;
    }
    if (4 == fan) {
      setFan(1);
      setReq(!req);
      return;
    }
  }
  function swingOneShow() {
    if (true == reset) return;
    setSwingOne(!swingOne);
    setReq(!req);
  }
  function swingTwoShow() {
    if (true == reset) return;
    setSwingTwo(!swingTwo);
    setReq(!req);
  }
  function showMode() {
    if (0 == mode)
      return (
        <Image
          source={profile.cool}
          style={{width: 25, height: 25, margin: 3}}
        />
      );
    if (1 == mode)
      return (
        <Image
          source={profile.heat}
          style={{width: 25, height: 25, margin: 3}}
        />
      );
    if (2 == mode)
      return (
        <Image
          source={profile.dry}
          style={{width: 25, height: 25, margin: 3}}
        />
      );
    
  }
  function showFan() {
    if (1 == fan)
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Image
            source={profile.fan}
            style={{width: 25, height: 25, margin: 3}}
          />
        </View>
      );
    if (2 == fan)
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Image
            source={profile.fan}
            style={{width: 25, height: 25, margin: 3}}
          />
          <Image
            source={profile.fan}
            style={{width: 25, height: 25, margin: 3}}
          />
        </View>
      );
    if (3 == fan)
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Image
            source={profile.fan}
            style={{width: 25, height: 25, margin: 3}}
          />
          <Image
            source={profile.fan}
            style={{width: 25, height: 25, margin: 3}}
          />
          <Image
            source={profile.fan}
            style={{width: 25, height: 25, margin: 3}}
          />
        </View>
      );
    if (4 == fan)
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Image
            source={profile.auto}
            style={{width: 25, height: 25, margin: 3}}
          />
        </View>
      );
  }
  function selectTime() {
    if (true == reset) return;
    if (7 > time) setTime(time + 1);
    else setTime(0);
    setReq(!req);
  }
  function showTime() {
    if (0 != time) return <Text style={styles.baseText}>{time} Hour</Text>;
  }

  function inforSensor() {
    if (temperature && humidity && !wait)
      return (
        <Text style={styles.baseText}>
          {temperature}°C - {humidity}%
        </Text>
      );
    return <Text style={styles.baseText}>Waiting information from Server</Text>;
  }
  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://'+value+':3000/sensor')
        .then(response => response.json())
        .then(responseJson => {
          setWait(false);
          setTemperature(responseJson.temperature);
          setHumidity(responseJson.humidity);
        })
        .catch(error => {
          console.log(error);
          setWait(true);
        });
    }, 1000);

    return () => clearInterval(interval);
  });
  function buttonMaker(image, title, color, functionMake) {
  return (
    <TouchableOpacity
      style={styles.SubmitButtonStyle}
      activeOpacity={0.5}
      onPress={functionMake}>
      <View style={{ alignItems: 'center'}}>
      <Image source={image} style={{width: 30, height: 30}} />
      <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
useEffect(() => {
  sendReq();
  var infor = {power:reset,temp:temp,fan:fan,mode:mode,swingOne:swingOne,swingTwo:swingTwo,time:time};
  console.log(infor);

  },[req]);
  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
          {!reset && inforSensor()}
        </View>
        {!reset && (
          <View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              {showTime()}
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {showMode()}
              {!swingOne && (
                <Image
                  source={profile.swinglr}
                  style={{width: 25, height: 25}}
                />
              )}
              {!swingTwo && (
                <Image
                  source={profile.swingud}
                  style={{width: 25, height: 25}}
                />
              )}
              {showFan()}
            </View>
            <View style={{alignItems: 'center'}}>
              <Image source={profile.temp} style={{width: 35, height: 35}} />
              <Text style={styles.temp}>{temp}°C</Text>
            </View>
          </View>
        )}
      </View>
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
        {buttonMaker(profile.power, 'Power', 'red', onOff)}
        {buttonMaker(profile.up, 'Up', 'red', up)}
        {buttonMaker(profile.mode, 'Mode', 'red', modeSelect)}
        {buttonMaker(profile.fan, 'Fan', 'red', fanSelect)}
        {buttonMaker(profile.time, 'Time', 'red', selectTime)}
        {buttonMaker(profile.down, 'Down', 'red', down)}
        {buttonMaker(profile.swinglr, 'Swing', 'red', swingOneShow)}
        {buttonMaker(profile.swingud, 'Swing', 'red', swingTwoShow)}
      </View>
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <View style ={{ marginTop:'45%'}}>
           <TextInput
           style={{ height: 40,width:180, borderColor: 'gray', borderWidth: 1, borderRadius :12, margin:'auto',marginBottom:5 }}
           onChangeText={text => onChangeText(text)}
           value={value}
           placeholder='   Input your IP server...'
           />

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#deac50" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>OK</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Setting</Text>
      </TouchableHighlight>
    </View> 
    </>
  );
}
export default ac;
