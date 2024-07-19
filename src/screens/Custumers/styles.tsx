import { styled } from "styled-components";

export const CustumersStyled = styled.div`
  width: 100%;

  padding: 0 .5rem;

  & > .filters {
    display: flex;
    align-items: center;
    
    overflow: auto;
    flex-wrap: nowrap;

    margin-bottom: .8rem;

    & > div:last-child { margin-right: 0; }
    & > div { margin-left: 0 }
  }

  & > .table {    
    border-radius: .5rem;
    
    background: #dfe7e7;

    & > .header {
      display: flex;
      align-items: center;

      border-top-left-radius: .5rem;
      border-top-right-radius: .5rem;

      background: #ffffff;
      
      & > div {
        width: 100%;
        padding: .75rem;
        display: flex;
        align-items: center;
      }
    }

    & > .content {
      & > div {  
        position: relative;

        overflow: auto;

        display: flex;
        
        & > div {
          width: 33%;
          
          display: flex;
          padding: .75rem;
          align-items: center;

          span {
            width: 100%;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        &:last-child {
          border-bottom-left-radius: .5rem;
          border-bottom-right-radius: .5rem;
        }

        &:nth-child(even) {
          background: #ffffff;
        }

        &::after {
          content: "";

          position: absolute;

          left: 0;
          top: 50%;

          transform: translateY(-50%);

          width: .4rem;
          height: 40%;

          background: #554d4f;

          border-top-right-radius: .5rem;
          border-bottom-right-radius: .5rem;
        }

        &.red::after { background: #f51414; }
        &.pink::after { background: #752885; }
        &.green::after { background: #37925d; }
      }
    }
  }
`;