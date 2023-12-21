import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

function ChartOne() {

    ChartJS.register(ArcElement, Tooltip, Legend);
     const data = {
      labels: ['Feb(0.15%)','March(10.06%)','May(19.12%)','June(1.51%)','July(3.45%)','Aug(3.98%)','Sep(4.50%)','Oct(6.02%)','Nov(39.83%)','Dec(11.32%)'],
      datasets: [
        {
          label: '%',
          // data: [3, 192, 365, 29, 66, 76,98,86,115,760,216],
          data:[0.15,10.06,19.12,1.51,3.45,3.98,4.50,6.02,39.83,11.32],
          backgroundColor: [
            '#7FB3D5',
            '#A3D6A6',
            '#FFD56B',
            '#FFAB89',
            '#FFE680',
            '#99C2FF',
            '#FF99B4',
            '#D98AFF',
            '#B3B3FF',
            '#7FB3D5'

          ],
          borderColor: [
            '#8c8c8c'
          ],
          Text:[
            'jan',
            'feb',
            'march',
            'april',
            'may',
          ],
          borderWidth: 1,
        },
      ],
    };

    const options = {
        maintainAspectRatio: false, // This property allows you to set your own aspect ratio.
        responsive: true,
      };

  return (
    <div className='donut' >
    <h2 className='first-graph'>Month vs Revenue</h2>
      <Doughnut className='chart-one'  options={options} data={data}/>
    </div>
  )
}

export default ChartOne

