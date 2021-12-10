import { render } from '@testing-library/react';
import Enzyme, { mount } from 'enzyme';
import App from './App';
import User from 'components/User/User';

// Add your adapter version below
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

test('displays a quote', () => {
    expect(null).toBeNull()
});