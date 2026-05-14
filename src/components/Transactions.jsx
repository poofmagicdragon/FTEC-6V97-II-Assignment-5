import { Table } from 'react-bootstrap'




const Transactions = ({portfolio, portfolioSecurity}) => {    
    if (!portfolio) {
        return (
            <div style={{ margin: '25px' }}>
                <p className="text-muted">No portfolio selected.</p>
            </div>
        )
    }
    console.log(
        `Transactions: ${JSON.stringify(portfolioSecurity)} Portfolio Name: ${portfolio?.name}`
    )

    return (
        <div style={{ margin: '25px' }}>
            <div className="d-flex justify-content-between align-items center mb-3">
                <div>
                    <h5 className="mb-0">{portfolio?.name}</h5>
                    {portfolio?.description && (
                        <small className="text-muted">{portfolio.description}</small>
                    )}
                </div>
            </div>

            {(!Array.isArray(portfolioSecurity) || portfolioSecurity.length === 0) ? (
                <p className="text-muted">
                    No transactions yet. Use the Trade tab to buy securities.
                </p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Order Type</th>
                            <th>Ticker</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Time Stamp</th>
                        </tr>
                    </thead>
                    <tbody>
                    {portfolioSecurity.map(t => (
                            <tr key={t.id}>
                                <td className="fw-bold">{t.transaction_type}</td>
                                <td>{t.ticker}</td>
                                <td>{t.quantity}</td>
                                <td>{t.price}</td>
                                <td>{t.date_time}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Transactions