import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const BarChartDashboard: React.FC = () => {
  const [data, setData] = useState<number[]>([]);
  const [xAxisData, setXAxisData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/artworktype');
        const jsonData = await response.json();
        
        const artworkTypes = jsonData.map((item: any) => item.artwork_type);
        const totalQuantities = jsonData.map((item: any) => item.total_qty);

        setData(totalQuantities);
        setXAxisData(artworkTypes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

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
        data: xAxisData,
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: data,
        type: 'bar'
      }]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [data, xAxisData]);

  return <div id="bar-chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default BarChartDashboard;
