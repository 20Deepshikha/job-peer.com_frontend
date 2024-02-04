import React, {useEffect, useState} from 'react'
import './addJobs.css'
import api from '../../../config/axios'

function AddJobs() {
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
        const job = {
            'job_title' : jobTitle,
            'company_name' : companyName,
            'job_description' : jobDescription,
            'job_applied_link' : jobLink,
            'appliedThrough' : appliedThrough, 
        }
        console.log(job)
        try {
            const sendJobData = await api.post(`/saveJob/${storedUser}`, job);
            console.log(sendJobData);
    
            // Reset form fields after successful submission
            setJobTitle('');
            setCompanyName('');
            setJobDescription('');
            setAppliedThrough('');
            setJobLink('');
            
        } catch (error) {
            console.error('Error submitting job:', error);
        }
    }
    return (
        <>
            <div>
                <h1>AddJobs</h1>
            </div>
            <div className='job-form'>
                <form onSubmit={handleJobSubmit}>
                <div className='job-form-input'>
                    <label>Job Title</label>
                    <input type="text" value={jobTitle} placeholder='Full Stack Software Developer' onChange={(e)=>{setJobTitle(e.target.value)}}/>
                </div>

                <div className='job-form-input'>
                    <label>Company Name</label>
                    <input type="text" value={companyName} placeholder='Google'  onChange={(e)=>{setCompanyName(e.target.value)}} />
                </div>

                <div className='job-form-input'>
                    <label>Job Description</label>
                    <textarea value={jobDescription} placeholder='Job Description' rows="4" cols="50"  onChange={(e)=>{setJobDescription(e.target.value)}}></textarea>
                </div>

                <div className='job-form-input'>
                    <label>Applied Through</label>
                    <input type="text" value={appliedThrough} placeholder='LinkedIn'  onChange={(e)=>{setAppliedThrough(e.target.value)}}/>
                </div>

                <div className='job-form-input'>
                    <label>Job Link</label>
                    <input type="text" value={jobLink} placeholder='https://www.googlejobs/softwaredev10208028408/jobs.com'  onChange={(e)=>{setJobLink(e.target.value)}}/>
                </div>
                <br/>
                <div className='job-form-input-btn'>
                    <input 
                    type="submit" 
                    value="Submit"
                    ></input>
                </div>
                
                </form>
            </div>

        </>
    )
}

export default AddJobs