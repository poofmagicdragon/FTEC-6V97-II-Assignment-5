import {useState, useEffect} from 'react'
import {Container, Tabs, Tab, Spinner, Alert } from 'react-bootstrap'
import { getAccessToken } from '../cognito'
import PortfolioList from './PortfolioList'
import CreatePortfolioModal from './CreatePortfolioModal'
import Holdings from './Holdings'
import TradePanel from './TradePanel'
import DeletePortfolioModal from './DeletePortfolioModal'
import Transactions from './Transactions'

const DashboardContainer = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [portfolios, setPortfolios] = useState([])
    const [refreshPortfolioList, setRefreshPortfolioList] = useState(0)
    const [activeTab, setActiveTab] = useState('portfolios')
    const [portfolioToDelete, setPortfolioToDelete] = useState(null)


    const [showCreatePortfolioModal, setShowNewPortfolioModal] = useState(false)
    const [showDeletePortfolioModal, setShowDeletePortfolioModal] = useState(false)
    
    const [selectedPortfolio, setSelectedPortfolio] = useState(null)
    const [selectedPortfolioId, setSelectedPortfolioId] = useState(null)

    const [tradeError, setTradeError] = useState('')
    const [tradeSuccess, setTradeSuccess] = useState('')
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    const [holdings, setHoldings] = useState([])

    const [transactions, setTransactions] = useState([]);

    const [portfolioErrorAlert, setPortfolioErrorAlert] = useState('')
    const [showPortfolioErrorAlert, setShowPortfolioErrorAlert] = useState(false)
    const [portfolioSuccessAlert, setPortfolioSuccessAlert] = useState('')
    const [showPortfolioSuccessAlert, setShowPortfolioSuccessAlert] = useState(false)




    // const [portfolios, setPortfolio] = useState([
    // {id: 1, name: 'Growth Fund ', description: 'A fund for growth picks'},
    // {id: 2, name: 'Tech Fund ', description: 'A fund for tech picks'},
    // {id: 3, name: 'Equity Fund ', description: 'A fund for equity picks'}
    // ])

    // this hook allows us to execute code when certain conditions apply.
    // first arg: a function that will be executed when the conditions apply.
    // second arg: an array of state variables.  
    // If the second arg is left blank, then the function will exectue on every render.
    // if the 2nd arg is an empty array [], this function will be called exactly once on the component's first render

    // side note: everytime the data in the component state change the component will re-render

        // this is where we will fetch the portfolios from the backend
        // before we start the fetch, we need to add some visual indicator to the user that some work is happening (e.g., loading icon)
        //setIsLoading(true)
        // to prepare for the backend call we need to get the token from the brwoser session storage
        //const token = getAccessToken()
        // fetch the data from the backend.  To do that we'll use the built in fetch function.
        // fetch function takes in a url string as a first parameter and a options dictionary as a second parameter
        // the fetch function is async function, that means when it is called the JS interpreter sends a request to execute the function which happens async.  The js code will continue to execute after the async function ...

    //     try{
            
    //         const res =  await fetch('http://127.0.0.1:5000/portfolios/all',{
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         } )

    //         if (!res.ok)
    //             // if the res is not OK, send error alert


    //     }

    useEffect(() => {
    const token = getAccessToken()
    if (!token) {
        setIsLoading(false)
        return
    }

    setIsLoading(true)

    fetch('/api/portfolios/', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {
                setErrorMessage(err.error_message)
                setShowErrorAlert(true)
            })
        }
        return res.json()
    })
    .then(data => {
        if (data) setPortfolios(data)
    })
    .catch(err => {
        setErrorMessage(err.message)
        setShowErrorAlert(true)
    })
    .finally(() => setIsLoading(false))




}, [refreshPortfolioList])


    // for fetching the holdings

    useEffect(() => {
    if (!selectedPortfolio) return;
    const token = getAccessToken();
    if (!token) return;

    fetch(`/api/portfolios/${selectedPortfolio.id}/holdings`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {
                setErrorMessage(err.error_message || "Failed to fetch holdings");
                setShowErrorAlert(true);
            });
        }
        return res.json();
    })
    .then(data => {
        if (data) setHoldings(data);
    })
    .catch(err => {
        setErrorMessage(err.message);
        setShowErrorAlert(true);
    });

    // this next part is for updating the transactions

    if (!selectedPortfolio) return;
    handlePortfolioSecurity(selectedPortfolio.id);

}, [selectedPortfolio, refreshPortfolioList]);   


    // for fetching transactions
async function handlePortfolioSecurity(portfolio_id) {
    const token = getAccessToken();
    if (!token) return;

    setIsLoading(true);

    fetch(`/api/portfolios/${portfolio_id}/transactions`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {
                setErrorMessage(err.error_message);
                setShowErrorAlert(true);
            });
        }
        return res.json();
    })
    .then(data => {
        if (data) setTransactions(data);   
    })
    .finally(() => setIsLoading(false));
}




// }, [refreshTransactionList])

    

    // for fetching the portfolios:
    

    // const [holdings, setHoldings] = useState([
    //     {id: 1, portfolioId: 1, ticker: 'AAPL', quantity: 10},
    //     {id: 2, portfolioId: 1, ticker: 'MSFT', quantity: 5},
    // ])


    
    // const [transactions, setTransactions] = useState([
    //     { id: 1, portfolioId: 1, ticker: 'AAPL', type: 'buy', quantity: 10, date: '2026-03-01'},
    //     { id: 2, portfolioId: 1, ticker: 'MSFT', type: 'buy', quantity: 5, date: '2026-03-10'}
    // ])




    // const removePortfolio = (portfolio_id) => {
    //     setPortfolios(portfolios.filter(portfolio => portfolio.id !== portfolio_id))
    //     setHoldings(holdings.filter(holding => holding.portfolioId !== portfolio_id))
    //     setActiveTab('portfolios')
    //     setShowDeletePortfolioModal(false)
    // }

    async function handleDeletePortfolio(id) {
        if (!id) return; // prevents silent failure

        const token = getAccessToken()
        const res = await fetch(`/api/portfolios/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })


        if (!res.ok) {
        const data = await res.json();
        setShowPortfolioErrorAlert(true)
        setPortfolioErrorAlert(`Could not delete portfolio due to: ${data.error_message}`)
        setShowDeletePortfolioModal(false)
        return;
        }
        setShowPortfolioSuccessAlert(true)
        setPortfolioSuccessAlert("Succesfully Deleted Portfolio")
        setShowDeletePortfolioModal(false)
        setPortfolioToDelete(null)
        setRefreshPortfolioList(i => i + 1)
    }





    async function handleCreatePortfolio(name, description) {
        const token = getAccessToken()
        const res = await fetch('/api/portfolios/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({name, description })
        })
        if (!res.ok) {
            const error = await res.json()
            throw new Error(error.error_message)
        }
        // if no error then we want to reload the list of portfolios so that the new portfolio shows
        setRefreshPortfolioList(i => i + 1)
        setShowNewPortfolioModal(false)
    }

    async function handleBuy(portfolio_id, ticker, quantity) {
        const token = getAccessToken()
        const res = await fetch('/api/trades/buy',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ portfolio_id, ticker, quantity })
        })
        if (!res.ok) {
            const data = await res.json()
            setErrorMessage(data.error_message)
            setShowErrorAlert(true);
        }
        setRefreshPortfolioList(i => i + 1)
        setTradeSuccess(`Successfully bought ${quantity} share(s) of ${ticker}`)
        setShowSuccessAlert(true)
    }

    async function handleSell(portfolio_id, ticker, quantity, sale_price) {
        const token = getAccessToken()
        const res = await fetch('/api/trades/sell',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ portfolio_id, ticker, quantity, sale_price })
        })
        if (!res.ok) {
            const data = await res.json()
            setErrorMessage(data.error_message)
            setShowErrorAlert(true);
        }
        setRefreshPortfolioList(i => i + 1)
        setTradeSuccess(`Successfully shared ${quantity} share(s) of ${ticker} at a price of $${sale_price}`)
        setShowSuccessAlert(true)
    }



    const handleSelectPortfolio = (portfolio_id) => {
        const portfolio = portfolios.filter(portfolio => portfolio.id === portfolio_id)
        setSelectedPortfolio(portfolio[0])
        setActiveTab('holdings')
    }


    async function handlePortfolioSecurity(portfolio_id){
    const token = getAccessToken()
    if (!token) {
        setIsLoading(false)
        return
    }

    setIsLoading(true)

    fetch(`/api/portfolios/${portfolio_id}/transactions`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(err => {
                setErrorMessage(err.error_message)
                setShowErrorAlert(true)
            })
        }
        return res.json()
    })
    .then(data => {
        if (data) setTransactions(data)
    })
    .catch(err => {
        setErrorMessage(err.message)
        setShowErrorAlert(true)
    })
    .finally(() => setIsLoading(false))


    }


    // const buy = (portfolio_id, ticker, quantity) => {
    //     // check if the portfolio exists
    //     const portfolio = portfolios.filter(portfolio => portfolio.id === portfolio_id)
    //     if (portfolio.length != 1) {
    //         setTradeError('Portfolio with ID ' + portfolio_id + ' does not exist')
    //         return
    //     }
    //     // filter the holdings so only the holdings related to the portfolio are listed
    //     const portfolio_holdings = holdings.filter(holding => holding.portfolioId === portfolio_id)
        
    //     let investmentExists = false
    //     // loop through holdings
    //     for (let i = 0; i < portfolio_holdings.length; i++) {
    //         const holding = portfolio_holdings[i]
    //     // check whether the holdings already contain the stock the user wants to buy
    //         if (holding.ticker === ticker.toUpperCase()) {
    //             investmentExists = true
    //             setHoldings(holdings.map(h => h.id === holding.id ? {...h, quantity: h.quantity + Number(quantity)} : h))
    //         }
    //     // if the holdings do not contain the stock the user wants, create a new line and add the investment
    //         if (!investmentExists) {
    //             setHoldings([...holdings, {
    //                 id: Date.now(), portfolioId: portfolio_id, ticker, quantity: Number(quantity)
    //             }])
    //         }
    //         setTradeSuccess(`Successfully completed a buy order of ${quantity} shares of ${ticker}`)
    //     }
    // }

    //     const sell = (portfolio_id, ticker, quantity) => {
    //     // check if the portfolio exists
    //     const portfolio = portfolios.filter(portfolio => portfolio.id === portfolio_id)
    //     if (portfolio.length != 1) {
    //         setTradeError('Portfolio with ID ' + portfolio_id + ' does not exist')
    //         return
    //     }
    //     // filter the holdings so only the holdings related to the portfolio are listed
    //     const portfolio_holdings = holdings.filter(holding => holding.portfolioId === portfolio_id)
        
    //     let investmentExists = false
    //     // loop through holdings
    //     for (let i = 0; i < portfolio_holdings.length; i++) {
    //         const holding = portfolio_holdings[i]
    //     // check whether the holdings already contain the stock the user wants to sell
    //         if (holding.ticker === ticker.toUpperCase()) {
    //             investmentExists = true
    //             if (holding.quantity >= quantity){

    //                 setHoldings(holdings.map(h => h.id === holding.id ? {...h, quantity: h.quantity - Number(quantity)} : h))
    //                 setTradeSuccess(`Successfully completed a sell order of ${quantity} shares of ${ticker}`)
    //             }
    //             else {
    //                 // error message
    //                 setTradeError('You do not have enough shres to sell this stock')
    //             }
    //         }
    //     // if the holdings do not contain the stock, send different message
    //         if (!investmentExists) {
    //             setTradeError(`You do not own any shares of ${ticker}`)
    //             // insert error here
    //         }

    //     }
    // }
    
    // const selectedPortfolio = portfolios.find(p => p.id === selectedPortfolioId) || null
    // const selectedHoldings = holdings.filter(
    //     h => h.PortfolioId === selectedPortfolioId
    // )


    return (
    <>
    {
        isLoading && (
            <div style = {{
                position: 'fixed', inset: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 9999,
            }}>
                <Spinner animation = "border" variant = "dark" />
            </div>
        )
    }
    {
        !isLoading && (
            <Container fluid className = "mt-4">
                {
                    showErrorAlert && (
                        <Alert variant = "danger" onClose={() => setShowErrorAlert(false)} dismissible>
                            <Alert.Heading>Error</Alert.Heading>
                            <p>{errorMessage}</p>
                        </Alert>
                    )
                }
                {
                    showSuccessAlert && (
                        <Alert variant = "success" onClose={() => setShowSuccessAlert(false)} dismissible>
                            <Alert.Heading>Success</Alert.Heading>
                            <p>{tradeSuccess}</p>
                        </Alert>
                    )
                }
                {
                    showPortfolioErrorAlert && (
                        <Alert variant = "danger" onClose={() => setShowPortfolioErrorAlert(false)} dismissible>
                            <Alert.Heading>Error</Alert.Heading>
                            <p>{portfolioErrorAlert}</p>
                        </Alert>
                    )
                }
                {
                    showPortfolioSuccessAlert && (
                        <Alert variant = "success" onClose={() => setShowPortfolioSuccessAlert(false)} dismissible>
                            <Alert.Heading>Success</Alert.Heading>
                            <p>{portfolioSuccessAlert}</p>
                        </Alert>
                    )
                }
                <Tabs activeKey = {activeTab} defaultActiveKey = "portfolios" onSelect = {(k) => setActiveTab(k)} className = "navigationTab">
                    <Tab eventKey = 'portfolios' title = 'Portfolios'>
                        <PortfolioList 
                        portfolios = {portfolios} 
                        onCreatePortfolio={() => setShowNewPortfolioModal(true)}
                        onSelectPortfolio={handleSelectPortfolio}
                        onDelete = {(id) => {setPortfolioToDelete(id); setShowDeletePortfolioModal(true);}}
                        />
                        <CreatePortfolioModal 
                        showModal = {showCreatePortfolioModal} 
                        onModalClose = {() => setShowNewPortfolioModal(false)}
                        onCreate = {handleCreatePortfolio}
                        portfolios={portfolios}
                        />    
                        <DeletePortfolioModal
                        show={showDeletePortfolioModal}
                        portfolio_id={portfolioToDelete}
                        onDelete={handleDeletePortfolio}
                        onClose={() => {
                            setShowDeletePortfolioModal(false)
                            setPortfolioToDelete(null)
                        }}
                        />

                    </Tab>
                    <Tab eventKey = 'holdings' title = 'Holdings'>
                        <Holdings 
                            portfolio = {selectedPortfolio}
                            holdings = {holdings.filter(holding => holding.portfolio_id === selectedPortfolio?.id)}
                        />
                    </Tab>
                    <Tab eventKey = 'trade' title = 'Trade'>
                        <TradePanel
                            portfolio = {selectedPortfolio}
                            holdings = {holdings.filter(holding => holding.portfolio_id === selectedPortfolio?.id)}
                            onBuy = {handleBuy}
                            // error = {tradeError}
                            // success = {tradeSuccess}
                            onSell = {handleSell}

                        />
                    </Tab>
                    <Tab eventKey = 'transactions' title = 'Transactions'>
                        <Transactions
                            portfolio = {selectedPortfolio}   
                            portfolioSecurity = {transactions}
                        />
                    </Tab>
                </Tabs>
                </Container>
        )
    }
    


    </>
    )
}



export default DashboardContainer








