// Write your code here

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CryptocurrenciesList from '../CryptocurrenciesList'
import './index.css'

class CryptocurrencyTracker extends Component {
  state = {
    isLoading: true,
    cryptocurrenciesData: [],
  }

  componentDidMount() {
    this.getCryptocurrencies()
  }

  getCryptocurrencies = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const fetchedData = await response.json()

    this.setState({
      cryptocurrenciesData: fetchedData.map(each => ({
        id: each.id,
        currencyName: each.currency_name,
        usdValue: each.usd_value,
        euroValue: each.euro_value,
        currencyLogo: each.currency_logo,
      })),
      isLoading: false,
    })
  }

  renderCryptoCurrenciesList = () => {
    const {cryptocurrenciesData} = this.state

    return <CryptocurrenciesList cryptocurrenciesData={cryptocurrenciesData} />
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Rings" color="#ffffff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? this.renderLoader() : this.renderCryptoCurrenciesList()}
      </div>
    )
  }
}

export default CryptocurrencyTracker
