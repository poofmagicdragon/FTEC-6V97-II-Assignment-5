import {useState} from 'react'
import { Alert, Card, Row, Col, Form, Button } from 'react-bootstrap'

const TradePanel = ({portfolio, holdings, onBuy, onSell, error, success}) => {
    const [ticker, setTicker] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [sellPrice, setSellPrice] = useState(0)

    if (!portfolio) {
        return <p>Select a portfolio</p>
    }

    return(<>
    <div>
        <h5 className = "mb-3">{portfolio.name}</h5>

        {error && <Alert variant = "danger">{error}</Alert>}
        {success && <Alert variant = "success">{success}</Alert>}

        <Card style = {{ maxWidth: 400 }}>
            <Card.Body>
                <Form>
                    <Row className = "mb-3">
                        <Col>
                            <Form.Label>Ticker</Form.Label>
                            <Form.Control
                            type = "text"
                            placeholder = "e.g. AAPL"
                            value = {ticker}
                            onChange = {e => setTicker(e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                            type = "number"
                            min = "1"
                            placeholder = "e.g. 10"
                            value = {quantity}
                            onChange = {e => setQuantity(e.target.value)}
                            />                        
                        </Col>
                        <Col>
                            <Form.Label>Sell Price</Form.Label>
                            <Form.Control
                            type = "number"
                            min = "1"
                            placeholder = "e.g. 50"
                            value = {sellPrice}
                            onChange = {e => setSellPrice(e.target.value)}
                            />                        
                        </Col>
                    </Row>

                    <div className = "d-flex gap-2">
                        <Button variant="success" onClick = {() => onBuy(portfolio.id, ticker, quantity)}>
                            Buy
                        </Button>
                        <Button variant="danger" onClick = {() => onSell(portfolio.id, ticker, quantity, sellPrice)}>
                            Sell
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>

        {holdings.length > 0 && (
            <div className = "mt-4">
                <h6 className = "text-muted">Current Holdings</h6>
                <ul className = "list-unstyled">
                    {holdings.map(h => (
                        <li key = {h.id}>
                            <span className = "fw-bold">{h.ticker}</span>
                            <span className = "text-muted ms-2">{h.quantity} shares</span>
                        </li>
                    ))}
                </ul>
            </div>    
        )}
    </div>
    </>
    )

}

export default TradePanel