import { Row, Col, Card, Button } from 'react-bootstrap'

function PortfolioList ({ portfolios, onCreatePortfolio, onSelectPortfolio, onDelete }) {
    return (
        <>
        <div style = {{ margin: '10px'}}>
            <div className = "d-flex justify-content-between align-items-center mb-3">
                <h5 className = "mb-0">Your Portfolios</h5>
                <Button variant = "success" size = "sm" onClick = {() => onCreatePortfolio()}>
                    + New Portfolio
                </Button>
            </div>
            {portfolios.length === 0 && (
                <p className = "text-muted">No portfolios yet. Create one to get started.</p>
            )}
        <Row xs={1} md={2} lg={3} className = "g-3">
            {portfolios.map(portfolio => (
                <Col key={portfolio.id}>
                    <Card
                    className = "h-100"
                    // border = {portfolio.id === selectedPortfolioID ? 'success' : undefined}
                    style = {{ cursor: 'pointer' }}
                    >
                        <Card.Body>
                            <Card.Title>{portfolio.name}</Card.Title>
                            <Card.Text className = "text-muted">{portfolio.description || 'No description.'}</Card.Text>
                        </Card.Body>
                        <Card.Footer className = "text-end">
                            <Button variant = "danger" 
                            size = "sm" 
                            onClick = {() => onDelete(portfolio.id)}
                            style = {{marginRight: '5px'}}>
                                Delete
                            </Button>
                            <Button variant = "outline-success" size = "sm" onClick = {() => onSelectPortfolio(portfolio.id)}>
                                View Holdings
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
            ))}
        </Row>


        </div>
        
        </>
    )
}

export default PortfolioList

