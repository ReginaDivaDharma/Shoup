import { Carousel, Card } from 'antd';
import React, { useState, useEffect } from 'react';

interface Product {
  artwork_id: number;
  artwork_name: string;
  artwork_image: string;
}

const BigCard = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/transactiontop3');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Fetched data:', result); // Log the fetched data
            setBestSellingProducts(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
  
  return (
    <Card className='big-card'>
    <Carousel autoplay>
      {bestSellingProducts.map(data => (
        <div key={data.artwork_id} style={{ position: 'relative' }}>
          <img
           src={`../../drawing/group/${data.artwork_image}`} 
            alt={data.artwork_name}
            style={{ width: '100%', height: '400px' }}
          />
        </div>
      ))}
    </Carousel>
    <h1 style={{
      fontFamily: 'Abril Fatface',
      fontWeight: 'bold',
      color: '#364D79',
      textAlign: 'center'
    }}>
      Our Best Sellings!</h1>
    </Card>
  );
};

export default BigCard;
