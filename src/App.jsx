import { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
//import './App.css';
import LoginPage from './components/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  if (!isLoggedIn) {
    return <LoginPage></LoginPage>
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
              <Button variant = "outliine-light" size = "sm">
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
 
    </>

  )
}

export default App
