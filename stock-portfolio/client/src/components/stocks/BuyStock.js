import React, {Component} from 'react';
import axios from 'axios';

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
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.symbol}&apikey=PV28K0ZS6QT49SGT`
    );

    console.log(res.data);
    var test = res.data['Global Quote']['02. open'];
    console.log(test);
    var cash = 5000;
    /* if (test * 10 > cash) {
    } else {
    } */
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
