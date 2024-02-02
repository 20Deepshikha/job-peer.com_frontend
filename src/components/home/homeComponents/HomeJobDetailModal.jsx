import React from 'react';
import './HomeJobDetailModal.css';
import { useNavigate } from 'react-router-dom';

function JobDetailsModal({ job, closeModal }) {

    const navigate = useNavigate();
    const handleDetails = () => {
        navigate(`/job_details/${job.id}`)
    }

    return (
        <div className='job-details-modal'>
            <div className='job-details-content'>
                <button style={{ marginLeft: '90%', marginTop: '1%', border: 'none' }} onClick={closeModal}>X</button>
                <h2>Job Details</h2>
                <p><strong>Title:</strong> {job.job_title}</p>
                <p><strong>Company:</strong> {job.company_name}</p>
                <p><strong>Applied On:</strong> {new Date(job.job_applied_date).toLocaleDateString()}</p>
                <p style={{wordBreak: 'break-word'}}><strong>Job Link:</strong> <a href={job.job_applied_link} target="_blank" rel="noopener noreferrer">{job.job_applied_link}</a></p>
                <p><strong>Status:</strong> {
                    job.application_processing && job.following_up
                        ? 'Processing & Following Up'
                        : job.rejected && job.following_up
                            ? 'Rejected & Following Up, Do not lose hope you can still make it happen'
                            : job.application_processing
                                ? 'Processing'
                                : job.interviewing
                                    ? 'Interviewing'
                                    : job.rejected
                                        ? 'Rejected'
                                        : job.following_up
                                            ? 'Following Up'
                                            : 'No Status Selected'
                } </p>
                <button className='d-btn' onClick={handleDetails}>More Details</button>
            </div>
        </div>
    );
}

export default JobDetailsModal;
