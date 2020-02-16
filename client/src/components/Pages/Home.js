import React, { Fragment } from 'react';

import { Navbar } from '../Parts/Navbar';
import { Layout } from '../Parts/Layout';
import { Register } from '../Parts/Register';

// import { Hello } from '../Parts/Hello.tsx';
import './home.scss';
export const Home = () => {
  return (
    <div className="homedir">
      <Layout>
        <Navbar>
          <Register />
        </Navbar>
        <iframe className="iframe" src="https://fervent-brahmagupta-e3b96a.netlify.com" frameBorder="0"></iframe>
      </Layout>
    </div>
  );
};
