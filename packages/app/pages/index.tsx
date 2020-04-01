import React from 'react';
import fetch from 'node-fetch';
import { GetServerSideProps, NextPage } from 'next';
import { DrawsItem } from '@caglarturali/piyango-common';
import MainLayout from '../src/layouts/MainLayout';
import HomeView from '../src/views/HomeView';
import SectionHeader from '../src/components/SectionHeader';
import { API } from '../src/shared';

export interface NextPageProps {
  data: DrawsItem[];
}

const Home: NextPage<NextPageProps> = ({ data }) => {
  return (
    <MainLayout contentTitle="Ana Sayfa">
      <SectionHeader title="Son Çekilişler" />
      <HomeView draws={data} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${API}/draws`);
  const data = (await res.json()) as DrawsItem[];

  return { props: { data } };
};

export default Home;
