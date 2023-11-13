import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  width: 100%;
  height: 3.5rem;

  background: #ffffff;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: .5rem;

    svg {
      width: 1.6rem;
      height: 1.6rem;

      color: #979797;
    }
  }

  [data-actived="true"] svg {
    color: #000000;
  }
`;