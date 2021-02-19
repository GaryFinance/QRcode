import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity ,Dimensions} from 'react-native';
import { BarCodeScanner,BarCodeScannerResult } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';

const { width } = Dimensions.get('window');

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleBarCodeScanned = async ({ type, data }) => {
    await setScanned(true);
    data_1 = await JSON.parse(data)
    userData = await fetch(`http://34.64.197.138:3333/search?ticketId=${data_1.ticketId}`)
    user = await userData.json()
    // data_2 = JSON.stringify(userData)
    console.log(typeof(user))
    
    if (user[9] ==undefined) {
      alert("인증되지 않은 티켓입니다 다시 시도해 주세요")
    }
    else {
      alert(`검증된 티켓 입니다. 환영합니다 !! ${user[9]}님`);
    }

      
      
    // else {
    //   user = await userData.json()
    //   console.log(user)
    //   alert(`Bar code with type ${type} and data ${data_1.ticketId} has been scanned! ${user}`);
    // }
    // alert(`존재하지 않는 티켓 입니다! 다시한번 확인하여 주세요`);
   }
    
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  return (
    <View style={{flex:1}}>
    <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{
          flex:1,
          backgroundColor:'transparent',
          flexDirection:'row'
        }}>
        <TouchableOpacity  style= {{
          flex:1,
          alignItems:'flex-end'
        }}
         onPress={()=>{
           setType(
             type=== BarCodeScanner.Constants.Type.back 
              ? BarCodeScanner.Constants.Type.front
              : BarCodeScanner.Constants.Type.back
           )
         }}
        >
          <Text style={{fontSize:18, margin:5, color:'white'}}>Flip</Text>
        </TouchableOpacity>
      </View>
      <BarcodeMask edgeColor="#62B1F6" showAnimatedLine/>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

// export default class App extends Component {
//   state = {
//     hasCameraPermission: null,
//     lastScannedUrl: null,
//   };

//   componentDidMount() {
//     this._requestCameraPermission();
//   }

//   _requestCameraPermission = async () => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({
//       hasCameraPermission: status === 'granted',
//     });
//   };

//   _handleBarCodeRead = result => {
//     if (result.data !== this.state.lastScannedUrl) {
//       LayoutAnimation.spring();
//       this.setState({ lastScannedUrl: result.data });
//     }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.hasCameraPermission === null ? (
//           <Text>Requesting for camera permission</Text>
//         ) : this.state.hasCameraPermission === false ? (
//           <Text style={{ color: '#fff' }}>
//             Camera permission is not granted
//           </Text>
//         ) : (
//           <View
//             style={{
//               backgroundColor: 'red',
//               height: Dimensions.get('window').height,
//               width: Dimensions.get('window').width,
//               alignItems: "center",
//               justifyContent: "center"
//             }}>
//             <BarCodeScanner
//               onBarCodeRead={this._handleBarCodeRead}
//               style={{
//                 height: '50%',
//                 width: '50%',
//               }}
//             />
//           </View>
//         )}

//         {this._maybeRenderUrl()}

//         <StatusBar hidden />
//       </View>
//     );
//   }

//   _handlePressUrl = () => {
//     Alert.alert(
//       'Open this URL?',
//       this.state.lastScannedUrl,
//       [
//         {
//           text: 'Yes',
//           onPress: () => Linking.openURL(this.state.lastScannedUrl),
//         },
//         { text: 'No', onPress: () => {} },
//       ],
//       { cancellable: false }
//     );
//   };

//   _handlePressCancel = () => {
//     this.setState({ lastScannedUrl: null });
//   };

//   _maybeRenderUrl = () => {
//     if (!this.state.lastScannedUrl) {
//       return;
//     }

//     return (
//       <View style={styles.bottomBar}>
//         <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
//           <Text numberOfLines={1} style={styles.urlText}>
//             {this.state.lastScannedUrl}
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={this._handlePressCancel}>
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});


const opacity = 'rgba(0, 0, 0, .6)';
