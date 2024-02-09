// import React, { Fragment, useState } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { XMarkIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';

// const tabs = [
//   { name: 'All', href: '#', current: true },
//   { name: 'Online', href: '#', current: false },
//   { name: 'Offline', href: '#', current: false },
// ];

// const team = [
//   {
//     name: 'Leslie Alexander',
//     handle: 'lesliealexander',
//     href: '#',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     status: 'online',
//   },
//   // More people...
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export default function Notification(isOpen, setIsOpen ) {
//   const [open, setOpen] = useState(true);
//   const [inviteNotification, setInviteNotification] = useState(true);

//   const handleAccept = () => {
//     // Handle Accept Logic
//     setInviteNotification(false);
//   };

//   const handleDecline = () => {
//     // Handle Decline Logi
//     setInviteNotification(false);
//   };

//   return (
//     <Fragment>
//        <Transition.Root show={open} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
//           <div className="fixed inset-0" />

//           <div className="fixed inset-0 overflow-hidden">
//             <div className="absolute inset-0 overflow-hidden">
//               <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="transform transition ease-in-out duration-500 sm:duration-700"
//                   enterFrom="translate-x-full"
//                   enterTo="translate-x-0"
//                   leave="transform transition ease-in-out duration-500 sm:duration-700"
//                   leaveFrom="translate-x-0"
//                   leaveTo="translate-x-full"
//                 >
//                   <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
//                     <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//                       <div className="bg-indigo-700 px-4 py-6 sm:px-6">
//                         <div className="flex items-center justify-between">
//                           <Dialog.Title className="text-base font-semibold leading-6 text-white">
//                             {inviteNotification ? 'Notification' : 'No Notification'}
//                           </Dialog.Title>
//                           <div className="ml-3 flex h-7 items-center">
//                             <button
//                               type="button"
//                               className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
//                               onClick={() => setOpen(false)}
//                             >
//                               <span className="absolute -inset-2.5" />
//                               <span className="sr-only">Close panel</span>
//                               <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                             </button>
//                           </div>
//                         </div>
//                         <div className="mt-1">
//                           <p className="text-sm text-indigo-300">
//                             {inviteNotification
//                               ? 'Got new notification'
//                               : 'There is no request at the moment!'}
//                           </p>
//                         </div>
//                       </div>
//                       {inviteNotification ? (
//                         <Transition
//                           show={inviteNotification}
//                           as={Fragment}
//                           enter="transform ease-out duration-300 transition"
//                           enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
//                           enterTo="translate-y-0 opacity-100 sm:translate-x-0"
//                           leave="transition ease-in duration-100"
//                           leaveFrom="opacity-100"
//                           leaveTo="opacity-0"
//                         >
//                           <div className="pointer-events-auto w-full max-w-sm rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//                             <div className="p-4">
//                               <div className="flex items-start">
//                                 <div className="flex-shrink-0 pt-0.5">
//                                   {/* <img
//                                     className="h-10 w-10 rounded-full"
//                                     src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
//                                     alt=""
//                                   /> */}
//                                 </div>
//                                 <div className="ml-3 w-0 flex-1">
//                                   <p className="text-sm font-medium text-gray-900">Ayush Kanaujia</p>
//                                   <p className="mt-1 text-sm text-gray-500">
//                                     Sent you an invite to connect.
//                                   </p>
//                                   <div className="mt-4 flex">
//                                     <button
//                                       type="button"
//                                       className="inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                                       onClick={handleAccept}
//                                     >
//                                       Accept
//                                     </button>
//                                     <button
//                                       type="button"
//                                       className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                                       onClick={handleDecline}
//                                     >
//                                       Decline
//                                     </button>
//                                   </div>
//                                 </div>
//                                 <div className="ml-4 flex flex-shrink-0">
//                                   <button
//                                     type="button"
//                                     className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                     onClick={() => setInviteNotification(false)}
//                                   >
//                                     <span className="sr-only">Close</span>
//                                     <XMarkIcon className="h-5 w-5" aria-hidden="true" />
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </Transition>
//                       ) : (
//                         <div className="relative flex-1 px-4 py-6 sm:px-6">
//                           {/* Your content for the Team tab */}
//                           <ul role="list" className="flex-1 divide-y divide-gray-200 overflow-y-auto">
//                             {team.map((person) => (
//                               <li key={person.handle}>
//                                 {/* ... */}
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}
//                     </div>
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </div>
//         </Dialog>
//       </Transition.Root>
//     </Fragment>
//   );
// }

// Add the import statement for your useNotifications hook
// Notification.js
// import React, { Fragment, useEffect } from 'react';
// import { Dialog, Transition } from '@headlessui/react';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import useNotifications from './notificationHook'; // Adjust the import path as necessary

// const Notification = ({ isOpen, setIsOpen }) => {
//   // Assuming 'username' is stored in session storage and your notifications are structured accordingly.
//   const username = JSON.parse(sessionStorage.getItem("User"))?.username || "";
//   const notifications = useNotifications(username);

//   useEffect(() => {
//     // Automatically open the notification panel if there are new notifications
//     if (notifications.length > 0) {
//       setIsOpen(true);
//     }
//   }, [notifications, setIsOpen]);

//   return (
//     <Transition.Root show={isOpen} as={Fragment}>
//       <Dialog as="div" className="fixed inset-0 z-10 overflow-hidden" onClose={setIsOpen}>
//         <div className="absolute inset-0 overflow-hidden">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-in-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in-out duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-25 transition-opacity" />
//           </Transition.Child>
//           <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
//             <Transition.Child
//               as={Fragment}
//               enter="transform transition ease-in-out duration-300 sm:duration-300"
//               enterFrom="translate-x-full"
//               enterTo="translate-x-0"
//               leave="transform transition ease-in-out duration-300 sm:duration-300"
//               leaveFrom="translate-x-0"
//               leaveTo="translate-x-full"
//             >
//               <Dialog.Panel className="w-screen max-w-md">
//                 <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
//                   <div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
//                     <div className="px-4 sm:px-6">
//                       <div className="flex items-start justify-between">
//                         <Dialog.Title className="text-lg font-medium text-gray-900">Notifications</Dialog.Title>
//                         <div className="ml-3 h-7 flex items-center">
//                           <button
//                             type="button"
//                             className="-m-2 p-2 text-gray-400 hover:text-gray-500"
//                             onClick={() => setIsOpen(false)}
//                           >
//                             <span className="sr-only">Close panel</span>
//                             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-6 relative flex-1 px-4 sm:px-6">
//                       {/* Replace this part with your notification content */}
//                       {notifications.map((notification, index) => (
//                         <div key={index} className="p-2 bg-white shadow rounded-md mb-2">
//                           <p className="text-sm font-medium text-gray-800">{notification.message}</p>
//                         </div>
//                       ))}
//                       {notifications.length === 0 && (
//                         <div className="text-center py-4">
//                           <p className="text-sm text-gray-500">You have no new notifications.</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition.Root>
//   );
// };

// export default Notification;



// const tabs = [
//   { name: 'All', href: '#', current: true },
//   { name: 'Online', href: '#', current: false },
//   { name: 'Offline', href: '#', current: false },
// ];

// const team = [
//   {
//     name: 'Leslie Alexander',
//     handle: 'lesliealexander',
//     href: '#',
//     imageUrl:
//       'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     status: 'online',
//   },
//   // More people...
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }


import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import useNotifications from './notificationHook';
import { MdDeleteForever } from "react-icons/md";
import api from '../config/axios'; // Ensure the import path is correct

export default function Notification({ isOpen, setIsOpen }) {
  const [open, setOpen] = useState(true);
  const username = JSON.parse(sessionStorage.getItem("User")).username;

  const notifications = useNotifications(username);

  useEffect(() => {
    if (notifications.length > 0) {
      setOpen(true); // Open the notification panel if there are new notifications
    }
  }, [notifications, setOpen]);

  const handleAccept = async(id, sender) => {
    // Implement the logic to accept the notification here
    // Optionally, delete the notification from the backend
    await api.put(`/peerFollowed/${sender}/${username}`)
    console.log(`Accepted notification with ID: ${id}`);
    await api.delete(`/deleteNotification/${id}`);
  };

  const handleDecline = async(id, sender) => {
    // Implement the logic to decline the notification here
    // Optionally, delete the notification from the backend
    await api.delete(`/peerUnFollow/${sender}/${username}`)
    await api.delete(`/deleteNotification/${id}`);
    console.log(`Declined notification with ID: ${id}`);
  };

  const handleDelete = async (id) => {
    // Implement the logic to delete the notification from the backend
    console.log(`Deleting notification with ID: ${id}`);
    // Example API call to delete the notification
    await api.delete(`/deleteNotification/${id}`);
    // Refresh notifications list or remove the notification from the state
  };

  return (
    <Fragment>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <div className="fixed inset-0" />
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            Notifications
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => setOpen(false)}
                            >
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 px-4 py-6 sm:px-6">
                        {/* Dynamically render notifications */}
                        {notifications.map((notification, index) => (
                          <div key={index} className="p-4 mb-4 rounded-lg bg-gray-100 relative">
                            <button
                              onClick={() => handleDelete(notification.id)}
                              className="absolute top-0 right-0 p-2"
                            >
                              <MdDeleteForever className="text-2xl text-red-500" />
                            </button>
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                              <div className="mt-4 flex">
                                <button
                                  type="button"
                                  className="mr-2 inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                                  onClick={() => handleAccept(notification.id, notification.sender)}
                                >
                                  Accept
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                  onClick={() => handleDecline(notification.id, notification.sender)}
                                >
                                  Decline
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {notifications.length === 0 && (
                          <p className="text-center text-sm text-gray-500">No new notifications.</p>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Fragment>
  );
}
