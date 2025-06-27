import React from 'react';

const ViewRoles = ({ roles, setOpenViewPage }) => {
  return (
    <>
      <div className='p-2'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-medium'>Name</h3>
            <span className='text-sm'>{roles?.name}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-medium'>Email</h3>
            <span className='text-sm'>{roles?.email}</span>
          </div>
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-medium'>Role</h3>
            <span className='text-sm'>{roles?.role}gg</span>
          </div>
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-medium'>Experience</h3>
            <span className='text-sm'>{roles?.experience} years</span>
          </div>
          <div className='flex flex-col gap-1'>
            <h3 className='text-base font-medium'>Status</h3>
            <span className='text-sm capitalize'>{roles?.status}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRoles;
