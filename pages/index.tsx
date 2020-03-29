import React from 'react';
import { NextPage } from 'next';
import MainLayout from '../src/layouts/MainLayout';

const Home: NextPage = () => {
  return (
    <MainLayout contentTitle="Ana Sayfa">
      <p>Hellooo!</p>
    </MainLayout>
  );
};

export default Home;
