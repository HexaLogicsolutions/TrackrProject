import React, { Component } from 'react'

export default class Demo extends Component {
  render() {
    return (
      <div>
        <center>
        <form ref='uploadForm' 
			id='uploadForm' 
			action='/upload' 
			method='post' 
			encType="multipart/form-data">
				<input type="file" name="sampleFile" />
				<input type='submit' value='Upload!' />
		</form>		
        </center>
        
      </div>
    )
  }
}
