import React from 'react';
import { Layout, Row, Col, Card, Button } from 'antd';
import '../../../global.css';
import BigCard from '../../../assets/dashboard/homepage/bigCard';
import LineChartDashboard from '../../../assets/dashboard/homepage/linechartDashboard';
import BarChartDashboard from '../../../assets/dashboard/homepage/barchartDashboard';

const { Content, Footer } = Layout;

const HomepageDashboard: React.FC = () => {
  
  return (
    <Layout>
      <Content style={{ backgroundColor: '#A8C7E6', minHeight: '540px' }}>
          <Row>
            <Col span={12}>
            <div className='content-item-left'>
              <h1 className='headline' style={{color:'#364D79'}}>
                Welcome to Shoup! Where Magic Begins
              </h1>
              <p className='content-text' style={{color:'#364D79'}}>
              Welcome to Shoup, a unique platform where creativity takes center stage. 
              At Shoup, we proudly showcase the artistry of two talented individuals, 
              each bringing their own distinct style and vision to the forefront. 
              Through our carefully curated portfolio, 
              you'll discover a mesmerizing array of artworks that span various mediums and genres.
              But Shoup is more than just a showcase of artistic talent; it's a hub of exploration and analysis. 
              Delve deeper into the world of art with our insightful analytics, 
              providing valuable insights into the techniques, themes, and trends present in 
              \the showcased artworks.
              </p>
              {/* <div>
                <Button type="primary" className="custom-button">
                  Login
                </Button>
              </div> */}
            </div>
            </Col>
            <Col span={12}>
              <div className='content-item-right'>
                <BigCard/>
              </div>
            </Col>
          </Row>
      </Content>

      <Content style={{ backgroundColor: '#6A88BE', minHeight: '540px' }}>
          <Row>
            <Col span={12}>
            <div className='content-item-left' style={{
              marginTop: '40px'
            }}>
              <Card style={{
                width: '500px',
                height: 'auto',
                margin: 'auto'
              }}>
                <BarChartDashboard/>
              </Card>
            </div>
            </Col>

            <Col span={12}>
              <div className='content-item-right'>
                <h1 className='headline' style={{color:'white'}}>
                  Our merchandise types!
                </h1>
                <p className='content-text' style={{color:'white'}}>
                Currently, we're curating an array of merchandise featuring our own original artwork. 
                Our collection includes an assortment of meticulously crafted items, 
                ranging from charming keychains and captivating standees to striking posters, 
                practical whiteboards, and playful stickers. 
                Each piece is infused with our unique artistic touch, ensuring that they not only serve as 
                functional accessories but also as distinctive pieces of art that resonate with our audience.
                 Whether you're searching for a personalized addition to your everyday essentials or standout items for promotional purposes, our curated selection offers a diverse range of options to suit various preferences and needs.
                </p>
              </div>
            </Col>
          </Row>
      </Content>

      <Content style={{ backgroundColor: '#C8DAF0', minHeight: '540px' }}>
          <Row>
            <Col span={24} style={{alignContent: 'center'}}>
            <div style={{marginTop: '40px', marginBottom: '40px'}}>
            <Card style={{
                width: '900px',
                height: 'auto',
                margin: 'auto'
              }}>
                <h1 
                style={{
                  textAlign:'center',
                  color: '#364D79',
                }}
                >Numbers of patreons we have served over the year 2023-2024!</h1>
                <LineChartDashboard/>
            </Card>
            </div>
            </Col>
          </Row>
      </Content>
      
      <Footer style={{ textAlign: 'center' }}>
        Shoup © 2024 Created Regina Diva Dharma
      </Footer>
    </Layout>
  );
};

export default HomepageDashboard;
