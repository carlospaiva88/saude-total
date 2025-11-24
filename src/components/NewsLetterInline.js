// src/components/Article/NewsletterInline.jsx (ajuste)
import styled from "styled-components";


export const Wrapper = styled.div`
  max-width: 68ch;
  margin: 1.6rem auto;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radius.md};
  background: linear-gradient(135deg, rgba(108,188,163,0.06), rgba(244,164,141,0.04));
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};

  form { display:flex; gap:.6rem; justify-content:center; align-items:center; flex-wrap:wrap }
  input{ padding:.6rem; border-radius:8px; border:1px solid ${({ theme }) => theme.colors.border}; min-width:220px }
  button{ background:${({ theme }) => theme.colors.primary}; color:white; padding:.6rem 1rem; border-radius:999px; border:0 }
`;

export default Wrapper;