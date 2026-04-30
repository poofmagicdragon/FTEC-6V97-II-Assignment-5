import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import './App.css';
import LoginPage from './components/LoginPage';
import DashboardContainer from './components/DashboardContainer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [authError, setAuthError] = useState('')

  //The app component needs to remember whether the user is logged in or not
  // if the user is not logged in we will render the loginpage
  // if the user is logged in we will render the Navbar and Dashboard

  const handleLogin = (username, password) => {
    setAuthError('')
    console.log('the login callback is working')
    if (username === 'admin' && password === 'admin'){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
      // print alert to user
      setAuthError('Login failed. Wrong credentials!')
    } 
  }


  
  if (!isLoggedIn) {
    return <LoginPage onHandleLogin = {handleLogin} onAuthError = {authError}/>
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
