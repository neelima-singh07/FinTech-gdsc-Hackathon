
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [state] = React.useState({
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Food', 'Transport', 'Entertainment', 'Bills', 'Others'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 800
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  return (
    <div id="chart">
      <ReactApexChart 
        options={state.options} 
        series={state.series} 
        type="donut" 
        height={500}
      />
    </div>
    
  );
  
};

export default ApexChart; // Must be default export