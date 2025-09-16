import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: #264653;
  color: white;
  padding: 2rem;
  margin-top: 3rem;
  font-size: 0.9rem;
`;

export const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  h4 {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #e9c46a;
  }

  p {
    line-height: 1.4;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #f4a261;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #e9c46a;
    }
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    font-size: 1.5rem;
    transition: transform 0.2s ease, color 0.3s ease;

    &:hover {
      color: #e76f51;
      transform: scale(1.2);
    }
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  opacity: 0.8;
`;
