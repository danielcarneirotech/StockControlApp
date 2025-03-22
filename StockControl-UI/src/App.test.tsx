import { render } from '@testing-library/react';
import { App } from './App';

jest.mock('react-toastify', () => ({
  ToastContainer: jest.fn(() => <div>Mocked ToastContainer</div>),
}));

jest.mock('./pages/Home/Home', () => ({
  Home: jest.fn(() => <div>Mocked Home</div>),
}));

describe('App component', () => {
  it('renders Home and ToastContainer components', () => {
    const { getByText } = render(<App />);

    expect(getByText('Mocked Home')).toBeInTheDocument();
    expect(getByText('Mocked ToastContainer')).toBeInTheDocument();
  });
});
