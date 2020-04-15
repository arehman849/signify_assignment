const express = require('express');
const route = express.Router();

const jobTimeLine = [];
let jobs = [];

const jobAlreadyExist = (item, job) => {
    return item.name === job; 
}
route.get('/getJobs', (req, res) => {
    res.send(jobs);
});

route.post('/postData', (req, res) => {
    /**
     * instead of storing it in a array it has to be sent to DB
     */
    jobTime.push(req.body);
    res.send(req.body);
})

route.put('/updateJob', (req, res) => {
    jobs.forEach((job) => {
        if (job.end.indexOf()) 
        if (job.id === req.body.id) {
            job.start = req.body.start
        }
    })
    console.log(req.body);
})

route.post('/postJob', (req, res) => {
    let exists = false;
    console.log(jobs);
    console.log(req.body);
    jobs.forEach((item) => {
        exists = jobAlreadyExist(item, req.body.job);
    })
    if (!exists) {
        let job = {
            id: jobs.length + 1,
            name: req.body.job,
            color: req.body.color,
            start: '',
            end: ''
        };
        jobs.push(job);
        res.send(job);
    } else {
        res.status(400).send('job already exists');
    }
})

route.post('/postToTimeline', (req, res) => {
    let job = req.body;
    console.log(job);
    job.end = '24:00';
    if(jobTimeLine[jobTimeLine.length - 1])
      jobTimeLine[jobTimeLine.length - 1].end = job.start;
    jobTimeLine.push(job);
    res.send(jobTimeLine);
})

route.get('/getAllTimeLineJobs', (req, res) => {
    res.send(jobTimeLine);
})

module.exports = route;