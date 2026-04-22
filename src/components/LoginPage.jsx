import './LoginPage.css'
import { useState } from 'react'
import { Form, Alert } from 'react-bootstrap';

const LoginPage = ({onHandleLogin, onAuthError}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleUsernameChange = (e) => {
        e.preventDefault()
        console.log('The Username is ' + e.target.value)
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        console.log('The password is ' + e.target.value)
        setPassword(e.target.value)
    }
    
    const resetValuesAndLogin = () => {
        onHandleLogin(username, password)
        setUsername('')
        setPassword('')
    }


    return(
        <>
        <div className = "lp-root">

            {/* -- Left Panel -- */}
            <div className = "lp-hero">
                <div className = "lp-hero-logo">
                    <span className = "lp-hero-logo-icon">🥝</span>
                    <span className = "lp-hero-logo-icon">Kiwi</span>
                </div>
                <h1 className = "lp-hero-headline">Smart portfolio management for modern investors.</h1>
                <p className = "lp-hero-subline">Track your holdings, execute, trades, and review every transaction - all in one place.</p>
                <ul className = "lp-features">
                    <li><span className = "lp-check">✓</span>Real-time portfolio tracking</li>
                    <li><span className = "lp-check">✓</span>Buy and sell securities instantly</li>                        
                    <li><span className = "lp-check">✓</span>Full Transaction History with filters</li>                        
                </ul>
            </div>
            {/* Right Panel */}
            <div className = "lp-login">
                <div className = "login-card">
                    <div className = "login-card-logo">🥝</div>
                    <h2 className = "login-card-title">Welcome back</h2>
                    <p className = "login-card-sub">Sign in to access your portfolio dashboard</p>
                     

                    {onAuthError && (
                        <Alert variant = "danger" className = "lp-alert">{onAuthError}</Alert>
                    )}

                    <Form>
                        <Form.Group className = "Form" controlId = "FormBox-Username"> {/* This is the actual box */}
                            <Form.Label>Username</Form.Label>
                            <Form.Control value = {username} type="text" onChange = {(e) => handleUsernameChange(e)}/> {/* This is the text inside box */}
                        </Form.Group>
                        <Form.Group className = "Form" controlId = "FormBox-Password"> {/* This is the actual box */}
                            <Form.Label>Password</Form.Label>
                            <Form.Control value = {password} type="password" onChange = {(e) => handlePasswordChange(e)}/> {/* This is the text inside box*/}
                        </Form.Group>
                    </Form>
                    
                    <button className = "login-card-btn" onClick= {() => resetValuesAndLogin(username, password)}>
                    Sign in with Kiwi
                    </button>

                   


                </div>
            </div>


        </div>
        </>
    )
}

export default LoginPage