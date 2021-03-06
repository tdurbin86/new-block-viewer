import React, { Component } from 'react';
import "./BlockList.css";

// import the Block components
import Block from "./Block";
import RawBlock from "./RawBlock";

class BlockList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expandedRows: []
		};
	}
	
	handleRowClick(rowBlockNum) {
		const currentExpandedRows = this.state.expandedRows;
		const isRowCurrentlyExpanded = currentExpandedRows.includes(rowBlockNum);
        
		const newExpandedRows = isRowCurrentlyExpanded ? 
			currentExpandedRows.filter(id => id !== rowBlockNum) : 
			currentExpandedRows.concat(rowBlockNum);
        
		this.setState({expandedRows : newExpandedRows});
	}
	
  render() {
		let allRows = [];

		this.props.blocks.forEach(item => {
			const currentRow = <Block key={item.block_num} id={item.id} timestamp={item.timestamp}
				actions={item.transactions.length} onClick={() => this.handleRowClick(item.block_num)} />
			allRows = allRows.concat(currentRow);
		
			if (this.state.expandedRows.includes(item.block_num)) {
				const rawContent = JSON.stringify(item, function(key, val) {
					if(key == "ricardianContracts") {
						return undefined;
					}
					return val;
				});
				const expandedRow = <RawBlock key={item.id} raw={rawContent}/>
				allRows = allRows.concat(expandedRow);
				
				for(let i=0; i<item.ricardianContracts.length; i++) {
					if (item.ricardianContracts[i].length > 0) {
						const expandedRow2 = <RawBlock key={item.id + i} raw={"RICARDIAN CONTRACT: " +
							item.ricardianContracts[i]}/>
						allRows = allRows.concat(expandedRow2);
					}
				}
			}
		});
	
		return (
			<table className="blocklist">
				<thead>
		    		<tr>
   			 			<th>Hash</th>
    					<th>Timestamp</th>
 		   				<th>Actions</th>
 	   	  			</tr>
   		   		</thead>
      			<tbody>{allRows}</tbody>
    	  	</table>
		);
	}
}

export default BlockList;