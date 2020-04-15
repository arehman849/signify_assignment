import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';

import {getAllJobs} from '../redux/actions/jobs'

class TimeBar extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }
    colorDivRef = createRef();
    componentDidMount() {
        const data = [ 2, 4, 2, 6, 8 ]
        // this.drawBarChart(data)
    }

    handleClick() {
        this.props.getAllJobs();
    }

//     drawBarChart(data)  {
//         const canvasHeight = 400
// const canvasWidth = 600
// const scale = 20
// const svgCanvas = d3.select(this.refs.canvas)
//     .append('svg')
//     .attr('width', canvasWidth)
//     .attr('height', canvasHeight)
//     .style('border', '1px solid black')
// svgCanvas.selectAll('rect')
//     .data(data).enter()
//         .append('rect')
//         .attr('width', (datapoint) => datapoint * scale)
//         .attr('height', 40)
//         .attr('fill', 'orange')
//         .attr('x', (datapoint, iteration) => iteration * 45)
//         .attr('y', 0)
//     }
    render() { 
        console.log(this.props);
        return ( 
            <div className='container mt-5'>
                <div className='row'  style={{height: '100px'}}>
                    <div className='col-2 h-100 p-0'>
                        <button className='btn btn-primary btn-block h-100' onClick={this.handleClick}>choose job</button>
                    </div>
                    <div className='col-10 border h-100 p-0'>
                        <div className='h-75 border' ref={this.colorDivRef} >
                            colors here
                        </div>
                        <div className='h-25 border'>
                            scale here
                        </div>
                    </div>
                </div>
                {/* <div ref="canvas"></div>  */}
            </div>
         );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getAllJobs: () => dispatch(getAllJobs()),
    }
}

const mapStateToProps = state => {
    return {
        
    }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(TimeBar);