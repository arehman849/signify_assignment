import React from 'react';
import TimeBar from './components/timeBar';
import JobCard from './components/jobsCard';
import AddJobs from './components/addJobs';
import JobTimeline from './components/jobTimeline';
import './App.css';

function App() {
  return (
    <div className='container'>
      <AddJobs />
      <TimeBar />
      <JobCard />
      <JobTimeline />
    </div>
  );
}

export default App;
