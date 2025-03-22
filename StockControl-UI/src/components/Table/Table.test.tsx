import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "./Table";

interface TestData {
  id: number;
  name: string;
}

const columns: { header: string; accessor: keyof TestData }[] = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
];

const data: TestData[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
];

test("renders table with data", () => {
  render(<Table dataTestId="test-table" columns={columns} data={data} />);
  expect(screen.getByTestId("table test-table")).toBeInTheDocument();
  expect(screen.getByText("ID")).toBeInTheDocument();
  expect(screen.getByText("Name")).toBeInTheDocument();
  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("Jane Smith")).toBeInTheDocument();
});

test("renders table with no data message", () => {
  render(<Table dataTestId="test-table" columns={columns} data={[]} />);
  expect(screen.getByTestId("table test-table")).toBeInTheDocument();
  expect(screen.getByText("No data available")).toBeInTheDocument();
});

test("renders table with custom no data message", () => {
  render(
    <Table
      dataTestId="test-table"
      columns={columns}
      data={[]}
      noDataMessage="Custom no data message"
    />
  );
  expect(screen.getByTestId("table test-table")).toBeInTheDocument();
  expect(screen.getByText("Custom no data message")).toBeInTheDocument();
});
