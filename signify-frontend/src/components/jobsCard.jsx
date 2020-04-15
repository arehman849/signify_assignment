import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postJobToTimeline } from '../redux/actions/jobs'

class JobCard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedJob: null,
            hoverOn:{},
            hours:'',
            minutes: ''
        }
        this.resetJob = this.resetJob.bind(this);
        this.updateJob = this.updateJob.bind(this);
    }

    handleHoverOn (e) {
        let name = e.currentTarget.innerText
        let state = this.state;
        state.hoverOn[name] = true;
        this.setState(state)
    }

    handleHoverOff (e) {
        let state = this.state;
        state.hoverOn = {};
        this.setState(state)
    }

    splitTime (job, format) {
        let time = job.start || '00:00';
        if(format === 'hours') {
            time = time.slice(0,2) || '00'
        } else if (format === 'minutes') {
            time = time.slice(3, 5) || '00'
        }
        return time;
    }
    formatTime (num) {
        if (String(num).length === 1) {
            return `0${num}`
        } else {
            return num;
        }
    }

    handleClick(job) {
        let state = this.state;
        state.selectedJob = job;
        state.hours = this.formatTime(this.splitTime(job, 'hours'));
        state.minutes = this.formatTime(this.splitTime(job, 'minutes'));
        this.setState(state);
    }

    changeTime(op, opTime, format) {
        let time = Number(opTime);

        if (op ==='increment') {
            time = ((format === 'hours' && time < 24) || (format === 'minutes' && time < 60)) ? time + 1 : 0;
        }

        if (op === 'decrement') {
            time = ((format === 'hours' && time > 0) || (format === 'minutes' && time > 0)) ? time - 1 : 0;
        }

        let state = this.state;
        state[format] = this.formatTime(time);
        this.setState(state);
    }

    updateJob() {
        let state = this.state;
        state.selectedJob.start = `${this.state.hours}:${this.state.minutes}`;
        this.setState(state, () => {
            this.props.postJobToTimeline(this.state.selectedJob);
        });
    }

    resetJob() {
        let state = this.state;
        state.selectedJob = null;
        state.hours = '';
        state.minutes = '';

        this.setState(state);
    }

    render() {
        console.log(this.state);
        const noJobs = 
            <div className='col align-self-center'>
                <center>
                    <h3>No Jobs Available at the moment / click on choose job to refresh list</h3>
                </center>
            </div>
        const availJobs = 
            <div className='align-self-center p-1'>
                <h3><center>Jobs</center></h3>
                {this.props.allJobs.map(job => {
                    return (
                        <p key={job.id} 
                            style={this.state.hoverOn[job.name] ? {cursor: 'pointer'} : {}} 
                            className={this.state.hoverOn[job.name] ? 'text-muted font-weight-bold border p-1' : 'text-dark'} 
                            onMouseEnter={(e) => this.handleHoverOn(e)} 
                            onMouseLeave={(e) => this.handleHoverOff(e)}
                            onClick={this.handleClick.bind(this, job)}
                            >
                            {job.name}
                        </p>
                    )
                })}
            </div>

            const renderTime = (time, format) => {
                return(
                <div className="input-group">
                    <div className="input-group-prepend">
                        <button 
                            className="btn btn-outline-secondary" 
                            onClick={this.changeTime.bind(this, 'decrement', time, format)}
                            >
                                &lt;
                        </button>
                    </div>
                    <div className='form-control'>{time}</div>
                    <div className="input-group-append">
                        <button 
                            className="btn btn-outline-secondary" 
                            onClick={this.changeTime.bind(this, 'increment', time, format)}
                            >
                                &gt;
                        </button>
                    </div>
                </div>
                )
            }

            const renderTimeBox = job => {
                let name = job && job.name;
                if(job) {
                    return (
                        <div>
                            <h3><center>Job Name : {name}</center></h3>
                            <h5><center>Start Time</center></h5>
                            <div className='row'>
                                <div className='col border'>
                                    <center><h5>Hours</h5></center>
                                    {renderTime(this.state.hours, 'hours')}
                                </div>
                                <div className='col border'>
                                    <center><h5>Minutes</h5></center>
                                    {renderTime(this.state.minutes, 'minutes')}
                                </div>
                            </div>
                            <center>
                                <div className="btn-group mt-3">
                                    <button className="btn btn-danger" onClick={this.resetJob}>Cancel</button>
                                    <button className="btn btn-success" onClick={this.updateJob}>Done</button>
                                </div>
                            </center>
                        </div>
                    )
                } else {
                    return null
                }
            }
        return (
            <div className='mt-5 border'>
                {this.props.allJobs.length < 1 ? noJobs : 
                    <div className='container'>
                        <div className='row'>
                            <div className='col-4 border'>
                                {availJobs}
                            </div>
                            <div className='col-8 border'>
                                {renderTimeBox(this.state.selectedJob)}
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allJobs: state.jobs.allJobs,
        isUpdated: state.jobs.updated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        postJobToTimeline: job => dispatch(postJobToTimeline(job))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);