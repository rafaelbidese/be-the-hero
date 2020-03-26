import React, { useState } from 'react'
import { Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo.svg'

export default function NewIncident(){
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const ngoId = localStorage.getItem('ngoId')
  const history = useHistory()

  async function handleNewIncident(e){
    e.preventDefault()
    const data = {
      title,
      description,
      value,
    }
    
    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ngoId,
        }
      })
      history.push('/profile')
    } catch(err) {
      alert('Incident not created. Try again later.')
    }

  }
  return(
    <div className="new-incident-container">
      <div className="content">
        <section>
        <img src={logo} alt="Be The Hero"/>

        <h1>Input new incident</h1>
        <p>Describe in details to find a hero to help with this issue!</p>

        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#E02041"/>
          Return to Profile
        </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input 
            placeholder="Incident title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea 
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}  
          />
          <input 
            placeholder="Cost"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button" type="submit">Register New Incident</button>
        </form>
      </div>
    </div>
  
)}