import './LoginPage.css'
import { Form, Alert } from 'react-bootstrap';
import { redirectToLogin } from '../cognito';

const LoginPage = ({onHandleLogin, onAuthError}) => {



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

                    
                    <button className = "login-card-btn" onClick= {redirectToLogin}>
                    Sign in with Kiwi
                    </button>

                   


                </div>
            </div>


        </div>
        </>
    )
}

export default LoginPage