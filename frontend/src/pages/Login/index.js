import React , {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'

import './styles.css'
import heroesImage from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import api from '../../services/api'


export default function Login(){
    const [id, setId] = useState('')
    const history = useHistory()

    async function handleLogin(e){
        e.preventDefault()

        try {
            const response = await api.post('sessions', {id})
            localStorage.setItem('ngoId', id)
            localStorage.setItem('ngoName', response.data.name)
            
            history.push('/profile')
        } catch(err){
            alert('Login failed. Check your spelling or try again later.')
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Login Here!</h1>
                    <input 
                        placeholder="Enter your ID here!"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Register here.
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes"/>
        </div>
    )
}