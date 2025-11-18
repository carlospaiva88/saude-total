// src/components/CardUniversal/CardUniversal.js
import React from "react";
import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardDescription,
  CardPrice,
  CardButton,
  CardSticker
} from "./cardUniversal.styles";

export default function CardUniversal({
  image,
  title,
  subtitle,
  description,
  price,
  buttonLabel,
  onClick,
  href,
  sticker
}) {
  return (
    <CardBase onClick={onClick}>
      {sticker && <CardSticker>{sticker}</CardSticker>}

      {image && <CardImage src={image} alt={title} />}

      <CardBody>
        {title && <CardTitle>{title}</CardTitle>}
        {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        {description && <CardDescription>{description}</CardDescription>}
        {price && <CardPrice>€ {price}</CardPrice>}

        {buttonLabel && (
          <CardButton href={href} onClick={onClick}>
            {buttonLabel}
          </CardButton>
        )}
      </CardBody>
    </CardBase>
  );
}
