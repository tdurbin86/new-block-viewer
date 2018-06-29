import { shallow } from 'enzyme';
import { Block } from './Block';
 
describe('testing Block component', () => {
	let wrapper;
	beforeEach(() => {wrapper = shallow(<Test />); });
	
	it('includes 1 tr with class block', () => {
		expect(wrapper.find('tr.block')).to.have.lengthOf(1);
	});
});