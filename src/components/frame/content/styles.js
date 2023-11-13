import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;

  flex-direction: column;

  width: 100%;
  height: calc(100% - 3.5rem - 3.5rem);

  padding: 1rem;

  & > div:nth-child(1) {
    height: 100%;
    overflow: auto;
  }

  overflow: auto;
`;