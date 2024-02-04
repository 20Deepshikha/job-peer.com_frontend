import React, { useEffect, useState } from 'react';
import api from '../../../config/axios';
import './viewAllJobs.css';

function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [editmode, setEditmode] = useState(false);
  const [editJob, setEditJob] = useState({});
  const [search, setSearch] = useState('');
  const [checkSearch, setCheckSearch] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const username = JSON.parse(sessionStorage.getItem('User')).username;
    api.get(`/jobs/${username}`).then(response => {
      setJobs(response.data);
    }).catch(error => {
      console.error('error fetching job: ', error);
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
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/deleteJobs/${id}`);
      console.log('Job Deleted Successfully');
      setJobs(prevJobs => prevJobs.filter(job => job.id !== id));
      if (checkSearch) {
        setFilteredJobs(prevFilteredJobs => prevFilteredJobs.filter(job => job.id !== id));
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleBack = () => {
    setShowDetail(false);
    setSelectedJobId(null);
  };

  const handleEditClick = () => {
    setEditmode(true);
    setEditJob({ ...jobs.find(job => job.id === selectedJobId) });
  };

  const selectedJob = jobs.find(job => job.id === selectedJobId);

  const handleInputChange = (e, field) => {
    setEditJob(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async () => {
    try {
      await api.put(`/editJobs/${editJob.id}`, editJob);
      console.log('edited job successfully');
      setEditmode(false);
      setJobs(prevJobs => prevJobs.map(j => j.id === editJob.id ? { ...j, ...editJob } : j));
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleCancel = () => {
    setEditmode(false);
  };

  const handleCheckboxChange = async (jobId, field) => {
    const updatedJob = { ...jobs.find(job => job.id === jobId) };
    updatedJob[field] = !updatedJob[field];

    // Enforce rules
    if (field === 'interviewing') {
      updatedJob.application_processing = false;
      updatedJob.following_up = false;
      updatedJob.rejected = false;
    } else if (field === 'rejected') {
      updatedJob.application_processing = false;
      updatedJob.interviewing = false;
    } else if (field === 'application_processing') {
      updatedJob.interviewing = false;
      updatedJob.rejected = false;
    } else if (field === 'following_up') {
      updatedJob.interviewing = false;
    }

    try {
      await api.put(`/editJobs/${jobId}`, updatedJob);
      setJobs(prevJobs => prevJobs.map(j => j.id === jobId ? updatedJob : j));
      setFilteredJobs(prevFilteredJobs => prevFilteredJobs.map(j => j.id === jobId ? updatedJob : j));
    } catch (error) {
      console.error('Error updating job status:', error);
    }
  };

  const getShadowClass = (job) => {
    if (job.interviewing) return 'shadow-green';
    if (job.rejected) return 'shadow-red';
    if (job.application_processing && job.following_up) return 'shadow-orange';
    if (job.application_processing) return 'shadow-blue';
    if (job.following_up) return 'shadow-yellow';
    return 'shadow-normal';
  };

  const getApplicationStatus = (job) => {
    let status = [];
    if (job.application_processing) status.push('Application Processing');
    if (job.following_up) status.push('Following Up');
    if (job.interviewing) status.push('Interviewing');
    if (job.rejected) status.push('Rejected');
    return status.join(' & ') || 'Application status not selected !!';
  };

  const handleSearch = async () => {
    if (search.trim()) {
      const username = JSON.parse(sessionStorage.getItem('User')).username;
      try {
        const response = await api.get(`/jobs/${username}`, {
          params: { search: search.trim() },
        });
        setFilteredJobs(response.data);
        setCheckSearch(true);
      } catch (error) {
        console.error('Error searching jobs:', error);
      }
    } else {
      setFilteredJobs(jobs);
      setCheckSearch(false);
    }
  };

  return (
    <>
      <div>
        {!showDetail ? (
          <div className='allJobs'>
            <div className='search-container'>
              <i class="gg-search"></i>
              <input
                type='text'
                value={search}
                placeholder='Search company or job title'
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <ul>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((j) => (
                  <li key={j.id} className={getShadowClass(j)}>
                    {/* JobId: {j.id}<br /> */}
                    <span style={{ color: 'black', fontWeight: '600', fontSize: '110%' }}>{j.job_title}</span><br />
                    <span style={{ fontWeight: '400' }}>{j.company_name}</span><br />
                    <div className='in-btns'>
                      <span className='as-span'>Application Status</span>
                      <div className='job-check'>
                        {/* Each checkbox with its onChange handler */}
                        <div className='input-lable'>
                          <label>Application Processing</label>
                          <input type='checkbox' checked={j.application_processing} onChange={() => handleCheckboxChange(j.id, 'application_processing')} />
                        </div>
                        <div className='input-lable'>
                          <label>Following Up</label>
                          <input type='checkbox' checked={j.following_up} onChange={() => handleCheckboxChange(j.id, 'following_up')} />
                        </div>
                        <div className='input-lable'>
                          <label>Interviewing</label>
                          <input type='checkbox' checked={j.interviewing} onChange={() => handleCheckboxChange(j.id, 'interviewing')} />
                        </div>
                        <div className='input-lable'>
                          <label>Rejected</label>
                          <input type='checkbox' checked={j.rejected} onChange={() => handleCheckboxChange(j.id, 'rejected')} />
                        </div>
                      </div>
                      <div className='job-btn-container'>
                        <button className='job-detail-btn' onClick={() => handleDetail(j.id)}>Show Details</button>
                        <button className='job-delete-btn' onClick={() => handleDelete(j.id)}>Delete</button>
                      </div>
                    </div>
                  </li>
                ))
              ) : jobs.length > 0 ? (
                jobs.map((j) => (
                  <li key={j.id} className={getShadowClass(j)}>
                    {/* JobId: {j.id}<br /> */}
                    <span style={{ color: 'black', fontWeight: '600' }}>{j.job_title}</span><br />
                    <span style={{ fontWeight: '400' }}>{j.company_name}</span><br />
                    <div className='in-btns'>
                      <span className='as-span'>Application Status</span>
                      <div className='job-check'>
                        {/* Each checkbox with its onChange handler */}
                        <div className='input-lable'>
                          <label>Application Processing</label>
                          <input type='checkbox' checked={j.application_processing} onChange={() => handleCheckboxChange(j.id, 'application_processing')} />
                        </div>
                        <div className='input-lable'>
                          <label>Following Up</label>
                          <input type='checkbox' checked={j.following_up} onChange={() => handleCheckboxChange(j.id, 'following_up')} />
                        </div>
                        <div className='input-lable'>
                          <label>Interviewing</label>
                          <input type='checkbox' checked={j.interviewing} onChange={() => handleCheckboxChange(j.id, 'interviewing')} />
                        </div>
                        <div className='input-lable'>
                          <label>Rejected</label>
                          <input type='checkbox' checked={j.rejected} onChange={() => handleCheckboxChange(j.id, 'rejected')} />
                        </div>
                      </div>
                      <div className='job-btn-container'>
                        <button className='job-detail-btn' onClick={() => handleDetail(j.id)}>Show Details</button>
                        <button className='job-delete-btn' onClick={() => handleDelete(j.id)}>Delete</button>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <p>No jobs available or data is still loading.</p>
              )}
            </ul>
          </div>) : (
          <div>
            {selectedJob && !editmode ? (
              <div className='detail-mode'>
                <div className='detail-btn'>
                  <button className='detail-edit' onClick={handleEditClick}>Edit Job</button>
                  <button className='detail-back' onClick={handleBack}>Back</button>
                </div>
                <div className='details'>
                  <p className='status'>Application Status: <span>{getApplicationStatus(selectedJob)}</span></p>
                  <p className='job-title'><span>Title </span><br />{selectedJob.job_title}</p>
                  <hr></hr>
                  <p className='company-name'><span>Company Name </span><br />{selectedJob.company_name}</p>
                  <hr></hr>
                  <p className='job-description'><span>Job Description </span><br /><pre>{selectedJob.job_description}</pre></p>
                  <hr></hr>
                  <p className='date-applied'><span>Applied On </span><br />{new Date(selectedJob.job_applied_date).toLocaleString()}</p>
                  <hr></hr>
                  <p className='job-link'><span>Job Applied Link </span><br /><a href={selectedJob.job_applied_link} target="_blank" rel="noopener noreferrer">{selectedJob.job_applied_link}</a></p>
                </div>
              </div>
            ) : selectedJob && editmode ? (
              <div className="edit-form">
                <input class="edit-input" type="text" value={editJob.job_title} onChange={e => handleInputChange(e, 'job_title')} placeholder="Job Title" />
                <input class="edit-input" type="text" value={editJob.company_name} onChange={e => handleInputChange(e, 'company_name')} placeholder="Company Name" />
                <textarea class="edit-textarea" value={editJob.job_description} onChange={e => handleInputChange(e, 'job_description')} placeholder="Job Description"></textarea>
                <input class="edit-input" type="text" value={editJob.job_applied_link} onChange={e => handleInputChange(e, 'job_applied_link')} placeholder="Job Link" />
                <div className="form-buttons">
                  <button className="save-btn" onClick={handleSave}>Save</button>
                  <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            ) : (
              <p>Please add jobs to check the jobs.</p>
            )}
          </div>
        )}
      </div>
    </>
  );

}

export default ViewJobs;

