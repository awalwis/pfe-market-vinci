import Enzyme from 'enzyme';

// Add your adapter version below
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

test('fake test', () => {
    expect(null).toBeNull()
});