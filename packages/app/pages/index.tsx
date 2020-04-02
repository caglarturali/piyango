/**
 * Home page.
 */
import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { DrawsItem } from '@caglarturali/piyango-common';
import MainLayout from '../src/layouts/MainLayout';
import HomeView from '../src/views/HomeView';
import API from '../src/services/API';

export interface HomePageProps {
  data: DrawsItem[];
}

const HomePage: NextPage<HomePageProps> = ({ data }) => {
  return (
    <MainLayout contentTitle="Ana Sayfa">
      <HomeView draws={data} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await API.getLatestDraws();
  return { props: { data } };
};

export default HomePage;
