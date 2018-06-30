import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
const sinon = require('sinon');

import App from './App';
import BlockList from './components/BlockList';
import ReloadButton from './components/ReloadButton';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

const blocks = [{
	block_num: 123,
	id: '003084bed8c705987dfb9a5db4490756daac5be7991f1a9d5697ca708e83aede',
	timestamp: '2018-06-29T01:55:50.500',
	transactions: []
},
{
	block_num: 456,
	id: '003084bed8c705987dfb9a5db4490756daac5be7991f1a9d5697ca708e83aede',
	timestamp: '2018-06-29T01:55:50.500',
	transactions: [1, 2]
}];

const abi = [{
}];

describe('App component testing', () => {
	const blocksStub = sinon.stub(App.prototype, 'fetchBlockAndABIData').returns(blocks);
	const wrapper = shallow(<App />); 

	it('renders 1 BlockList component', () => { 	
		expect(wrapper.find(BlockList)).to.have.length(1);
	})

	it('renders 1 ReloadButton component', () => { 	
		expect(wrapper.find(ReloadButton)).to.have.length(1);
	})
})
