import React, { useState, useEffect } from 'react'
import { Link, useHistory} from 'react-router-dom'
import {FiPower} from 'react-icons/fi'
import {FiTrash2} from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo.svg'

export default function Register(){
  const history = useHistory()
  const ngoName = localStorage.getItem('ngoName')
  const ngoId = localStorage.getItem('ngoId')
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization : ngoId,
      }
    }).then(response => {
        setIncidents(response.data)
    })
  }, [ngoId])

  async function handleDeleteIncident(id){
    try{
      await api.delete(`incidents/${id}`,{
        headers: {
          Authorization: ngoId,
        }
      })

      setIncidents(incidents.filter(incident => incident.id !== id))
    } catch(err){
      alert('Error when trying to delete. Try again.')
    }
  }

  function handleLogout(){
    localStorage.clear()
    history.push('/')
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logo} alt="Be The Hero"/>
        <span>Welcome, {ngoName}</span>

        <Link className="button" to="/incidents/new">Register new incident</Link>
        <button onClick={handleLogout}type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>
    <h1>Registered incidents</h1>

    <ul>
      {incidents.map(incident => (
        <li key={incident.id}>
        <strong>Case:</strong>
        <p>{incident.title}</p>
        
        <strong>Description:</strong>
        <p>{incident.description}</p>

        <strong>Cost:</strong>
        <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}</p>

        <button onClick={() => handleDeleteIncident(incident.id)}type="button">
          <FiTrash2 size={28} color="#a8a8b3"/>
        </button>
      </li>
      ))}
    </ul>
    </div>
)}