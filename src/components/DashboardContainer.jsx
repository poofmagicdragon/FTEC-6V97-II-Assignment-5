import {useState} from 'react'
import {Container, Tabs, Tab } from 'react-bootstrap'
import PortfolioList from './PortfolioList'
import CreatePortfolioModal from './CreatePortfolioModal'
import Holdings from './Holdings'
import TradePanel from './TradePanel'

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
    const [selectedPortfolio, setSelectedPortfolio] = useState(-1)
    const [tradeError, setTradeError] = useState('')
    const [tradeSuccess, setTradeSuccess] = useState('')

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
        const portfolio = portfolios.filter(portfolio => portfolio.id === portfolio_id)
        if (portfolio.length != 1) {
            setTradeError('Portfolio with ID ' + portfolio_id + ' does not exist')
            return
        }
        // const portfolio_holdings = holdings.filter(holding => holding.portfolioId === portfolio_id)
        // const investmentExists = false
        // for (let i = 0; i < length(portfolio_holdings); i++) {
        //     const holding = portfolio_holdings[i]
        //     if (holding.ticker === ticker) {
        //         investmentExists
        //         holding.quantity = holding.quantity + quantity
        //     }
        //     if (!investmentExists) {
        //         portfolio_holdings.push({id: 100, portfolioID: portfolio_id, ticker: ticker, quantity: quantity})
        //     }
            setHoldings([...holdings, {id: 100, portfolioId: portfolio_id, ticker: ticker, quantity: quantity}])
            setTradeSuccess(`Successfully completed a buy order of ${quantity} shares of ${ticker}`)
        }
    
    
    const sell = (portfolio_id, ticker, quantity) => {
        const portfolio = portfolios.filter(portfolio => portfolio.id === portfolio_id)
        
    }

    return (
    <>
    <Container fluid className = "mt-4">
    <Tabs activeKey = {activeTab} defaultActiveKey = "portfolios" onSelect = {(k) => setActiveTab(k)} className = "navigationTab">
        <Tab eventKey = 'portfolios' title = 'Portfolios'>
            <PortfolioList portfolios = {portfolios} 
            onCreatePortfolio={() => setShowNewPortfolioModal(true)}
            onSelectPortfolio={handleSelectPortfolio}
            />
            <CreatePortfolioModal 
            showModal = {showCreatePortfolioModal} 
            onModalClose = {() => setShowNewPortfolioModal(false)}
            onCreate = {handleCreatePortfolio}
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

            />
        </Tab>
        <Tab eventKey = 'transactions' title = 'Transactions'><p>Transaction Placeholder</p></Tab>
    </Tabs>
    </Container>



    </>
    )
}



export default DashboardContainer