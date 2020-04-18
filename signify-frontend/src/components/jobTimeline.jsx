import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTimelineJobs } from '../redux/actions/jobs'


class JobTimeline extends Component {
    componentDidMount() {
        this.props.getTimelineJobs();
    }
    render() { 
        let timelineJobs = this.props.timelineJob;
        if (timelineJobs.length > 0) {
            timelineJobs = timelineJobs.sort((a,b) => a.timeInHundredths - b.timeInHundredths);
            return ( 
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Job Id</th>
                            <th>Name</th>
                            <th>Start</th>
                            <th>End</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timelineJobs.map((job, index) => {
                            return (
                                <tr key={index + 1}>
                                    <td>{index + 1}</td>
                                    <td>{job.id}</td>
                                    <td>{job.name}</td>
                                    <td>{job.start}</td>
                                    <td>{timelineJobs[index + 1] ? timelineJobs[index + 1].start : '24: 00'}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
             );
        } else {
            return (
                <div className='mt-4'>
                    <center><h3>Add Jobs To Timeline</h3></center>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        timelineJob: state.jobs.timeline
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getTimelineJobs: () => dispatch(getTimelineJobs())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(JobTimeline);