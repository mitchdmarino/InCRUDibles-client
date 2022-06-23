import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

export default function Register({ currentUser, setCurrentUser }) {
    // state for the controlled form 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [msg, setMsg] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            // post form data to the backend
            const reqBody = {
                name,
                email, 
                password
            }
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/register`, reqBody)

            // save the token in localstorage
            const { token } = response.data
            localStorage.setItem('jwt', token)
            // decode the token 
            const decoded = jwt_decode(token)
            // set the user in App's state to be the decoded token 
           setCurrentUser(decoded)
        } catch (err) {
            console.warn(err)
            if (err.response) {
                if (err.response.status===400) {
                    setMsg(err.response.data.msg)
                }
            }
        }
    }

    // conditionally render a navigate component 
    if (currentUser) {
        return <Navigate to='/profile' />
    }

    return (
        <div>
            <h1>Register</h1>
            <p> {msg}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name'>name</label>
                <input 
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    placeholder='example@domain.com'
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor='email'>email</label>
                <input 
                    type='text'
                    name='email'
                    id='email'
                    value={email}
                    placeholder='example@domain.com'
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>password</label>
                <input 
                    type='text'
                    name='password'
                    id='password'
                    value={password}
                    placeholder='********'
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}