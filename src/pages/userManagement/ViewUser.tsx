// import React from 'react';

// const ViewUser = ({ user, setOpenViewPage }) => {
//   return (
//     <>
//       <div className='p-2'>
//         <div className='grid grid-cols-2 gap-4'>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Name</h3>
//             <span className='text-sm'>{user?.name}</span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Email</h3>
//             <span className='text-sm'>{user?.email}</span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Role</h3>
//             <span className='text-sm'>{user?.role}</span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Experience</h3>
//             <span className='text-sm'>{user?.experience} years</span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Status</h3>
//             <span className='text-sm capitalize'>{user?.status}</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewUser;



// import React, { useEffect, useState } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import { UsersList } from '@/Api/Query'; // ✅ same query

// const ViewUser = ({ user, setOpenViewPage }) => {
//   const [detailedUser, setDetailedUser] = useState(user); // fallback to props initially

//   const [fetchUsers, { data }] = useLazyQuery(UsersList, {
//     fetchPolicy: 'network-only',
//   });

//   useEffect(() => {
//     // If the user has an email or unique identifier, use it to filter API response
//     if (user?.email) {
//       fetchUsers();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (data?.usersList?.data?.length) {
//       const matchedUser = data.usersList.data.find(
//         (u) => u.email === user.email
//       );
//       if (matchedUser) {
//         setDetailedUser(matchedUser);
//       }
//     }
//   }, [data, user]);

//   return (
//     <>
//       <div className='p-2'>
//         <div className='grid grid-cols-2 gap-4'>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Name</h3>
//             <span className='text-sm'>
//               {detailedUser?.firstName} {detailedUser?.lastName}
//             </span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Email</h3>
//             <span className='text-sm'>{detailedUser?.email}</span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Role</h3>
//             <span className='text-sm'>
//               {detailedUser?.role_names?.[0] || 'N/A'}
//             </span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Experience</h3>
//             <span className='text-sm'>
//               {detailedUser?.experience || 0} years
//             </span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Status</h3>
//             <span className='text-sm capitalize'>
//               {detailedUser?.status || 'inactive'}
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewUser;


// import React, { useEffect, useState } from 'react';
// import { useLazyQuery } from '@apollo/client';
// import { UsersList } from '@/Api/Query'; // ✅ same query

// const ViewUser = ({ user, setOpenViewPage }) => {
//   const [detailedUser, setDetailedUser] = useState(user); // fallback to props initially

//   const [fetchUsers, { data }] = useLazyQuery(UsersList, {
//     fetchPolicy: 'network-only',
//   });

//   useEffect(() => {
//     // If the user has an email or unique identifier, use it to filter API response
//     if (user?.email) {
//       fetchUsers();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (data?.usersList?.data?.length) {
//       const matchedUser = data.usersList.data.find(
//         (u) => u.email === user.email
//       );
//       if (matchedUser) {
//         setDetailedUser(matchedUser);
//       }
//     }
//   }, [data, user]);

//   return (
//     <>
//       <div className='p-2'>
//         <div className='grid grid-cols-2 gap-4'>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Name</h3>
//             <span className='text-sm'>
//               {detailedUser?.firstName} {detailedUser?.lastName}
//             </span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Email</h3>
//             <span className='text-sm'>{detailedUser?.email}</span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Role</h3>
//             <span className='text-sm'>
//               {detailedUser?.role_names?.[0] || 'N/A'}
//             </span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Experience</h3>
//             <span className='text-sm'>
//               {detailedUser?.experience || 0} years
//             </span>
//           </div>
//           <div className='flex flex-col gap-1'>
//             <h3 className='text-base font-medium'>Status</h3>
//             <span
//               className={`px-2 py-1 text-xs rounded font-semibold w-fit capitalize ${
//                 detailedUser?.status === 'active'
//                   ? 'bg-green-100 text-green-700'
//                   : 'bg-red-100 text-red-700'
//               }`}
//             >
//               {detailedUser?.status || 'inactive'}
//             </span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ViewUser;



import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { UsersList } from '@/Api/Query';

const ViewUser = ({ user, setOpenViewPage }) => {
  const [detailedUser, setDetailedUser] = useState(user);

  const [fetchUsers, { data }] = useLazyQuery(UsersList, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (user?.email) {
      fetchUsers({
        variables: {
          page: 1,
          limit: 100,
          search: user.email,
        },
      });
    }
  }, [user]);

  useEffect(() => {
    if (data?.usersList?.data?.length) {
      const matched = data.usersList.data.find((u) => u.email === user.email);
      if (matched) setDetailedUser(matched);
    }
  }, [data, user]);

  return (
    <div className="p-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Full Name</h3>
          <span className="text-sm">
            {detailedUser?.firstName} {detailedUser?.lastName}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Email</h3>
          <span className="text-sm">{detailedUser?.email}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Mobile Number</h3>
          <span className="text-sm">{detailedUser?.mobileNo || 'N/A'}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Role</h3>
          <span className="text-sm">{detailedUser?.role_names?.[0] || 'N/A'}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">User Type</h3>
          <span className="text-sm capitalize">{detailedUser?.userType || 'N/A'}</span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Status</h3>
          <span
            className={`px-2 py-1 text-xs rounded font-semibold w-fit capitalize ${
              !detailedUser?.is_blocked
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {!detailedUser?.is_blocked ? 'active' : 'inactive'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Created At</h3>
          <span className="text-sm">
            {new Date(detailedUser?.created_at).toLocaleString()}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Updated At</h3>
          <span className="text-sm">
            {new Date(detailedUser?.updated_at).toLocaleString()}
          </span>
        </div>

        {/* <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Token</h3>
          <span className="text-sm break-all">
            {detailedUser?.token || 'N/A'}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-medium">Password</h3>
          <span className="text-sm italic text-gray-500">••••••••</span>
        </div> */}
      </div>
    </div>
  );
};

export default ViewUser;
