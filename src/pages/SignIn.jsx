import {useState} from 'react'

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

import {validatePassword, register} from '/src/utils.js'

import Ribbon from "../components/Ribbon";

const SignIn = () =>{
    const userVars = useContext(UserContext);

    const [signInParams, setSignInParams] = useState({displayname: '', passwordAttempt: ''})
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (e) => {
        if (errorMsg) setErrorMsg('')
        var newSignInParams = {
            ...signInParams,
            [e.target.name]: e.target.value,
        }
        setSignInParams(newSignInParams)
    }

    const handleSignIn = async (e) => {
        e.preventDefault()
        const res = await validatePassword(signInParams)
        if (res.error) setErrorMsg(res.msg)
        else{
            setErrorMsg(res.msg)
            window.location = '/'
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const res = await register(signInParams)
        if (res.error) setErrorMsg(res.msg)
        else{
            setErrorMsg(res.msg)
            window.location = '/'
        }
    }

    if (userVars.user_id) {
        return(<>You are already signed in!</>)
    } 

    return (
        <div className='sign-in'>
            <Ribbon text="Sign in or register for an account"/>

            <form className='sign-in'>
                <input 
                    name='displayname'
                    placeholder='username'
                    onChange={handleChange}
                />

                <input 
                    name='passwordAttempt'
                    type="password"
                    placeholder='password'
                    onChange={handleChange}
                />
                <div>
                    <button onClick={handleSignIn}>Sign in</button>
                    <button onClick={handleRegister}>Register</button>
                </div>
            </form>

            <div className='error-msg'>{errorMsg}</div>
        </div>
    )

}
export default SignIn