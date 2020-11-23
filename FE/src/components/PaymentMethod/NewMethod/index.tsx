import React, { useRef, useState, useEffect } from 'react';
import './newMethod.scss';

interface SetData {
  setAddData: (addData: { name: string; color: string }) => void;
  defaultMethod: object[];
}

export default function NewMethod({
  setAddData,
  defaultMethod,
}: SetData): React.ReactElement {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const carousel = useRef();
  // const cellCount = data.length;
  const radius = 288;
  const theta = 360 / defaultMethod.length;

  useEffect(() => {}, [selectedIndex]);

  const rotateCarousel = turn => {
    if (carousel) {
      const angle = theta * turn * -1;
      carousel.current.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
    }
  };

  const onClickPrev = () => {
    rotateCarousel(selectedIndex - 1);
    setSelectedIndex(selectedIndex - 1);
  };

  const onClickNext = () => {
    rotateCarousel(selectedIndex + 1);
    setSelectedIndex(selectedIndex + 1);
  };

  const onClickCard = event => {
    setAddData({
      name: event.target.textContent,
      color: event.target.dataset.color,
    });
  };

  return (
    <>
      <div className="wrapper">
        <div className="scene">
          <div className="carousel" ref={carousel}>
            {defaultMethod.map(card => (
              <div
                className="carousel__cell"
                onClick={onClickCard}
                data-color={card.color}
                style={{ background: `${card.color}` }}
              >
                {card.name}
              </div>
            ))}
          </div>
        </div>
        <button type="button" onClick={onClickPrev} className="prev__button">
          prev
        </button>
        <button type="button" onClick={onClickNext} className="next__button">
          next
        </button>
      </div>
    </>
  );
}
