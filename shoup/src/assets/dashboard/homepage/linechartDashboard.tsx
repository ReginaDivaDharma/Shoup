import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const LineChartDashboard = () => {
  const [data, setData] = useState<number[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/artworks_year');
        const jsonData = await response.json();
        
        const artworkName = jsonData.map((item: any) => item.artwork_name);
        const artworkSoldQty = jsonData.map((item: any) => item.sold_artwork_qty);

        setData(artworkSoldQty);
        setCategory(artworkName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

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
        data: category,
        // axisLabel: {
        //   rotate: 45
        // }
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: data,
        type: 'line'
      }],
      dataZoom: [
        {
          type: 'slider', 
          start: 0, 
          end: 30 
        },
      ]
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="line-chart" style={{ width: '100%', height: '400px' }}></div>;
};

export default LineChartDashboard;