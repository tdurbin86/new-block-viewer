const Eos = require('eosjs');
const express = require("express");

const app = express();

app.set("port", process.env.PORT || 3001);

app.get("/api/blocks", (req, res) => {
	console.log('received a request for blocks');
	getBlocks()
	.then(function(blocks) {
		res.json(blocks);
	})
	.catch (function(error) {
		console.error(error);
		res.send([]);
	});
});

app.get("/api/abi", (req, res) => {
	const account = req.query.account;
	console.log('received a request for abi: ' + account);
	getABI(account)
	.then(function(abi) {
		res.json(abi);
	})
	.catch (function(error) {
		console.error(error);
		res.send([]);
	});
});

// Default EOS configuration
const config = {
	chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
	httpEndpoint: 'https://eos.greymass.com',
	expireInSeconds: 30,
	verbose: false,
	sign: false
}

// create EOS connections
console.log('Creating connection to EOS endpoint: ' + config.httpEndpoint);
const eos = Eos(config);

async function getABI(account) {
	try {
		console.log('Getting ABI data...');
		let abiResponse = await eos.getAbi(account);
		
		return abiResponse;
	}
	catch (error) {
		console.error(error); 
		throw error;  // TO DO: any reason to log the error here (or even catch it).  maybe remove try/catch
	}
}

async function getBlocks() {
	try {
		console.log('Getting chain info...');
		let info = await eos.getInfo({});
		console.dir(info);

		console.log('Getting blocks: ' + (info.head_block_num - 9) + ':' + info.head_block_num);
		let blockRequests=[];
		for (let i=0; i<10; i++) {
			blockRequests[i] = eos.getBlock({block_num_or_id: info.head_block_num - 9 + i});
		}
		
		let blocks = await Promise.all(blockRequests);
		
		return blocks;
	}
	catch (error) {
		console.error(error); 
		throw error;  // TO DO: any reason to log the error here (or even catch it).  maybe remove try/catch
	}
}

// start the server
app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});