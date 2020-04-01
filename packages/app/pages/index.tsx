/**
 * Home page.
 */
import React from 'react';
import moment from 'moment';
import fetch from 'isomorphic-unfetch';
import { GetServerSideProps, NextPage } from 'next';
import { DATE_FORMAT_FRIENDLY, DrawsItem } from '@caglarturali/piyango-common';
import MainLayout from '../src/layouts/MainLayout';
import HomeView from '../src/views/HomeView';
import SectionHeader from '../src/components/SectionHeader';
import { API } from '../src/shared';

export interface HomePageProps {
  data: DrawsItem[];
}

const HomePage: NextPage<HomePageProps> = ({ data }) => {
  return (
    <MainLayout contentTitle="Ana Sayfa">
      <SectionHeader title="Son Çekilişler" />
      <HomeView draws={data} />
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${API}/draws`);
  const data = (await res.json()) as DrawsItem[];

  data.sort((a, b) => {
    return (
      moment(b.data.cekilisTarihi, DATE_FORMAT_FRIENDLY).unix() -
      moment(a.data.cekilisTarihi, DATE_FORMAT_FRIENDLY).unix()
    );
  });

  return {
    props: {
      data,
    },
  };
};

export default HomePage;
