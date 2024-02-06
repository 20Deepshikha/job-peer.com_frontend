import React, {useEffect,Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import './addJobs.css'
import api from '../../../config/axios'

export default function AddJobs({handelAddJob}) {
  const [open, setOpen] = useState(true)
  const [storedUser, setStoredUser] = useState(null)
    const [jobTitle, setJobTitle] = useState(null)
    const [companyName, setCompanyName] = useState(null)
    const [jobDescription, setJobDescription] = useState(null)
    const [appliedThrough, setAppliedThrough] = useState(null)
    const [jobLink, setJobLink] = useState(null)


    useEffect(()=>{
        setStoredUser(JSON.parse(sessionStorage.getItem('User')).username);
    },[])

    const handleJobSubmit = async(e)=>{
        e.preventDefault();
        const job = {
          'job_title': jobTitle,
          'company_name': companyName,
          'job_description': jobDescription,
          'job_applied_link': jobLink,
          'appliedThrough': appliedThrough,
        };
    
        try {
          const sendJobData = await api.post(`/saveJob/${storedUser}`, job);
          console.log(sendJobData);
        
          // Reset form fields after successful submission
          setJobTitle('');
          setCompanyName('');
          setJobDescription('');
          setAppliedThrough('');
          setJobLink('');
        
          // Fetch and update the job data
          handelAddJob();

          //reloading page after every job is saved
          window.location.reload();
        } catch (error) {
          console.error('Error submitting job:', error);
        }
    }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                  <form onSubmit={handleJobSubmit} className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="h-0 flex-1 overflow-y-auto">
                      <div className="bg-indigo-700 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-white">
                            Add Job
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                              onClick={() => {
                                setOpen(false) 
                                handelAddJob()
                            }}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-indigo-300">
                            Get started by filling in the information below to add job records.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="divide-y divide-gray-200 px-4 sm:px-6">
                          <div className="space-y-6 pb-5 pt-6">
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Job Title
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  value={jobTitle} placeholder='Full Stack Software Developer' onChange={(e)=>{setJobTitle(e.target.value)}}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Company Name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  value={companyName} placeholder='Google'  onChange={(e)=>{setCompanyName(e.target.value)}}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Description
                              </label>
                              <div className="mt-2">
                                <textarea
                                  id="description"
                                  name="description"
                                  value={jobDescription} placeholder='Job Description' onChange={(e)=>{setJobDescription(e.target.value)}}
                                  rows={4}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  defaultValue={''}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Applied Through
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  value={appliedThrough} placeholder='LinkedIn'  onChange={(e)=>{setAppliedThrough(e.target.value)}}
                                  id="project-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="project-name"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Job Link
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  value={jobLink} placeholder='https://www.googlejobs/softwaredev10208028408/jobs.com'  onChange={(e)=>{setJobLink(e.target.value)}}
                                  id="project-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                              </div>
                            </div>
                          </div>
    
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => {
                            setOpen(false)
                            handelAddJob()
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={handleJobSubmit}
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}


