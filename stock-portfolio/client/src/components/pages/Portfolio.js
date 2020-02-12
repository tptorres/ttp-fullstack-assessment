import React, {Fragment} from 'react';
import BuyStock from '../stocks/BuyStock';

const Portfolio = () => {
  return (
    <Fragment>
      <h1>Portfolio</h1>
      <div className='wrapper'>
        <div className='vert-line' />
        <BuyStock />
      </div>
    </Fragment>
  );
};

export default Portfolio;
