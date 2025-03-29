import React from 'react';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { moduleList } from '@/lib/constants';
import Accordion from '@/components/Accordion';
import {
  getUserProgress,
} from '@/actions/user';
import { CertificateButton } from '@/components/CerificateButton';

const DashboardHome = async () => {


  const session = await auth();
  if (!session) redirect('/login');


  let moduleNumber: number | null = null;
  if (session.user && session.user.email) {
    moduleNumber = await getUserProgress(session.user.email);
  } else {
    redirect('/login');
  }

  
  return (
    <div>
      <div className='w-full'>
        <Accordion
          items={moduleList}
          moduleNumber={moduleNumber}
        />
      </div>
      <div className='grid grid-cols-1 my-8'>
        <CertificateButton email={session.user.email} module={moduleNumber} />
      </div>
    </div>
  );
};

export default DashboardHome;
