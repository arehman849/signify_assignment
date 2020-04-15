import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addJobs } from '../redux/actions/addJobs'

class AddJobs extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            jobName:'',
            randomColor: ''
        }
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    handleClick = () => {
        const color = this.getRandomColor();
        this.props.addJob({job: this.state.jobName, color})
        this.setState({jobName: ''});
    }

    handleChange = e => {
        this.setState({jobName: e.currentTarget.value})
    }

    render() {
        return (
            <Fragment> 
                <center><h1>Add Jobs</h1></center>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> Enter Job Name</span>
                    </div>
                    <input type="text" className="form-control" placeholder="Job Name" name='jobChange' onChange={e => this.handleChange(e)} value={this.state.jobName}/>
                    <button type="button" className="btn btn-primary" onClick={this.handleClick}>Add Job</button>
                </div>
                {this.props.addJobError ? <center>{this.props.addJobError}</center>: <center>{this.props.addJobs}</center>}
            </Fragment>
         );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addJob: job => dispatch(addJobs(job))
    }
}

const mapStateToProps = state => {
    return {
        addJobs: state.addJob.addJobs,
        addJobError: state.addJob.addJobError
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AddJobs);