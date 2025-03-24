import { fireEvent, render, screen } from '@testing-library/react';
import { Home } from './Home';

jest.mock('../../services/api', () => {
  return {
    __esModule: true,
    default: {
      post: jest.fn(),
      get: jest.fn(),
    },
  };
});

describe('Home page component', () => {
  jest.mock('../../services/api', () => {
    return {
      __esModule: true,
      default: {
        post: jest.fn(),
        get: jest.fn(),
      },
    };
  });
  it('should render the Home page component', () => {
    render(<Home />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('should display the correct header title', () => {
    render(<Home />);
    expect(screen.getByTestId('home-header-title')).toHaveTextContent('Fitshop Stock System');
  });

  it('should have products tab active by default', () => {
    render(<Home />);
    expect(screen.getByTestId('nav-container')).toBeInTheDocument();
    expect(screen.getByTestId('products-tab')).toHaveClass('active');
    expect(screen.queryByTestId('stock-report-tab')).not.toHaveClass('active');
  });

  it('should switch to Add Transaction tab when clicked', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('add-transaction-tab'));
    expect(screen.getByTestId('add-transaction-tab')).toHaveClass('active');
    expect(screen.queryByTestId('stock-report-tab')).not.toHaveClass('active');
  });

  it('should switch to Stock Report tab when clicked', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('stock-report-tab'));
    expect(screen.getByTestId('stock-report-tab')).toHaveClass('active');
    expect(screen.queryByTestId('add-transaction-tab')).not.toHaveClass('active');
  });

  it('should render Products component by default', () => {
    render(<Home />);
    expect(screen.getByTestId('products-tab')).toHaveClass('active');
  });

  it('should render StockReport component when Stock Report tab is active', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('stock-report-tab'));
    expect(screen.getByTestId('stock-report-tab')).toHaveClass('active');
  });

  it('should switch to Products tab when clicked', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('products-tab'));
    expect(screen.getByTestId('products-tab')).toHaveClass('active');
    expect(screen.queryByTestId('add-transaction-tab')).not.toHaveClass('active');
    expect(screen.queryByTestId('stock-report-tab')).not.toHaveClass('active');
  });

  it('should render Products component when Products tab is active', () => {
    render(<Home />);
    fireEvent.click(screen.getByTestId('products-tab'));
    expect(screen.getByTestId('products-tab')).toHaveClass('active');
  });
});
