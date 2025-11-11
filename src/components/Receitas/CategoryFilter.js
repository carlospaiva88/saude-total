import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
`;

const Chip = styled.button`
  background: ${(props) => (props.active ? "#000" : "#f5f5f5")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: ${(props) => (props.active ? "#111" : "#e8e8e8")};
  }
`;

const CategoryFilter = ({ categorias, categoriaAtiva, onChange }) => {
  return (
    <FilterContainer>
      {["Todas", ...categorias].map((cat) => (
        <Chip
          key={cat}
          active={categoriaAtiva === cat}
          onClick={() => onChange(cat)}
        >
          {cat}
        </Chip>
      ))}
    </FilterContainer>
  );
};

export default CategoryFilter;
