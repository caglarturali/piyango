/**
 * Home page.
 */
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { DrawsItem } from '@caglarturali/piyango-common';
import Main from '../src/layouts/Main';
import Home from '../src/views/Home';
import API from '../src/services/API';

export interface HomePageProps {
  data: DrawsItem[];
}

const HomePage: NextPage<HomePageProps> = ({ data }) => {
  return (
    <Main contentTitle="Ana Sayfa">
      <Home draws={data} />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await API.getLatestDraws();
  return { props: { data } };
};

export default HomePage;
