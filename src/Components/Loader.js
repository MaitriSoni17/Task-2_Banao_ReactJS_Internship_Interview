import React, { Component } from 'react'
import Loading from '../Imgs/Loading.gif';

export class Loader extends Component {
  render() {
    return (
      <div className="text-center my-5 py-5 d-flex justify-content-center align-items-center">
        <img src={Loading} alt=""/>
      </div>
    )
  }
}

export default Loader
