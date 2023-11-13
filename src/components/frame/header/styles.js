import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  width: 100%;
  height: 3.5rem;

  border-bottom: .2rem solid #e9e9e9;

  background: #ffffff;

  & .icon {
    display: flex;
    align-items: center;

    padding: .5rem;
  }

  & > div {
    display: flex;
    align-items: center;

    padding: 1rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;