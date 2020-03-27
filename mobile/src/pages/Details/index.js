import React, { useEffect }from 'react'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import styles from './styles'
import logo from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'
import api from '../../services/api'


export default function Details(){
  const navigation = useNavigation()
  const route = useRoute()
  const incident = route.params.incident
  const message = `Hello ${incident.name}, I am getting in contact to help with the case ${incident.title} with ${Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)} dollars.`
  function navigateBack(){
    navigation.goBack()
  }

  function sendEmail(){
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendText(){
    Linking.openURL(`whatsapp://send?phone=${incident.phone}&text=${message}`)
  }


  return (
    <View style={styles.container}>
      <View style= { styles.header}>
        <TouchableOpacity onPress={navigateBack}>
          <Feather name='arrow-left' size={28} color="#e82041"/>
        </TouchableOpacity>
        <Image source={logo}/>
      </View>
      <View style={styles.incident}>
      <Text style={[styles.incidentProperty, {marginTop:0}]}>NGO:</Text>
          <Text style={styles.incidentValue}>{incident.name} from {incident.city},{incident.state}</Text>

          <Text style={styles.incidentProperty}>Case:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Cost</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
              }).format(incident.value)}
          </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the HERO!</Text>
        <Text style={styles.heroDescription}>Get in contact:</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendText}>
            <Text style={styles.actionText}>Text!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendEmail}>
            <Text style={styles.actionText}>E-mail!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}