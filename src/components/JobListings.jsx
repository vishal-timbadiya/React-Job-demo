import React, { useEffect, useState } from 'react'
import JobListing from './JobListing';
import Spinner from './Spinner'

const JobListings = ({ isHome= false }) => {
const [jobs, setjobs] = useState([]);
const [loading, setloading] = useState(true);

useEffect(() => {
  const fetchjobs = async () => {
    const apiurl = isHome ? 'http://localhost:8000/jobs?_limit=3' : 'http://localhost:8000/jobs';
    try {
      const res = await fetch(apiurl);
const data = await res.json();
setjobs(data);
    } catch (error) {
      console.log('error fatching ', error)
    } finally {
      setloading(false);
    }

  }

  fetchjobs();
}, [])

  return (
    <section className='bg-blue-50 px-4 py-10'>
    <div className='container-xl lg:container m-auto'>
      <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
      {isHome ? 'Recent Jobs' : 'Browser Jobs'}
      </h2>
      {loading ? <Spinner /> : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {jobs.map((job) => (
          <JobListing key={job.id} job={job}/>
          ))}
        </div>
        )}
    
    </div>
  </section>
  )
}

export default JobListings