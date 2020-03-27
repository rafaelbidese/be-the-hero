import React , { useState, useEffect} from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import api from '../../services/api'
import logo from '../../assets/logo.png'
import styles from './styles'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

export default function Incidents(){
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  function navigateToDetails(incident){
    navigation.navigate('Details', { incident })
  }

  async function loadIncidents(){
    if(loading){
      return
    }

    if(total>0  && incidents.length === total){
      return
    }

    setLoading(true)

    const response = await api.get(`incidents?page=${page}`)
    setIncidents([... incidents, ... response.data])
    setTotal(response.headers['x-total-count'])
    setPage(page+1)
    setLoading(false)
  }

  useEffect(() => {
    loadIncidents()
  },[])

  return (
    <View style={styles.container}>
      <View style= { styles.header}>
        <Image source={logo}/>
        <Text style={styles.headerText}>
          Total: <Text style={styles.headerTextBold}> {total} incidents</Text>.
        </Text>
      </View>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>Choose an incident and save the day!</Text>

      <FlatList 
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
          <Text style={styles.incidentProperty}>NGO:</Text>
          <Text style={styles.incidentValue}>{incident.name}</Text>

          <Text style={styles.incidentProperty}>Case:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>Cost</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
              }).format(incident.value)}
          </Text>

          <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigateToDetails(incident)}
          >
            <Text style={styles.detailsButtonText}>See details</Text>
            <Feather name="arrow-right" size={16} color="#e02041"/>
          </TouchableOpacity>
        </View>
        )}
      />
    </View>  
  )
}