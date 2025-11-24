// src/components/Article/ReadingProgress.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.pageYOffset || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height ? Math.min(100, Math.round((scrollTop / height) * 100)) : 0;
      setProgress(pct);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Bar role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
      <Fill style={{ width: `${progress}%` }} />
    </Bar>
  );
}

const Bar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: rgba(0,0,0,0.04);
  z-index: 9999;
  pointer-events: none;
`;

const Fill = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.gradients.hero};
  transition: width 120ms linear;
`;
