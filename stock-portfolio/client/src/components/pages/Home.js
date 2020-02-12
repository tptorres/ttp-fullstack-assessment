import React, {Fragment} from 'react';
import BuyStock from '../layout/BuyStock';

const Home = () => {
  return (
    <Fragment>
      <h1>HELLO</h1>
      <div className='wrapper'>
        <div className='vert-line' />
        <BuyStock />
      </div>
    </Fragment>
  );
};

export default Home;
