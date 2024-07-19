import { styled } from "styled-components";

export const DashboardStyled = styled.div`
  & .filters {
    display: flex;

    overflow: auto;

    padding-bottom: .5rem;

    & > div {
      margin-right: 0;
      margin-bottom: 0;
    }

    & > div:first-child {
      margin-left: 0;
    }
  }

  & .boxes > div {
    padding: .5rem;
    margin: .5rem 0;

    background: #ffffff;
    border-radius: .5rem;

    & > span:nth-child(1) {
      font-size: .8rem;
      display: block;
    }
  }
`;