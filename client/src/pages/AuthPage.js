import React, {  useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {

    const auth = useContext(AuthContext)
    const {loading, request} = useHttp()  
    const [form, setForm] = useState({
        email:'', password:''
    })


    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
        } catch (e) {
            
        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.id)
        } catch (e) {
            
        }
    }
    return(
        <div>
            <h1>AuthPage</h1>
            <input id="Email" name="email" onChange={changeHandler}/>
            <label htmlFor="Email">Email</label>
            <input id="Password" name="password" onChange={changeHandler}/>
            <label htmlFor="Password">Password</label>
            <button onClick={loginHandler} disabled={loading}>Login</button>
            <button onClick={registerHandler} disabled={loading}>Register</button>
        </div>
        )
}