import React, { Component } from 'react';
//import { convertBytes } from './bytesConverter';
//import moment from 'moment'

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5 text-center">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
            <div className="content">
              <p>&nbsp;</p>
              <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Upload your Artwork here</ins></b></h2>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const description = this.fileDescription.value
                  this.props.uploadFile(description)
                }} >
                  <div className="form-group">
                    <br></br>
                    <input
                      id="fileDescription"
                      type="text"
                      ref={(input) => { this.fileDescription = input }}
                      className="form-control text-monospace"
                      placeholder="Input tags for your artwork..."
                      required />
                  </div>
                  <input type="file" onChange={this.props.captureFile} className="text-white text-monospace" />
                  <button type="submit" className="btn-primary btn-block"><b>Upload!</b></button>
                </form>
              </div>
              <p>&nbsp;</p>
              <p>&nbsp;&nbsp;</p>
              <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '412px', maxHeight: '200px' }}>
                <h2 className="text-white text-monospace bg-dark"><b><ins>Search your Image here</ins></b></h2>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const keyword = this.imageKeyword.value
                  this.props.searchSubmit(keyword)
                }} >
                  <div className="form-group">
                    <br></br>
                    <input
                      id="imageKeyword"
                      type="text"
                      ref={(input) => { this.imageKeyword = input }}
                      className="form-control text-monospace"
                      placeholder="Input keyword to search..."
                      required />
                  </div>
                  <button type="submit" className="btn-primary btn-block"><b>Search</b></button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}
export default Main;