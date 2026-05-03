import {useState} from 'react'
import {Container, Tabs, Tab } from 'react-bootstrap'
import PortfolioList from './PortfolioList'
import CreatePortfolioModal from './CreatePortfolioModal'
import Holdings from './Holdings'
import TradePanel from './TradePanel'
import DeletePortfolioModal from './DeletePortfolioModal'

const DashboardContainer = () => {
    const [portfolios, setPortfolio] = useState([
    {id: 1, name: 'Growth Fund ', description: 'A fund for growth picks'},
    {id: 2, name: 'Tech Fund ', description: 'A fund for tech picks'},
    {id: 3, name: 'Equity Fund ', description: 'A fund for equity picks'}
    ])

    const [holdings, setHoldings] = useState([
        {id: 1, portfolioId: 1, ticker: 'AAPL', quantity: 10},
        {id: 2, portfolioId: 1, ticker: 'MSFT', quantity: 5},
    ])


    // const [transactions, setTransactions] = useState([
    //     { id: 1, portfolioId: 1, ticker: 'AAPL', type: 'buy', quantity: 10, date: '2026-03-01'},
    //     { id: 2, portfolioId: 1, ticker: 'MSFT', type: 'buy', quantity: 5, date: '2026-03-10'}
    // ])


    const [activeTab, setActiveTab] = useState('portfolios')
    const [showCreatePortfolioModal, setShowNewPortfolioModal] = useState(false)
    const [showDeletePortfolioModal, setShowDeletePortfolioModal] = useState(false)
    const [selectedPortfolio, setSelectedPortfolio] = useState(-1)
    const [tradeError, setTradeError] = useState('')
    const [tradeSuccess, setTradeSuccess] = useState('')

    const handleDeletePortfolioButtonClick = (portfolio_id) => {
        const portfolio = portfolios.find(p => p.id === portfolio_id)
        setSelectedPortfolio(portfolio)
        setShowDeletePortfolioModal(true)
    }

    const removePortfolio = (portfolio_id) => {
        setPortfolio(portfolios.filter(portfolio => portfolio.id !== portfolio_id))
        setHoldings(holdings.filter(holding => holding.portfolioId !== portfolio_id))
        setActiveTab('portfolios')
        setShowDeletePortfolioModal(false)
    }



    const handleCreatePortfolio = (name, description) => {
        setPortfolio([...portfolios, {id: 4, name: name, description: description}])
        setShowNewPortfolioModal(false)
    }
    // const [holdings, setHoldings] = useState([
    //     {id:1, portfolioId: 1, ticker: 'AAPL'}
    // ])

    const handleSelectPortfolio = (portfolio_id) => {
        const portfolio = portfolios.filter(portfolio => portfolio.id === portfolio_id)
        setSelectedPortfolio(portfolio[0])
        setActiveTab('holdings')
    }

    const buy = (portfolio_id, ticker, quantity) => {
        // check if the portfolio exists
        const portfolio = portfolios.filter(portfolio => portfolio.id === portfolio_id)
        if (portfolio.length != 1) {
            setTradeError('Portfolio with ID ' + portfolio_id + ' does not exist')
            return
        }
        // filter the holdings so only the holdings related to the portfolio are listed
        const portfolio_holdings = holdings.filter(holding => holding.portfolioId === portfolio_id)
        
        let investmentExists = false
        // loop through holdings
        for (let i = 0; i < portfolio_holdings.length; i++) {
            const holding = portfolio_holdings[i]
        // check whether the holdings already contain the stock the user wants to buy
            if (holding.ticker === ticker.toUpperCase()) {
                investmentExists = true
                setHoldings(holdings.map(h => h.id === holding.id ? {...h, quantity: h.quantity + Number(quantity)} : h))
            }
        // if the holdings do not contain the stock the user wants, create a new line and add the investment
            if (!investmentExists) {
                setHoldings([...holdings, {
                    id: Date.now(), portfolioId: portfolio_id, ticker, quantity: Number(quantity)
                }])
            }
            setTradeSuccess(`Successfully completed a buy order of ${quantity} shares of ${ticker}`)
        }
    }

        const sell = (portfolio_id, ticker, quantity) => {
        // check if the portfolio exists
        const portfolio = portfolios.filter(portfolio => portfolio.id === portfolio_id)
        if (portfolio.length != 1) {
            setTradeError('Portfolio with ID ' + portfolio_id + ' does not exist')
            return
        }
        // filter the holdings so only the holdings related to the portfolio are listed
        const portfolio_holdings = holdings.filter(holding => holding.portfolioId === portfolio_id)
        
        let investmentExists = false
        // loop through holdings
        for (let i = 0; i < portfolio_holdings.length; i++) {
            const holding = portfolio_holdings[i]
        // check whether the holdings already contain the stock the user wants to sell
            if (holding.ticker === ticker.toUpperCase()) {
                investmentExists = true
                if (holding.quantity >= quantity){

                    setHoldings(holdings.map(h => h.id === holding.id ? {...h, quantity: h.quantity - Number(quantity)} : h))
                    setTradeSuccess(`Successfully completed a sell order of ${quantity} shares of ${ticker}`)
                }
                else {
                    // error message
                    setTradeError('You do not have enough shres to sell this stock')
                }
            }
        // if the holdings do not contain the stock, send different message
            if (!investmentExists) {
                setTradeError(`You do not own any shares of ${ticker}`)
                // insert error here
            }

        }
    }
    

    return (
    <>
    <Container fluid className = "mt-4">
    <Tabs activeKey = {activeTab} defaultActiveKey = "portfolios" onSelect = {(k) => setActiveTab(k)} className = "navigationTab">
        <Tab eventKey = 'portfolios' title = 'Portfolios'>
            <PortfolioList 
            portfolios = {portfolios} 
            onCreatePortfolio={() => setShowNewPortfolioModal(true)}
            onSelectPortfolio={handleSelectPortfolio}
            handleDeletePortfolioButtonClick = {handleDeletePortfolioButtonClick}
            />
            <CreatePortfolioModal 
            showModal = {showCreatePortfolioModal} 
            onModalClose = {() => setShowNewPortfolioModal(false)}
            onCreate = {handleCreatePortfolio}
            />    
            <DeletePortfolioModal
            show = {showDeletePortfolioModal}
            portfolio_id = {selectedPortfolio?.id}
            onDelete = {removePortfolio}
            onClose = {() => setShowDeletePortfolioModal(false)}
            />
        </Tab>
        <Tab eventKey = 'holdings' title = 'Holdings'>
            <Holdings 
                portfolio = {selectedPortfolio}
                holdings = {holdings.filter(holding => holding.portfolioId === selectedPortfolio.id)}
            />
        </Tab>
        <Tab eventKey = 'trade' title = 'Trade'>
            <TradePanel
                portfolio = {selectedPortfolio}
                holdings = {holdings.filter(holding => holding.portfolioId === selectedPortfolio.id)}
                onBuy = {buy}
                error = {tradeError}
                success = {tradeSuccess}
                onSell = {sell}

            />
        </Tab>
        <Tab eventKey = 'transactions' title = 'Transactions'><p>Transaction Placeholder</p></Tab>
    </Tabs>
    </Container>



    </>
    )
}



export default DashboardContainer