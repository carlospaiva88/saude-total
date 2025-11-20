import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { Link } from "react-router-dom";


import "swiper/css";

export default function CarouselFinal({ items }) {
  return (
    <Wrapper>
      <h2>Continue descobrindo</h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={6000}               // velocidade bem lenta
        loop={true}
        slidesPerView={4}
        spaceBetween={20}
        grabCursor={true}
        allowTouchMove={false}     // igual Nike: passa sozinho
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 }
        }}
      >
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <CardLink to={item.link}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </CardLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}

/* -------- styled -------- */

const Wrapper = styled.section`
  margin: 3rem 0 2rem;
  padding: 1rem 0;

  h2 {
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;


const CardLink = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  padding: 0.6rem;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition: 0.25s ease;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 12px;
  }

  h4 {
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.primaryDark};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadow.md};
  }
`;