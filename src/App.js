import React, { Component } from 'react';
import './App.css';

// import the Block components
import ReloadButton from "./components/ReloadButton";
import BlockList from "./components/BlockList";

const mustache = require('mustache');
const MarkdownIt = require('markdown-it');
const markdown = new MarkdownIt();

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
		
			return await response.json();
		}
		catch(error) {
			console.log(error);
		}
	}
    
   // Could be refactored to only request the ABI data if do not already have it
	async fetchABIs(accounts) {
		try {
			let abiRequests=[];
			for (let i=0; i<accounts.length; i++) {
				abiRequests[i] = fetch('/api/abi?account=' + accounts[i], {
					accept: 'application/json'
				})
			}
			
			// all the requests should execute concurrently
			const abiResponses = await Promise.all(abiRequests);
		
			let newABIs = [];
			for(let i=0; i<abiResponses.length; i++) {
				newABIs[i] = await abiResponses[i].json();
			}

			return newABIs;
		}
		catch(error) {
			console.log(error);
		}
	}

	async fetchBlockAndABIData() {
		try {
			const newBlocks = await this.fetchBlocks();
			
			// identify accounts in block
			const accounts = [];
			newBlocks.forEach(item => {
				if(item.transactions.length > 0) {
					item.transactions.forEach(tran => {
						if(tran.trx.transaction != undefined)
						{
							if(tran.trx.transaction.actions.length > 0) {
								tran.trx.transaction.actions.forEach(action => {
									if(!accounts.includes(action.account)) {
										accounts.push(action.account);
									}
								}) 
							}
						}
					})
				}
			});

			// fetch the ABIs
			let newABIs = [];
			if(accounts.length > 0) {
				newABIs = await this.fetchABIs(accounts);
			}
			
			// map the ricardian contracts and add to the blocks for display.  BlockList should not know how to do this
			this.mapContracts(newBlocks, newABIs);
			
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
	
	mapContracts(blocks, abis) {
		// map the contracts for each block
		blocks.forEach(block => {
			block.ricardianContracts = [];
			if(block.transactions.length > 0) {
				block.transactions.forEach(tran => {
					if(tran.trx.transaction != undefined)
					{
						if(tran.trx.transaction.actions.length > 0) {
							tran.trx.transaction.actions.forEach(blockAction => {
								// find the correct abi record
								const abiIndex = abis.findIndex((abi) => {
									return abi.account_name == blockAction.account;
								});
							
								// find the correct abi action
								const abi = abis[abiIndex].abi;
								const abiActionIndex = abi.actions.findIndex((abiAction) => {
									return abiAction.name == blockAction.name;
								});
							
								// mustache and markdown-it
								const mustacheOutput = mustache.render(abi.actions[abiActionIndex].ricardian_contract, blockAction.data);
								const markdownOutput = markdown.render(mustacheOutput);
							
								// add the record to the list of contracts for this block
								block.ricardianContracts.push(markdownOutput);
							})
						}
					}
				})
			}
		});
	}
	
	componentDidMount() {
		this.fetchBlockAndABIData();
	}
	
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">New EOS Block Viewer</h1>
        </header>
        <div className="ReloadButton">
   		    <ReloadButton value="Click to Refresh" onClick={() => this.fetchBlockAndABIData()}/> 
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
