import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';

import RawBlock from './RawBlock';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

const block={
	block_num: 123,
	id: 'td003084bed8c705987dfb9a5db4490756daac5be7991f1a9d5697ca708e83aede',
	timestamp: '2018-06-29T01:55:50.500',
	transactions: []
};

describe('testing RawBlock component', () => {
	const wrapper = shallow(<RawBlock raw={JSON.stringify(block)}/>);

	it('renders 1 <tr> tag with class rawblock', () => {
		expect(wrapper.find('tr.rawblock')).to.have.length(1);
	});
	
	it('renders 1 <td> tag', () => {
		expect(wrapper.find('td')).to.have.length(1);
	});
});