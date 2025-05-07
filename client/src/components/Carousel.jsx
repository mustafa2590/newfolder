import { useState } from "react";

export const ProductCarousel = ({ pic1, pic2 }) => {
  const images = [pic1, pic2].filter(Boolean); // Only include truthy pics
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((current + 1) % images.length);
  };

  const prev = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel slide">
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div
            className={`carousel-item ${index === current ? 'active' : ''}`}
            key={index}
          >
            <img className="d-block w-100" src={img} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <button className="carousel-control-prev" onClick={prev}>
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="sr-only">&lt;</span>
      </button>
      <button className="carousel-control-next" onClick={next}>
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="sr-only">&gt;</span>
      </button>

      <ol className="carousel-indicators">
        {images.map((_, index) => (
          <li
            key={index}
            className={index === current ? 'active' : ''}
            onClick={() => setCurrent(index)}
          />
        ))}
      </ol>
    </div>
  );
};
