// components/Receitas/CTASection.js
import styled from "styled-components";

const CTAWrapper = styled.section`
  background: linear-gradient(135deg, #2a9d8f, #264653);
  color: white;
  text-align: center;
  padding: 5rem 2rem;
  border-radius: 24px;
  margin-top: 6rem;
  position: relative;
  overflow: hidden;

  h2 {
    font-size: 2.4rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    color: #f1faee;
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-inline: auto;
    line-height: 1.6;
  }

  form {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    max-width: 500px;
    margin-inline: auto;
  }

  input {
    flex: 1;
    padding: 0.8rem 1.2rem;
    border-radius: 40px;
    border: none;
    outline: none;
    font-size: 1rem;
  }

  button {
    background: #f4a261;
    color: #264653;
    border: none;
    padding: 0.8rem 1.8rem;
    border-radius: 40px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: #e76f51;
      color: white;
      transform: translateY(-3px);
    }
  }
`;

export default function CTASection() {
  return (
    <CTAWrapper>
      <h2>Transforme sua alimentação 🌿</h2>
      <p>
        Receba semanalmente receitas nutritivas, fáceis e saborosas direto no seu e-mail.
        Junte-se à nossa comunidade saudável!
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Digite seu e-mail" required />
        <button type="submit">Quero Receber</button>
      </form>
    </CTAWrapper>
  );
}
