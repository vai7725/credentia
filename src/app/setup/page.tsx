import React from 'react';
import WhoPage from './_components/who-page';
import { isSetupComplete } from '@/actions/setup';
import { redirect } from 'next/navigation';

const SetupPage = async () => {
  const setupData = await isSetupComplete();
  const setup = setupData.data as {
    isProfileComplete: boolean;
    activePage: number;
    role: string;
  };

  if (setup.isProfileComplete) {
    return redirect('/dashboard');
  }

  if (!setup.isProfileComplete && setup.role != 'NULL') {
    const url = '/setup/' + setup.role.toLowerCase();
    return redirect(url);
  }

  return (
    <>
      <WhoPage />
    </>
  );
};

export default SetupPage;
