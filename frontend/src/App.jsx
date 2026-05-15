import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import './App.css';
import LoginPage from './components/LoginPage';
import DashboardContainer from './components/DashboardContainer';
import { exchangeCodeForToken, getAccessToken } from './cognito';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authError, setAuthError] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  // Objective: run a function everytime this component renders
  // in order to do that we need to use another react hook called useEffect
  // useState -> create variables that react looks out for when their values change the component re-renders
  // useEffect -> calls a function anytime the component renders
  // useEffect(() => {}) // call this callback function after EVERY render
  // useEffect(() => {}, []) // call this callback function after the first render
  // useEffect(() => {}, [authError]) // call this callback function everytime authError changes



  useEffect(() => {
      setLoadingAuth(true)


      // look at the URL and check whether there is a param called code
      const params = new URLSearchParams(window.location.search)
      const code = params.get('code') // if the params have code parameter then it will get the value otherwise undefined

      // if code is undefined it means there is no auth code provided from cognito
      if (code) {
        exchangeCodeForToken(code)
          .then(() => {
            setIsLoggedIn(true)
            setAuthError(null)
            window.history.replaceState({}, document.title, "/")
            //navigate("/portfolios")
          })
          .catch(() => {
            setIsLoggedIn(false)
            setAuthError("Authentication Failed")
          })
          .finally(() => setLoadingAuth(false))
      } 
      else {
        if (getAccessToken()) {
          setIsLoggedIn(true)
        }
        else {// this else statement is so the error alert doesn't pop up when you log out
          setIsLoggedIn(false)
          setAuthError(null) 
        }
        setLoadingAuth(false)
      }
    }, []) // call this callback function after the FIRST render

  //The app component needs to remember whether the user is logged in or not
  // if the user is not logged in we will render the loginpage
  // if the user is logged in we will render the Navbar and Dashboard


  
  if (!isLoggedIn && !loadingAuth) {
    return <LoginPage onAuthError = {authError}/>
  }

  return (
    <>

    <div className = "app">
      <Navbar bg = "dark" variant = "dark" expand = "lg">
        <Container>
          <Navbar.Brand href = "#">Kiwi</Navbar.Brand>
          <Navbar.Toggle aria-controls = "main-nav" />
          <Navbar.Collapse id = "main-nav">
            <Nav className = "ms-auto">
              <Button variant = "outline-light" size = "sm" onClick = {() => setIsLoggedIn(false)}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <DashboardContainer/>
    </div>
 
    </>

  )
}

export default App
