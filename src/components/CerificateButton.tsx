'use client';

import React, { useTransition } from 'react';
import { toast } from 'react-toastify';
import { requestCertificate } from '@/actions/user';

const CertificateButton = ({
  email,
  module,
}: {
  email: string;
  module: number;
}) => {
  const [isPending, startTransition] = useTransition();

  const requestCompletionCertificate = () => {
    if (module < 9) {
      toast.error('You need to complete all modules to request a certificate.');
      return;
    } else {
      startTransition(async () => {
        try {
          await requestCertificate(email);
          toast.success('Request sent successfully');
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message);
          } else {
            toast.error('Error sending certificate request. Please try again.');
          }
        }
      });
    }
  };

  return (
    <button
      onClick={requestCompletionCertificate}
      disabled={module < 9 ? true : false}
      className={`py-3 rounded-xl ${module < 9 ? 'bg-gray-400 text-black cursor-not-allowed' : 'text-white font-bold bg-green-500 hover:bg-green-600 cursor-pointer'}`}
    >
      {isPending ? 'Sending Request...' : 'Request Certificate'}
    </button>
  );
};

export { CertificateButton };
