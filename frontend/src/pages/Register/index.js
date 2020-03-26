import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'
import logo from '../../assets/logo.svg'

export default function Register(){

  const history = useHistory();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  
  async function handleRegister(e){
    e.preventDefault()
    const data = {
      name,
      email,
      phone,
      city,
      state,
    }

    try {
      const response = await api.post('ngos', data)
      alert(`Your assigned ID is ${response.data.id}`)
      history.push('/')
    } catch (err){
      alert('We experienced an error. Please try again later.')
    }

  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
        <img src={logo} alt="Be The Hero"/>

        <h1>Sign Up!</h1>
        <p>Sign up, enter the platform and help people find your NGOs cases!</p>

        <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#E02041"/>
          Return to Login
        </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            placeholder="NGOs name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input type="email"
           placeholder="NGOs name"
           value={email}
           onChange={e => setEmail(e.target.value)}
           />
          <input 
            placeholder="Phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input 
              placeholder="State" 
              style={{width:100}}
              value={state}
              onChange={e => setState(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}