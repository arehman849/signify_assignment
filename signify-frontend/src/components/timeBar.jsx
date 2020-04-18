import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import {getAllJobs} from '../redux/actions/jobs'

class TimeBar extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.getAllJobs();
    }
    render() { 
        console.log(this.props);
        const timeScale = () => {
            let comp = []
            for(let i = 1; i < 25; i++) {
             comp.push(<div className='border-left border-dark' key={i} style={{flex:1, textAlign: 'right'}}>{i}</div>)
            }
            return comp;
        }
        const changeStartTime = (e) => {
            window.confirm(e.target.getAttribute('data-start'));
        }
        const renderTimeBar = () => {
            let jobs = this.props.timelineJobs
            jobs = jobs.sort((a, b) => a.timeInHundredths - b.timeInHundredths);
            let comp = [];
            comp.push(<div className="border-left border-dark" key='emptySpace' style={{flex:jobs[0].timeInHundredths - 0, backgroundColor: 'white'}}></div>)
            jobs.forEach((job, index) => {
                    if (jobs[index + 1]) {
                        console.log(job.color)
                        comp.push(<div onClick={(e)=> changeStartTime(e)}className="border-left border-dark" key={index} style={{flex:jobs[index + 1].timeInHundredths - job.timeInHundredths, backgroundColor: job.color}} data-start={job.start}></div>)
                    }
                })
            
            comp.push(<div onClick={(e)=> changeStartTime(e)} className="border-left border-dark" key='lastSpace' style={{flex:24 - jobs[jobs.length - 1].timeInHundredths, backgroundColor: jobs[jobs.length - 1].color}} data-start={jobs[jobs.length - 1].start}></div>)
            return comp;
        }
        return ( 
            <div className='container mt-5'>
                <div className='row'  style={{height: '100px'}}>
                    <div className='col-2 h-100 p-0'>
                        <button className='btn btn-primary btn-block h-100' onClick={this.handleClick}>choose job</button>
                    </div>
                    <div className='col-10 border h-100 p-0'>
                        <div className='h-75' ref={this.colorDivRef} >
                        <div className="border" style={{flex:24, display: 'flex',  height: '100%'}}>
                            {this.props.timelineJobs.length && renderTimeBar()}
                        </div>
                        </div>
                        <div className='h-25 border'>
                            <div style={{flex:24, display: 'flex',  height: '100%'}} >
                                {timeScale()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAllJobs: () => dispatch(getAllJobs())
    }
}

const mapStateToProps = state => {
    return {
        timelineJobs: state.jobs.timeline
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(TimeBar);