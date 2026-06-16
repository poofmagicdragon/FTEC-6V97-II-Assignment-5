import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DeletePortfolioModal = ({ show, portfolio_id, onDelete, onClose }) => {
    // const [error, setError] = useState('')
    // const [deleting, setDeleting] = useState(false)

    // async function handleConfirm() {
    //     setDeleting(true)
    //     try {
    //         await onDelete()
    //         setError('')
    //     }
    //     catch (err) {
    //         setError
    //     }
    // }




    return (
        <>
        <div 
        style = {{ display: 'block', position: 'initial'}}>
            <Modal show = {show}>
                <Modal.Header>
                    <Modal.Title>Are you sure you want to delete this portfolio?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>This action is irreversible.  Please make sure you want to proceed.</p>
                </Modal.Body>
                

                <Modal.Footer>
                    <Button variant = "danger" onClick = {() => onDelete(portfolio_id)}>Yes</Button>
                    <Button variant ="secondary" onClick = {onClose}>No</Button>
                </Modal.Footer>
            </Modal>
        </div>
        
        
        </>
    )
}

export default DeletePortfolioModal

