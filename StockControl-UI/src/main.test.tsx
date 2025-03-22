import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './main';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn().mockReturnValue({
    render: jest.fn(),
  }),
}));
jest.mock('./services/api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('Main entry point', () => {
  it('renders the App component', () => {
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    const mockedRoot = createRoot(rootElement);

    expect(createRoot).toHaveBeenCalledWith(rootElement);
    expect(mockedRoot.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});
