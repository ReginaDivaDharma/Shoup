import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';

const LineChartDashboard = () => {
  const [data, setData] = useState<number[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/artworks_year');
        const jsonData = await response.json();
        
        const artworkName = jsonData.map((item: any) => item.artwork_name);
        const artworkSoldQty = jsonData.map((item: any) => item.sold_artwork_qty);

        setData(artworkSoldQty);
        setCategory(artworkName);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); 
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && data.length > 0 && category.length > 0) {
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
    }
  }, [loading, data, category]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : data.length > 0 && category.length > 0 ? (
        <div id="line-chart" style={{ width: '100%', height: '400px' }}></div>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default LineChartDashboard;
