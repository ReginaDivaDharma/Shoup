import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const LineChartDashboard = () => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('line-chart'));

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="line-chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default LineChartDashboard;