import { styled } from "styled-components";

export const FrameStyled = styled.div`
  width: 100%;
  height: 100%;

  display: flex;;
  flex-direction: column;

  & > .header,
  & > .footer {
    width: 100%;
    height: 3.5rem;
    min-height: 3.5rem;

    display: flex;
    align-items: center;
    justify-content: space-around;

    background: #ffffff;

    & > div {
      padding: .5rem;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }

  & > .header {
    justify-content: space-between;

    & > div {
      width: 100%;
    }

    & > div:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    & > div:nth-child(3) {
      display: flex;
      align-items: center;
      
      & > div:nth-child(1) {
        margin-left: auto;
      }
    }

    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  & > .footer {
    & > a {
      color: #a7b3b8;
    }

    & > a.actived {
      color: #000000;
    }

    & > a {
      display: flex;
      padding: .5rem;

      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }

    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  & > .content {
    width: 100%;
    height: 100%;

    padding: .5rem;

    display: flex;
    flex-direction: column;
    
    justify-content: space-between;

    overflow: auto;
  }

  & > .menu {
    position: fixed;

    top: 0;
    right: -100%;

    width: 18rem;
    height: 100%;
    
    z-index: 1;
    transition: .5s all;
    
    & > .header {
      width: 100%;
      height: 4rem;
      padding: .5rem;
      
      display: flex;
      align-items: center;

      background: #ecf1f1;

      svg {
        width: 2rem;
        height: 2rem;

        color: #cc4444;
      }
    }

    & > .content {
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;

      background: #ecf1f1;
    }

    &::before {
      content: "";
      
      position: fixed;

      top: 0;
      left: 0;

      width: 100%;
      height: 100%;

      background: #2b2b2b7d;
      backdrop-filter: blur(3px);

      z-index: -1;

      pointer-events: none;

      opacity: 0;

      transition: .5s all;
    }

    &.actived::before {
      opacity: 1;
    }

    &.actived {
      right: 0;
    }
  }
`;