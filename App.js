import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import imageLampLight from './assets/icons/eco-light.png';
import imageLampDark from './assets/icons/eco-light-off.png';
import logoDioLight from './assets/icons/logo-dio.png';
import logoDioDark from './assets/icons/logo-dio-white.png';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //console.log('Mudou o estado da lanterna');
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subsciption = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    return () => subsciption.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.containerDark}>
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightningOn : style.lightningOff}
          source={toggle ? imageLampLight : imageLampDark}
        />
        <Image
          style={style.dioLogo}
          source={toggle ? logoDioLight : logoDioDark}
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  containerDark: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightningOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightningOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});
