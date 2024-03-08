import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const BarChartDashboard: React.FC = () => {
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('bar-chart'));

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'bar'
      }]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="bar-chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default BarChartDashboard;
