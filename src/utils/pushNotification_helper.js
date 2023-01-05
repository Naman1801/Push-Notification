import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToke()
  }
}
 const GetFCMToke = async ()=>{
    let fcmtoken = await AsyncStorage.getItem("fcmtoken")
    console.log(fcmtoken,"old token");
    if(!fcmtoken){
        try {
            let fcmtoken = await messaging().getToken();
            if(fcmtoken){
                console.log("new token",fcmtoken);
               await AsyncStorage.setItem("fcmtoken",fcmtoken)
            }
        } catch (error) {
            console.log(error,"error in fcmtoken")
        }
    }
}

export const NotificationListner  = () =>{

    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

        //Foreground Message Handler

        messaging().onMessage(async remoteMessage => {
           console.log("Notification in Foreground",remoteMessage);
          });

        //For initial notification 
        messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

      messaging().onMessage(async remoteMessage =>{
        console.log("Notification on froground state....",remoteMessage);
      })
}