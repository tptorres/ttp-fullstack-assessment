import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

class BuyStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: '',
      price: 0
    };
  }

  fetchTickerPrice = async () => {
    const res = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.symbol}&interval=5min&outputsize=compact&apikey=PV28K0ZS6QT49SGT`
    );
    // formatting date for api call
    var date = new Date();
    const final = moment(date).format('YYYY-MM-DD');
    const cash = 5000;
    console.log(res.data['Time Series (Daily)'][final]['1. open']);
    var test = res.data['Time Series (Daily)'][final]['1. open'];
    if (test * 10 > cash) {
    } else {
    }
  };

  handleInput = e => {
    this.setState({
      symbol: e.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.fetchTickerPrice();
  };

  render() {
    return (
      <div>
        <form id='stock-form' onSubmit={this.handleSubmit}>
          <h1>Cash - $5000.00</h1>
          <input
            type='text'
            className='stock-control'
            placeholder='Ticker'
            value={this.state.symbol}
            onChange={this.handleInput}
          />
          <input type='text' className='stock-control' placeholder='Qty' />
          <input type='submit' className='stock-control-submit' value='Buy' />
        </form>
      </div>
    );
  }
}

export default BuyStock;
