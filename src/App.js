import React, { Component } from 'react';
import './App.css';

// import the Block components
import ReloadButton from "./components/ReloadButton";
import BlockList from "./components/BlockList";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			blocks: []
		};
	}
    
	async fetchBlocks() {
		try {
			let response = await fetch('/api/blocks', {
				accept: 'application/json'
			}) 
		
			let newBlocks = await response.json();

			// create a new state object
			const newState = Object.assign([], this.state, {
				blocks: newBlocks
			});
		
			// store the new state in the component's state
			this.setState(newState);
		}
		catch(error) {
			console.log(error);
		}
	}

	componentDidMount() {
		this.fetchBlocks();
	}
	
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">New EOS Block Viewer</h1>
        </header>
        <div className="ReloadButton">
   		    <ReloadButton value="Click to Refresh" onClick={() => this.fetchBlocks()}/> 
        </div>
        <br/>
	        <div>
	        	<BlockList blocks={this.state.blocks} />
        	</div>
      </div>
    );
  }
}

export default App;
