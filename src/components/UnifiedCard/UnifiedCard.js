import React from "react";
import {
  CardWrapper,
  CardImage,
  CardBody,
  CardTitle,
  CardDescription,
  CardPrice,
  CardSticker,
  CardButton,
} from "./unifiedCard.styles";
import { Link } from "react-router-dom";

export default function UnifiedCard({
  to,
  image,
  title,
  description,
  price,
  sticker,
  buttonLabel,
  onButtonClick,
  as = "link", // link or div
}) {
  const WrapperComponent = as === "link" ? Link : "div";

  return (
    <CardWrapper as={WrapperComponent} to={to}>
      {sticker && <CardSticker>{sticker}</CardSticker>}

      <CardImage src={image} alt={title} />

      <CardBody>
        <CardTitle>{title}</CardTitle>

        {description && (
          <CardDescription>{description}</CardDescription>
        )}

        {price && <CardPrice>€ {price}</CardPrice>}

        {buttonLabel && (
          <CardButton onClick={onButtonClick}>{buttonLabel}</CardButton>
        )}
      </CardBody>
    </CardWrapper>
  );
}
