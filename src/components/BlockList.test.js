import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import BlockList from './BlockList';
import Block from './Block';
import RawBlock from './RawBlock';

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

describe('BlockList component testing', () => {
	const wrapper = shallow(<BlockList blocks={blocks} />); 

	it('renders 1 <table> tag with class blocklist', () => {
	expect(wrapper.find('.blocklist')).to.have.length(1);
	});
  
	it('renders 3 <th> tags', ()  => {
		expect(wrapper.find('th')).to.have.length(3);
	});
  
	it('renders 2 Block components and 0 RawBlock components', () => {
		expect(wrapper.find(Block)).to.have.length(2);
		expect(wrapper.find(RawBlock)).to.have.length(0);
	});
  
	it('renders 2 Block components and 1 RawBlock component after click on a row', () => {
		wrapper.find('tr').simulate('click');
		expect(wrapper.find(Block)).to.have.length(2);
		expect(wrapper.find(RawBlock)).to.have.length(0);
	});
});