// src/components/WeeklySummary.js
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// const data = [
//   { day: 'Mon', amount: 400 },
//   { day: 'Tue', amount: 650 },
//   { day: 'Wed', amount: 300 },
//   { day: 'Thu', amount: 700 },
//   { day: 'Fri', amount: 500 },
//   { day: 'Sat', amount: 900 },
//   { day: 'Sun', amount: 450 },
// ];

// const WeeklySummary = () => {
//   return (
//     <ResponsiveContainer width="100%" height={500}>
//       <BarChart data={data}>
//         <XAxis dataKey="day" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="amount" fill="#60A5FA" radius={[8, 8, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// };

// export default WeeklySummary;

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';


const data = [
  { day: 'Mon', amount: 400 },
  { day: 'Tue', amount: 650 },
  { day: 'Wed', amount: 300 },
  { day: 'Thu', amount: 700 },
  { day: 'Fri', amount: 500 },
  { day: 'Sat', amount: 900 },
  { day: 'Sun', amount: 450 },
];

// Define custom colors
const COLORS = ['#F7CFD8', '#FDDBBB', '#FFD09B', '#D2E0FB', '#93C5FD', '#BFDBFE', '#1E40AF'];

const WeeklySummary = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeeklySummary;

