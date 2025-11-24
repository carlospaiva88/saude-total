// src/components/ArticleCard/SkeletonCard.jsx
import React from "react";
import styled, { keyframes } from "styled-components";
import { CardBase } from "../CardBase/cardBase";

/* Simple skeleton placeholder to show while loading */
const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export default function SkeletonCard({ style }) {
  return (
    <SkeletonWrap style={style}>
      <CardBase style={{ padding: 0 }}>
        <ImageSkeleton />
        <Body>
          <Line style={{ width: "40%" }} />
          <Line style={{ width: "85%", height: 14, marginTop: 10 }} />
          <Line style={{ width: "60%", height: 12, marginTop: 8 }} />
        </Body>
      </CardBase>
    </SkeletonWrap>
  );
}

const SkeletonWrap = styled.div`height:100%`;
const ImageSkeleton = styled.div`
  height: 160px;
  width: 100%;
  background: linear-gradient(90deg, #eeeeee 25%, #f6f6f6 50%, #eeeeee 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.1s linear infinite;
`;
const Body = styled.div`
  padding: 0.9rem 1rem;
  display:flex;
  flex-direction:column;
  gap: 8px;
`;
const Line = styled.div`
  height: 12px;
  border-radius: 6px;
  background: linear-gradient(90deg, #eeeeee 25%, #f6f6f6 50%, #eeeeee 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.1s linear infinite;
`;
