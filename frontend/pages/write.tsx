import React from 'react';
import { NextPage } from 'next';
import { MainLayout } from '../layouts/MainLayout';
import { WriteForm } from '../components/WriteForm';

const Write: NextPage = () => {
  return (
    <MainLayout style={{ height: '100vh', backgroundColor: '#ffffff' }} hideComments hideMenu>
      <WriteForm />
    </MainLayout>
  );
};

export default Write;
