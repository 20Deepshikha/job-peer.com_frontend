import { Fragment } from "react";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddJobs from "./home/homeComponents/addJobs";
import ViewJobs from "./Jobs";
import Piechar from "./home/homeComponents/piechar";
import JobStatsBarChart from "./home/homeComponents/barchat";
import HomeJobs from "./home/homeComponents/HomeJobs";
import Hamburger from "hamburger-react";
import Leaderboard from "./Leaderboard";
import Navbar from "./Navbar";
import SearchUser from "./home/homeComponents/searchUser";
import PageNotFound from "./NotFound";
import { Dialog, Listbox, Menu, Transition } from "@headlessui/react";
import api from "../config/axios";
import './Home.css'

import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const navigation = [
  {
    name: "Home",
    href: "#",
  },
  {
    name: "Invoices",
    href: "#",
  },
  {
    name: "Clients",
    href: "#",
  },
  {
    name: "Expenses",
    href: "#",
  },
];

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIconMini,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

export default function Home() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [selected, setSelected] = useState(moods[5]);
  const { username } = useParams();
  const navigate = useNavigate();

  // const [isOpen, setOpen] = useState(false);
  const [storedUser, setStoredUser] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);
  // const [home, setHome] = useState(true);
  const [addJob, setAddJob] = useState(false);
  const [userLeaderboard, setUserLeaderboard] = useState();
  // const [viewAllJobs, setViewAllJobs] = useState(false);
  const [jobStats, setJobStats] = useState(true);
  const [appStats, setAppStats] = useState(false);
  // const [leaderboard, setLeaderboard] = useState(false);

  useEffect(() => {
    const userCheckStr = sessionStorage.getItem("User");
    if (userCheckStr) {
      const userCheck = JSON.parse(userCheckStr);
      setStoredUser(userCheck);
    } else {
      console.log("Nothing in Storage");
    }

    // // Cleanup function with a delay to clear session storage return () => {
    // const timeoutId = setTimeout(() => {     sessionStorage.clear();
    // console.log('Session storage cleared after 5 minutes');   }, 300000); //
    // 300000 milliseconds = 5 minutes   // Clear the timeout if the component
    // remounts within the delay period   return () => clearTimeout(timeoutId); };
  }, []);

  useEffect(() => {
    if (storedUser && storedUser.username === username) {
      setAuthenticate(true);
      console.log("Authentication successful");
    } else {
      setAuthenticate(false);
      if (storedUser) {
        console.log("Invalid User !!");
        navigate("/login"); // Redirect to login page if authentication fails
      }
    }
  }, [storedUser, username, navigate]); // Include `navigate` in dependencies

  useEffect(() => {
    const fetchUserLeaderboard = async () => {
      try {
        const userCheckStr = sessionStorage.getItem("User");
        if (userCheckStr) {
          const userCheck = JSON.parse(userCheckStr);
          setStoredUser(userCheck);
          const response = await api.get(`/leaderboardUser/${userCheck.username}`);
          setUserLeaderboard(response.data);
          console.log('Leaderboard details:', response.data);
        } else {
          console.log("Nothing in Storage");
        }
      } catch (error) {
        console.error('Error fetching user leaderboard:', error);
      }
    };

    fetchUserLeaderboard();
  }, []);


  // useEffect(()=>{
  //   const getLeaderBoard = async()=>{
  //     await api.get(``)
  //   }
  // })
  // const handleHome = () => {
  //   setLeaderboard(false);
  //   setHome(true);
  //   setAddJob(false);
  //   setViewAllJobs(false);
  //   setOpen(false);
  // };

  // const handleLogout = () => {
  //   sessionStorage.clear();
  //   navigate("/");
  //   setOpen(false);
  // };

  const handleJobStats = () => {
    setAppStats(false);
    setJobStats(true);
  };

  const handleAppStats = () => {
    setAppStats(true);
    setJobStats(false);
  };

  // const handleLeaderboard = () => {
  //   setAppStats(false);
  //   setJobStats(false);
  //   setLeaderboard(true);
  // };


  const stats = storedUser && userLeaderboard ? [
    {
      name: `Total Jobs Applied by ${storedUser.username}`,
      value: userLeaderboard.numberOfJobs,
    },
    {
      name: "Jobs Applied in one hour",
      value: userLeaderboard.numberOfJobsHour,
    },
    {
      name: "Jobs applied in six hours",
      value: userLeaderboard.numberOfJobsSixHours,
    },
    {
      name: "Jobs Applied in one day",
      value: userLeaderboard.numberOfJobsDay,
    },
    {
      name: "Jobs Applied in one week",
      value: userLeaderboard.numberOfJobsWeek
    },
    {
      name: "Jobs Applied in one month",
      value: userLeaderboard.numberOfJobsMonth
    },
    {
      name: "Jobs Applied in one year",
      value: userLeaderboard.numberOfJobsYear
    }
  ] : [];

  return (
    <>
      {authenticate && storedUser ? (
        <main>
          <Navbar />

          <header className="relative pt-14 sm:pt-16">
            <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
              <div className="absolute -left-4 -top-16 -mt-16 transform-gpu opacity-50 blur-3xl sm:left-16 lg:left-1/2 lg:-ml-80">
                <div
                  className="aspect-square w-48 h-48 sm:w-[36rem] sm:h-[20.25rem] lg:aspect-[1154/678] lg:w-[72.125rem] bg-gradient-to-br from-[#FF80B5] to-[#9089FC]"
                  style={{
                    clipPath: "polygon(100% 38.5%, 82.6% 100%, 60.2% 37.7%, 52.4% 32.1%, 47.5% 41.8%, 45.2% 65.6%, 27.5% 23.4%, 0.1% 35.3%, 17.9% 0%, 27.7% 23.4%, 76.2% 2.5%, 74.2% 56%, 100% 38.5%)",
                  }}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gray-900/5" />
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-gray-900 text-left pt-3 pl-4 sm:pl-5">
                Welcome
                <span className="ml-1 user-welcome-span">
                  {`${storedUser.name}`}
                </span>
                .
              </h1>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {/* Invoice */}
              <div className="-mx-4 px-2 py-2 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
                <div className="bg-gray-900">
                  <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
                      {stats.map((stat) => (
                        <div
                          key={stat.name}
                          className="bg-gray-700 px-4 py-6 sm:px-6 lg:px-8"
                        >
                          <p className="text-sm font-medium leading-6 text-gray-400">
                            {stat.name}
                          </p>
                          <p className="mt-2 flex items-baseline gap-x-2">
                            <span className="text-4xl font-semibold tracking-tight text-white">
                              {stat.value}
                            </span>
                            {stat.unit ? (
                              <span className="text-sm text-gray-400">
                                {stat.unit}
                              </span>
                            ) : null}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-start-3">
                <h2 className="text-sm font-semibold leading-6 text-gray-900">
                  Recently Applied
                </h2>
                <HomeJobs />
              </div>
            </div>
          </div>
          {/* <div className='wrapper'>
            <div className='charts-container'>
              {jobStats && <div className='bar-chart-container'>
                  <JobStatsBarChart />
                </div>}
                {appStats && <div className='pie-chart-container'>
                  <Piechar />
                </div>} 
              <div className="bar-chart-container"> <JobStatsBarChart /> </div>
              <div className="pie-chart-container"><Piechar /></div>
            </div>
          </div> */}
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900 px-5">Last 30 days</h3>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 py-4 px-8">
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">
                </dt>
                <dd className="mt-1 tracking-tight text-gray-900">
                  <div className="bar-chart-container"> <JobStatsBarChart /> </div>
                </dd>
              </div>
              <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500"></dt>
                <dd className="mt-1  tracking-tight text-gray-900">
                  <div className="pie-chart-container"><Piechar /></div>
                </dd>
              </div>
            </dl>
          </div>
        </main>
      ) : (
        <PageNotFound />
      )}{" "}
    </>
  );
}
