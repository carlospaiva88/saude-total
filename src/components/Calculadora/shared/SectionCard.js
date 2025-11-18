import React from "react";
import styled from "styled-components";

export default function SectionCard({ title, children }) {
  return (
    <Card>
      <h3>{title}</h3>
      <div className="content">{children}</div>
    </Card>
  );
}

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.2rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow.sm};

  h3 {
    margin-bottom: 0.6rem;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 1.2rem;
  }
`;
