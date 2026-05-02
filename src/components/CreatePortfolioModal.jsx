import { useState } from 'react'
import { Modal, Form, Button, Alert } from 'react-bootstrap'

const CreatPortfolioModal = ({showModal, onModalClose, onCreate}) => {
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    
    const handleModalClose = () => {
        setError('')
        setName('')
        setDescription('')
        onModalClose()
    }

    const handleCreate = () => {
        onCreate(name, description)
        handleModalClose()
    }

    return(
    <>
    <Modal show={showModal}>
        <Modal.Header>
            <Modal.Title>New Portfolio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form id = "create-portfolio-form">
                <Form id = "create-portfolio-form">
                    <Form.Group className = "mb-3" controlId = "portfolioName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type = "text"
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                        autoFocus
                        />

                    </Form.Group>
                    <Form.Group contorlId="portfolioDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        as = "textarea"
                        rows = {3}
                        value = {description}
                        onChange = {e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant = "secondary" onClick = {() => handleModalClose()}>Cancel</Button>
            <Button variant = "success" onClick = {handleCreate}>Create</Button>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default CreatPortfolioModal