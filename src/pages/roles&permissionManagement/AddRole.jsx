// 'use client';

// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';

// const mockPermissions = [
//   { id: 1, name: 'Manage Users', group: 'User Management' },
//   { id: 2, name: 'View Reports', group: 'Analytics' },
//   { id: 3, name: 'Manage Candidates', group: 'Recruitment' },
//   { id: 4, name: 'Schedule Interviews', group: 'Recruitment' },
// ];

// const AddRole = ({ open, setOpen, onSuccess }) => {
//   const [name, setName] = useState('');
//   const [userType, setUserType] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedPermissions, setSelectedPermissions] = useState({});
//   const [selectAllPermissions, setSelectAllPermissions] = useState(false);

//   const groupedPermissions = mockPermissions.reduce((acc, perm) => {
//     if (!acc[perm.group]) acc[perm.group] = [];
//     acc[perm.group].push(perm);
//     return acc;
//   }, {});

//   const handlePermissionChange = (group, id) => {
//     setSelectedPermissions((prev) => {
//       const groupPerms = prev[group] || [];
//       return {
//         ...prev,
//         [group]: groupPerms.includes(id)
//           ? groupPerms.filter((permId) => permId !== id)
//           : [...groupPerms, id],
//       };
//     });
//   };

//   const handleSelectAllPermissions = () => {
//     if (selectAllPermissions) {
//       setSelectedPermissions({});
//     } else {
//       const all = {};
//       Object.entries(groupedPermissions).forEach(([group, perms]) => {
//         all[group] = perms.map((p) => p.id);
//       });
//       setSelectedPermissions(all);
//     }
//     setSelectAllPermissions(!selectAllPermissions);
//   };

//   const handleSelectGroup = (group) => {
//     const allSelected =
//       groupedPermissions[group].length === (selectedPermissions[group]?.length || 0);
//     setSelectedPermissions((prev) => ({
//       ...prev,
//       [group]: allSelected ? [] : groupedPermissions[group].map((p) => p.id),
//     }));
//   };

//   const handleSubmit = () => {
//     const formattedPermissions = Object.entries(selectedPermissions).map(([group, ids]) => ({
//       permission_group: group,
//       permissions: ids.map((id) => {
//         const perm = mockPermissions.find((p) => p.id === id);
//         return { id: perm.id, permissionname: perm.name };
//       }),
//     }));

//     console.log({ name, userType, description, permissions: formattedPermissions });
//     onSuccess?.();
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen} >
//       <DialogContent className="max-w-4xl w-full p-6 space-y-6 ">
//         <h2 className="text-2xl font-semibold">Add Role</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <Label>Name</Label>
//             <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter role name" />
//           </div>

//           <div>
//             <Label>User Type</Label>
//             <select
//               className="w-full border rounded-md px-3 py-2 text-sm"
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//             >
//               <option value="">Select User Type</option>
//               <option value="superadmin">Super Admin</option>
//               <option value="hr">HR</option>
//               <option value="interviewer">Interviewer</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <Label>Description</Label>
//           <textarea
//             className="w-full border rounded-md px-3 py-2 text-sm"
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter description"
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           <Checkbox checked={selectAllPermissions} onCheckedChange={handleSelectAllPermissions} />
//           <Label>Select All Permissions</Label>
//         </div>

//         <div className="space-y-6">
//           {Object.entries(groupedPermissions).map(([group, perms]) => (
//             <div key={group}>
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   checked={selectedPermissions[group]?.length === perms.length}
//                   onCheckedChange={() => handleSelectGroup(group)}
//                 />
//                 <h3 className="text-lg font-medium">{group}</h3>
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
//                 {perms.map((perm) => (
//                   <div key={perm.id} className="flex items-center gap-2">
//                     <Checkbox
//                       checked={selectedPermissions[group]?.includes(perm.id)}
//                       onCheckedChange={() => handlePermissionChange(group, perm.id)}
//                     />
//                     <span className="text-sm">{perm.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-end gap-4">
//           <Button onClick={() => setOpen(false)} variant="outline">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Save Role</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddRole;


// 'use client';

// import React, { useState } from 'react';
// import { Dialog, DialogContent } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Label } from '@/components/ui/label';

// const mockPermissions = [
//   { id: 1, name: 'Manage Users', group: 'User Management' },
//   { id: 2, name: 'View Reports', group: 'Analytics' },
//   { id: 3, name: 'Manage Candidates', group: 'Recruitment' },
//   { id: 4, name: 'Schedule Interviews', group: 'Recruitment' },
// ];

// const AddRole = ({ open, setOpen, onSuccess }) => {
//   const [name, setName] = useState('');
//   const [userType, setUserType] = useState('');
//   const [description, setDescription] = useState('');
//   const [selectedPermissions, setSelectedPermissions] = useState({});
//   const [selectAllPermissions, setSelectAllPermissions] = useState(false);

//   const groupedPermissions = mockPermissions.reduce((acc, perm) => {
//     if (!acc[perm.group]) acc[perm.group] = [];
//     acc[perm.group].push(perm);
//     return acc;
//   }, {});

//   const handlePermissionChange = (group, id) => {
//     setSelectedPermissions((prev) => {
//       const groupPerms = prev[group] || [];
//       return {
//         ...prev,
//         [group]: groupPerms.includes(id)
//           ? groupPerms.filter((permId) => permId !== id)
//           : [...groupPerms, id],
//       };
//     });
//   };

//   const handleSelectAllPermissions = () => {
//     if (selectAllPermissions) {
//       setSelectedPermissions({});
//     } else {
//       const all = {};
//       Object.entries(groupedPermissions).forEach(([group, perms]) => {
//         all[group] = perms.map((p) => p.id);
//       });
//       setSelectedPermissions(all);
//     }
//     setSelectAllPermissions(!selectAllPermissions);
//   };

//   const handleSelectGroup = (group) => {
//     const allSelected =
//       groupedPermissions[group].length === (selectedPermissions[group]?.length || 0);
//     setSelectedPermissions((prev) => ({
//       ...prev,
//       [group]: allSelected ? [] : groupedPermissions[group].map((p) => p.id),
//     }));
//   };

//   const handleSubmit = () => {
//     const formattedPermissions = Object.entries(selectedPermissions).map(([group, ids]) => ({
//       permission_group: group,
//       permissions: ids.map((id) => {
//         const perm = mockPermissions.find((p) => p.id === id);
//         return { id: perm.id, permissionname: perm.name };
//       }),
//     }));

//     console.log({ name, userType, description, permissions: formattedPermissions });
//     onSuccess?.();
//     setOpen(false);
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="max-w-xl w-full p-6 space-y-6 bg-black">
//         <h2 className="text-2xl font-semibold">Add Role</h2>

//         {/* Role Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Role Name</Label>
//             <Input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter role name"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="userType">User Type</Label>
//             <select
//               id="userType"
//               className="w-full border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//               value={userType}
//               onChange={(e) => setUserType(e.target.value)}
//             >
//               <option value="">Select User Type</option>
//               <option value="superadmin">Super Admin</option>
//               <option value="hr">HR</option>
//               <option value="interviewer">Interviewer</option>
//             </select>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="space-y-2">
//           <Label htmlFor="description">Description</Label>
//           <textarea
//             id="description"
//             className="w-full border border-input rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
//             rows={3}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Enter description"
//           />
//         </div>

//         {/* Select All Permissions */}
//         <div className="flex items-center gap-2">
//           <Checkbox
//             id="selectAll"
//             checked={selectAllPermissions}
//             onCheckedChange={handleSelectAllPermissions}
//           />
//           <Label htmlFor="selectAll">Select All Permissions</Label>
//         </div>

//         {/* Grouped Permissions */}
//         <div className="space-y-6">
//           {Object.entries(groupedPermissions).map(([group, perms]) => (
//             <div key={group} className="space-y-3">
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   id={`group-${group}`}
//                   checked={selectedPermissions[group]?.length === perms.length}
//                   onCheckedChange={() => handleSelectGroup(group)}
//                 />
//                 <Label htmlFor={`group-${group}`} className="text-lg font-medium">
//                   {group}
//                 </Label>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pl-6">
//                 {perms.map((perm) => (
//                   <div key={perm.id} className="flex items-center gap-2">
//                     <Checkbox
//                       id={`perm-${perm.id}`}
//                       checked={selectedPermissions[group]?.includes(perm.id)}
//                       onCheckedChange={() => handlePermissionChange(group, perm.id)}
//                     />
//                     <Label htmlFor={`perm-${perm.id}`} className="text-sm font-normal">
//                       {perm.name}
//                     </Label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-4 pt-4">
//           <Button variant="outline" onClick={() => setOpen(false)}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Save Role</Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default AddRole;

'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const mockPermissions = [
  { id: 1, name: 'Manage Users', group: 'User Management' },
  { id: 2, name: 'View Reports', group: 'Analytics' },
  { id: 3, name: 'Manage Candidates', group: 'Recruitment' },
  { id: 4, name: 'Schedule Interviews', group: 'Recruitment' },
]

const AddRole = ({ open, setOpen, onSuccess }) => {
  const [name, setName] = useState('')
  const [userType, setUserType] = useState('')
  const [description, setDescription] = useState('')
  const [selectedPermissions, setSelectedPermissions] = useState({})
  const [selectAllPermissions, setSelectAllPermissions] = useState(false)

  const groupedPermissions = mockPermissions.reduce((acc, perm) => {
    if (!acc[perm.group]) acc[perm.group] = []
    acc[perm.group].push(perm)
    return acc
  }, {})

  const handlePermissionChange = (group, id) => {
    setSelectedPermissions((prev) => {
      const groupPerms = prev[group] || []
      return {
        ...prev,
        [group]: groupPerms.includes(id)
          ? groupPerms.filter((permId) => permId !== id)
          : [...groupPerms, id],
      }
    })
  }

  const handleSelectAllPermissions = () => {
    if (selectAllPermissions) {
      setSelectedPermissions({})
    } else {
      const all = {}
      Object.entries(groupedPermissions).forEach(([group, perms]) => {
        all[group] = perms.map((p) => p.id)
      })
      setSelectedPermissions(all)
    }
    setSelectAllPermissions(!selectAllPermissions)
  }

  const handleSelectGroup = (group) => {
    const allSelected =
      groupedPermissions[group].length === (selectedPermissions[group]?.length || 0)
    setSelectedPermissions((prev) => ({
      ...prev,
      [group]: allSelected ? [] : groupedPermissions[group].map((p) => p.id),
    }))
  }

  const handleSubmit = () => {
    const formattedPermissions = Object.entries(selectedPermissions).map(([group, ids]) => ({
      permission_group: group,
      permissions: ids.map((id) => {
        const perm = mockPermissions.find((p) => p.id === id)
        return { id: perm.id, permissionname: perm.name }
      }),
    }))

    console.log({ name, userType, description, permissions: formattedPermissions })
    onSuccess?.()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="max-w-5xl w-full p-8 bg-white border border-border shadow-xl rounded-xl"
      >
        <div className="max-h-[80vh] overflow-y-auto pr-2 space-y-6">
          <h2 className="text-2xl font-semibold">Add Role</h2>

          {/* Role Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter role name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType">User Type</Label>
              <select
                id="userType"
                className="w-full border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select User Type</option>
                <option value="superadmin">Super Admin</option>
                <option value="hr">HR</option>
                <option value="interviewer">Interviewer</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full border border-input rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </div>

          {/* Select All Permissions */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="selectAll"
              checked={selectAllPermissions}
              onCheckedChange={handleSelectAllPermissions}
            />
            <Label htmlFor="selectAll" className="text-sm font-medium">
              Select All Permissions
            </Label>
          </div>

          {/* Grouped Permissions */}
          <div className="space-y-4">
            {Object.entries(groupedPermissions).map(([group, perms]) => (
              <div
                key={group}
                className="border border-border rounded-xl p-4 bg-muted/30 space-y-3"
              >
                {/* Group Header */}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`group-${group}`}
                    checked={selectedPermissions[group]?.length === perms.length}
                    onCheckedChange={() => handleSelectGroup(group)}
                  />
                  <Label htmlFor={`group-${group}`} className="font-semibold text-base">
                    {group}
                  </Label>
                </div>

                {/* Permissions List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2 pl-6">
                  {perms.map((perm) => (
                    <label
                      key={perm.id}
                      htmlFor={`perm-${perm.id}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        id={`perm-${perm.id}`}
                        checked={selectedPermissions[group]?.includes(perm.id)}
                        onCheckedChange={() => handlePermissionChange(group, perm.id)}
                      />
                      <span>{perm.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Role</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddRole
