import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import { expect } from 'chai';
const sinon = require('sinon');

import ReloadButton from './ReloadButton';

import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() });

function fetchDataStub() {};

describe('testing ReloadButton component', () => {
//	let stub = sinon.stub(ReloadButton.prototype, 'onClick').returns(true);
	var spy = sinon.spy();
	const wrapper = shallow(<ReloadButton onClick={spy}/>);

	it('renders 1 <button> tag with class reloadbutton', () => {
		expect(wrapper.find('button.reloadbutton')).to.have.length(1);
	});
	
	it('expect fetchData to be called on each click of the button', () => {
		wrapper.find('button').simulate('click');
		expect(spy.calledOnce).to.equal(true);
		wrapper.find('button').simulate('click');
		expect(spy.calledTwice).to.equal(true);
	});
});