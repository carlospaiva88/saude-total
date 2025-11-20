import styled from "styled-components";

export const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: ${({ theme }) => theme.layout.sectionPadding};
  margin: 0 auto;
  width: 100%;
`;
