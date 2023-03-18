import { Carousel } from 'react-bootstrap';

import slide1 from '~/assets/web-images/bg1.jpg'
import slide2 from '~/assets/web-images/bg-limited-1.jpg'
import slide3 from '~/assets/web-images/bg3.jpg'



function Carouselbootstrap() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={slide1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block w-100"
          src={slide2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carouselbootstrap;