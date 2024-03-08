import { Carousel, Card } from 'antd';

const bestSellingProducts = [
  { id: 1, name: 'Product 1', imageUrl: 'dr_stone_group.png', price: '$100' },
  { id: 2, name: 'Product 2', imageUrl: 'image2.jpg', price: '$120' },
  { id: 3, name: 'Product 3', imageUrl: 'image3.jpg', price: '$80' },
];

const BigCard = () => {

  return (
    <Card className='big-card'>
    <Carousel autoplay>
      {bestSellingProducts.map(product => (
        <div key={product.id} style={{ position: 'relative' }}>
          <img
            src={`/${product.imageUrl}`}
            alt={product.name}
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
