import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from './Select';

describe('Select Component', () => {
  const mockOptions = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
  ];

  const mockOnChange = jest.fn();

  it('renders correctly with given props', () => {
    render(
      <Select
        name="test-select"
        dataTestId="select"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        placeholder="Select an option"
        id="test-select"
      />
    );

    expect(screen.getByTestId('select')).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onChange when an option is selected', () => {
    render(
      <Select
        name="test-select"
        dataTestId="select"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        id="test-select"
      />
    );

    fireEvent.change(screen.getByTestId('select'), { target: { value: '1' } });
    expect(mockOnChange).toHaveBeenCalledWith('1');
  });

  it('displays the correct value when an option is selected', () => {
    render(
      <Select
        name="test-select"
        dataTestId="select"
        options={mockOptions}
        value="2"
        onChange={mockOnChange}
        id="test-select"
      />
    );

    expect(screen.getByTestId('select')).toHaveValue('2');
  });

  it('renders required attribute when required prop is true', () => {
    render(
      <Select
        name="test-select"
        dataTestId="select"
        options={mockOptions}
        value=""
        onChange={mockOnChange}
        required={true}
        id="test-select"
      />
    );

    expect(screen.getByTestId('select')).toBeRequired();
  });
});
