import React from 'react';
import { NextPage } from 'next';
import { SectionHeader } from '@caglarturali/piyango-components';
import MainLayout from '../src/layouts/MainLayout';

const Home: NextPage = () => {
  return (
    <MainLayout contentTitle="Ana Sayfa">
      <SectionHeader title="Son Çekilişler" />
      <p>Hellooo!</p>
    </MainLayout>
  );
};

export default Home;
