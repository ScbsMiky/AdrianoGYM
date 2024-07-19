import styled from "styled-components";

export const CustumerPaymentsStyled = styled.div`
  margin-left: .5rem;
`;

export const CustumerPaymentsFilterStyled = styled.div`
  overflow: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: .5rem;
  margin-bottom: .5rem;

  padding-bottom: 1rem;

  & > div {
    margin: 0;
    margin-right: .5rem;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

export const CustumerPaymentsTableStyled = styled.div`
  border-radius: .5rem;
    
  & > div {
    display: flex;
    align-items: center;

    padding: .75rem;

    background: #ffffff;

    & > span {
      display: flex;
      align-items: center;
      
      width: 100%;

      select, input {
        width: 100%;

        border: none;
        background: none;
      }
    }

    &:first-child {
      border-bottom-left-radius: .5rem;
      border-bottom-right-radius: .5rem;
    }

    &:last-child {
      border-bottom-left-radius: .5rem;
      border-bottom-right-radius: .5rem;
    }

    &:nth-child(even) {
      background: #dfe7e7;
    }
  }
`;