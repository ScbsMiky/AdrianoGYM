import styled from "styled-components";

export const Container = styled.div`
  margin-top: .5rem;

  display: flex;
  flex-direction: row;

  overflow: auto;

  & > div {
    display: flex;
    flex-direction: column;

    align-items: center;
    justify-content: center;

    padding: .25rem;
    margin-right: .5rem;

    border: 2px solid #cccccc;
    border-radius: .25rem;

    width: 3rem;

    & > span:nth-child(1) {
      width: 100%;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: clip;
    }

    & > span:nth-child(2) {
      padding: .5rem;
      background: #cccccc;
      border-radius: 100%;
      margin: .5rem 0;
    }
  }

  .open {
    border-color: #ee3232;

    & > span:nth-child(2) {
      background: #ee3232;
    }
  }

  .close {
    border-color: #2edf8c;

    & > span:nth-child(2) {
      background: #2edf8c;
    }
  }

  .undefined {
    border-color: #cccccc;

    & > span:nth-child(2) {
      background: #cccccc;
    }
  }
`;