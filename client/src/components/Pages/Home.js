import React, { Fragment } from 'react';

import { Navbar } from '../Parts/Navbar';
import { Layout } from '../Parts/Layout';
import { Register } from '../Parts/Register';

import { Hello } from '../Parts/Hello.tsx';
export const Home = () => {
  return (
    <div>
      <Layout>
        <Navbar />
        <Hello />
        <Register />
      </Layout>
    </div>
  );
};
