import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const PiechartDashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user_sold'); 
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const myChart = echarts.init(document.getElementById('pie-chart'));

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: data.map(item => item.user_name)
      },
      series: [
        {
          name: 'Pie Chart',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '30',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data.map(item => ({ value: item.total_sold, name: item.user_name }))
        }
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div id="pie-chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default PiechartDashboard;
