import React from 'react';
import styled from 'styled-components';

const Card = () => {
  return (
    <StyledWrapper>
      <div className="card1">
        <p className="heading1">
          Popular this month
        </p>
        <p>
          Powered By
        </p>
        <p>Uiverse
        </p></div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card1 {
    position: relative;
    width: 190px;
    height: 254px;
    background-color: #000;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 12px;
    gap: 12px;
    border-radius: 8px;
    cursor: pointer;
    color: white;
  }

  .card1::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -5px;
    margin: auto;
    width: 200px;
    height: 264px;
    border-radius: 10px;
    background: linear-gradient(-45deg, #e81cff 0%, #40c9ff 100% );
    z-index: -10;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .card1::after {
    content: "";
    z-index: -1;
    position: absolute;
    inset: 0;
    background: linear-gradient(-45deg, #fc00ff 0%, #00dbde 100% );
    transform: translate3d(0, 0, 0) scale(0.95);
    filter: blur(20px);
  }

  .heading1 {
    font-size: 20px;
    text-transform: capitalize;
    font-weight: 700;
  }

  .card1 p:not(.heading1) {
    font-size: 14px;
  }

  .card1 p:last-child {
    color: #e81cff;
    font-weight: 600;
  }

  .card1:hover::after {
    filter: blur(30px);
  }

  .card1:hover::before {
    transform: rotate(-90deg) scaleX(1.34) scaleY(0.77);
  }`;

export default Card;
