import styled from "styled-components";

const NavbarSpacer = styled.div`
  height: 70px; // mesma altura do navbar desktop
  @media (max-width: 768px) {
    height: 80px; // altura navbar mobile
  }
`;

export default NavbarSpacer;