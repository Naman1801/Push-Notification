import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect} from 'react'
import {requestUserPermission,NotificationListner} from './src/utils/pushNotification_helper'

export default function App() {
  useEffect(()=>{
    requestUserPermission();
    NotificationListner();
  },[])
  return (
    <View>
      <Text>Push Notification tester</Text>
    </View>
  )
}

const styles = StyleSheet.create({})