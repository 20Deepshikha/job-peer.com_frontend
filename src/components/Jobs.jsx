/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import api from "../config/axios";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import AddJobs from "./home/homeComponents/addJobs";
import PageNotFound from "./NotFound";
import ShowDetails from "./home/homeComponents/ShowDetails";

export default function ViewAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [showJobCards, setShowJobCards] = useState(true);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [editmode, setEditmode] = useState(false);
  const [editJob, setEditJob] = useState({});
  const [search, setSearch] = useState("");
  const [checkSearch, setCheckSearch] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [storedUser, setStoredUser] = useState(null);
  const [authenticate, setAuthenticate] = useState(false);
  const [home, setHome] = useState(true);
  const [addJob, setAddJob] = useState(false);
  const [viewAllJobs, setViewAllJobs] = useState(false);
  const [jobStats, setJobStats] = useState(true);
  const [appStats, setAppStats] = useState(false);
  const [leaderboard, setLeaderboard] = useState(false);

  useEffect(() => {
    const userCheckStr = sessionStorage.getItem("User");
    if (userCheckStr) {
      const userCheck = JSON.parse(userCheckStr);
      setStoredUser(userCheck);
  
      if (userCheck && userCheck.username === username) {
        setAuthenticate(true);
        console.log("Authentication successful");
      } else {
        setAuthenticate(false);
        console.log("Invalid User !!");
        navigate("/login"); // Redirect to login page if authentication fails
      }
    } else {
      console.log("Nothing in Storage");
      setAuthenticate(false);
      if (username) {
        navigate("/login"); // Redirect to login page if user is not authenticated
      }
    }
  }, [username, navigate]);

 // Include `navigate` in dependencies

  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem("User")).username;
    api
      .get(`/jobs/${username}`)
      .then((response) => {
        setJobs(response.data);
        console.log(jobs);
      })
      .catch((error) => {
        console.error("error fetching job: ", error);
      });
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleDetail = (id) => {
    setSelectedJobId(id);
    setShowDetail(true);
    setShowJobCards(false);
    console.log("Detail view for job ID:", id);
  };
  
  const handelAddJob = () => {
    setAddJob(!addJob);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/deleteJobs/${id}`);
      console.log("Job Deleted Successfully");
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
      if (checkSearch) {
        setFilteredJobs((prevFilteredJobs) =>
          prevFilteredJobs.filter((job) => job.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleShowJobs = () => {
    setShowDetail(false);
    setShowJobCards(true);
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedJobId(null);
  };

  const handleEditClick = () => {
    setEditmode(true);
    setEditJob({ ...jobs.find((job) => job.id === selectedJobId) });
  };

  const selectedJob = jobs.find((job) => job.id === selectedJobId);

  const handleInputChange = (e, field) => {
    setEditJob((prev) => ({ ...prev, [field]: e.target.value }));
  };


  const handleSave = async () => {
    try {
      await api.put(`/editJobs/${editJob.id}`, editJob);
      console.log("edited job successfully");
      setEditmode(false);
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j.id === editJob.id ? { ...j, ...editJob } : j))
      );
    } catch (error) {
      console.error("Error saving job:", error);
    }
  };

  const handleCancel = () => {
    setEditmode(false);
  };

  const handleCheckboxChange = async (jobId, field) => {
    const updatedJob = { ...jobs.find((job) => job.id === jobId) };
    updatedJob[field] = !updatedJob[field];

    // Enforce rules
    if (field === "interviewing") {
      updatedJob.application_processing = false;
      updatedJob.following_up = false;
      updatedJob.rejected = false;
    } else if (field === "rejected") {
      updatedJob.application_processing = false;
      updatedJob.interviewing = false;
    } else if (field === "application_processing") {
      updatedJob.interviewing = false;
      updatedJob.rejected = false;
    } else if (field === "following_up") {
      updatedJob.interviewing = false;
    }

    try {
      await api.put(`/editJobs/${jobId}`, updatedJob);
      setJobs((prevJobs) =>
        prevJobs.map((j) => (j.id === jobId ? updatedJob : j))
      );
      setFilteredJobs((prevFilteredJobs) =>
        prevFilteredJobs.map((j) => (j.id === jobId ? updatedJob : j))
      );
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };
  // const handleHome = () => {
  //   setLeaderboard(false);
  //   setHome(true);
  //   setAddJob(false);
  //   setViewAllJobs(false);
  //   setOpen(false);
  // };

  // const handleJobs = () => {
  //   console.log('Navigating to:', `/jobs/${storedUser.username}`);
  //   navigate(`/jobs/${username}`);
  // };

  // const handleLogout = () => {
  //   sessionStorage.clear();
  //   navigate("/");
  //   setOpen(false);
  // };

  // const handleJobStats = () => {
  //   setLeaderboard(false);
  //   setAppStats(false);
  //   setJobStats(true);
  // };

  // const handleAppStats = () => {
  //   setLeaderboard(false);
  //   setAppStats(true);
  //   setJobStats(false);
  // };

  // const handleLeaderboard = () => {
  //   setAppStats(false);
  //   setJobStats(false);
  //   setLeaderboard(true);
  // };

  // const getShadowClass = (job) => {
  //   if (job.interviewing) return "shadow-green";
  //   if (job.rejected) return "shadow-red";
  //   if (job.application_processing && job.following_up) return "shadow-orange";
  //   if (job.application_processing) return "shadow-blue";
  //   if (job.following_up) return "shadow-yellow";
  //   return "shadow-normal";
  // };

  // const getApplicationStatus = (job) => {
  //   let status = [];
  //   if (job.application_processing) status.push("Application Processing");
  //   if (job.following_up) status.push("Following Up");
  //   if (job.interviewing) status.push("Interviewing");
  //   if (job.rejected) status.push("Rejected");
  //   return status.join(" & ") || "Application status not selected !!";
  // };

  const handleSearch = async () => {
    if (search.trim()) {
      const username = JSON.parse(sessionStorage.getItem("User")).username;
      try {
        const response = await api.get(`/jobs/${username}`, {
          params: { search: search.trim() },
        });
        setFilteredJobs(response.data);
        setCheckSearch(true);
      } catch (error) {
        console.error("Error searching jobs:", error);
      }
    } else {
      setFilteredJobs(jobs);
      setCheckSearch(false);
    }
  };

  const [jobStatus, setJobStatus] = useState();
  const handleStatus = (stat) => {
    setJobStatus(stat);
  };
  return (
    <>
      {authenticate && storedUser ? (
        <div>
          <Navbar
          />
          {showJobCards && <ul
            role="list"
            className="pt-6 pr-6 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4"
          >
            {jobs ? (
              jobs.map((person) => (
                <li
                  key={person.id}
                  className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
                >
                  <div className="flex w-full items-center justify-between space-x-6 p-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-md font-medium text-gray-900">
                          {person.company_name}
                        </h3>
                      </div>
                      <p className="mt-1 truncate text-sm text-gray-500">
                        {person.job_title}
                      </p>
                      <p className="truncate text-sm gray-500">
                        Applied on:{" "}
                        {new Date(
                          Date.parse(person.createdAt)
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    {person.application_processing === true ? (
                      <span class="inline-flex flex-shrink-0 items-center rounded-full bg-blue-50 px-1.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-green-600/20">
                        Application Processing
                      </span>
                    ) : person.following_up === true ? (
                      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                        Following up
                      </span>
                    ) : person.interviewing === true ? (
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-yellow-600/20">
                        Interviewing
                      </span>
                    ) : person.rejected ===true ? (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                        Reject
                      </span>
                    ) : (
                      // Render application_processing badge when all properties are 0
                      <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Applied 
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="flex w-0 flex-1">
                        <button
                          onClick={() => handleDetail(person.id)}
                          className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          Details
                        </button>
                      </div>
                      <div className="-ml-px flex w-0 flex-1">
                        <button
                          onClick={() => handleDelete(person.id)}
                          className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No jobs available or data is still loading.</p>
            )}

            {addJob && (
              <div>
                <AddJobs handelAddJob={handelAddJob} />
              </div>
            )}

          </ul>}

          {showDetail && (
          <div className="overflow-hidden rounded-lg bg-gray-50">
      <div className="px-4 py-5 sm:p-6"><ShowDetails jobId={selectedJobId} onBack={handleShowJobs} /></div>
    </div>
          )}
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}
