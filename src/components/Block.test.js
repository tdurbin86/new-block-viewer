import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';

import Block from './Block';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

const block={
	block_num: 123,
	id: 'td003084bed8c705987dfb9a5db4490756daac5be7991f1a9d5697ca708e83aede',
	timestamp: '2018-06-29T01:55:50.500',
	transactions: []
};

describe('testing Block component', () => {
	const wrapper = shallow(<Block key={block.block_num}/>);

	it('renders 1 <tr> tag with class block', () => {
		expect(wrapper.find('tr.block')).to.have.length(1);
	});
	
	it('renders 3 <td> tags', () => {
		expect(wrapper.find('td')).to.have.length(3);
	});
});