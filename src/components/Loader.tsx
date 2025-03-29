import React from 'react';

const Loader = () => {
  return (
    <div>
      <div className='flex justify-center items-center'>
        <div className='animate-spin rounded-full border-4 border-blue-600 border-t-transparent w-8 h-8'></div>
      </div>
    </div>
  );
};

export { Loader };
