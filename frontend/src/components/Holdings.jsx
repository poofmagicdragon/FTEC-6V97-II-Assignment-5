import { Table } from 'react-bootstrap'

const Holdings = ({ portfolio, holdings }) => {

    if (!portfolio) {
        return (
            <div style={{ margin: '25px' }}>
                <p className="text-muted">No portfolio selected.</p>
            </div>
        )
    }

    console.log(
        `Holdings: ${JSON.stringify(holdings)} Portfolio Name: ${portfolio?.name}`
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

            {holdings.length === 0 ? (
                <p className="text-muted">
                    No holdings yet. Use the Trade tab to buy securities.
                </p>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Ticker</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {holdings.map((h) => (
                            <tr key={h.id}>
                                <td className="fw-bold">{h.ticker}</td>
                                <td>{h.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Holdings
