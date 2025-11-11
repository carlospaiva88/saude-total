import styled from "styled-components";

export const FooterContainer = styled.footer`
  background: #1b2b34;
  color: #ffffff;
  padding: 4rem 2rem 2rem;
  font-size: 0.9rem;
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 3rem;
`;

export const FooterLogo = styled.div`
  h2 {
    color: #e9c46a;
    margin-bottom: 1rem;
    font-size: 1.6rem;
  }

  p {
    color: #d0d0d0;
    line-height: 1.6;
    font-size: 0.95rem;
  }
`;

export const FooterColumn = styled.div`
  h4 {
    color: #f4a261;
    margin-bottom: 1.2rem;
    font-size: 1.1rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 0.6rem;

      a {
        color: #d0d0d0;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #e9c46a;
        }
      }
    }
  }

  p {
    color: #d0d0d0;
    margin-bottom: 1rem;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: #ffffff;
    font-size: 1.4rem;
    transition: color 0.3s, transform 0.2s;

    &:hover {
      color: #f4a261;
      transform: translateY(-3px);
    }
  }
`;

export const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  background: #ffffff11;
  border-radius: 40px;
  overflow: hidden;
  max-width: 280px;

  input {
    flex: 1;
    border: none;
    background: transparent;
    color: white;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;

    &::placeholder {
      color: #cccccc;
    }

    &:focus {
      outline: none;
    }
  }

  button {
    background: #f4a261;
    border: none;
    color: #fff;
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: #e76f51;
    }

    svg {
      font-size: 1.1rem;
    }
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.8rem;
  color: #aaaaaa;
  max-width: 1100px;
  margin: 0 auto;

  p {
    margin: 5px 0;
  }
`;
