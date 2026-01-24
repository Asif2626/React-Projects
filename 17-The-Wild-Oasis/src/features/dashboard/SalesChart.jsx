import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const fakeData = [
  { label: "Jan 09", totalSales: 480, extrasSales: 20 },
  { label: "Jan 10", totalSales: 580, extrasSales: 100 },
  { label: "Jan 11", totalSales: 550, extrasSales: 150 },
  // ...rest of the data
];

const isDarkMode = true;
const colors = isDarkMode
  ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
  : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

const SalesChart = () => {
  return (
    <StyledSalesChart>
      <Heading as="h2">Sales</Heading>
      <AreaChart data={fakeData} height={300} width={700}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" stroke={colors.text} />
        <YAxis stroke={colors.text} />
        <Tooltip />
        <Area
          dataKey="totalSales"
          type="monotone"
          stroke={colors.totalSales.stroke}
          fill={colors.totalSales.fill}
        />
      </AreaChart>
    </StyledSalesChart>
  );
};

export default SalesChart;
