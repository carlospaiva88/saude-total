import React from "react";
import {
  CardBase,
  CardImage,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardDescription,
  CardButton
} from "../CardBase/CardBase";

export default function BlogCard({ post }) {
  return (
    <CardBase>
      <CardImage src={post.image} alt={post.title} />
      <CardBody>
        <CardTitle>{post.title}</CardTitle>
        {post.category && <CardSubtitle>{post.category}</CardSubtitle>}
        <CardDescription>{post.excerpt}</CardDescription>
        <CardButton href={post.url}>Ler mais</CardButton>
      </CardBody>
    </CardBase>
  );
}
