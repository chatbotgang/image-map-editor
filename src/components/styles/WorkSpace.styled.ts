import styled from "styled-components";

export const StyledWorkSpace = styled.div`
  width: 433px;
  height: 792px;
  background-color: #f4f9fa;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;

  & .bar {
    width: 100%;
    height: 56px;
    position: relative;
    background-color: #ebf0f3;

    & .circle {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 27px;
      margin: auto 0;
      border-radius: 50%;
      background-color: #d4dadf;
    }
  }

  & .mainPanel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 48px;

    & .upload {
      width: 355px;
      height: 156px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      border: solid #dadada 2.5px;
      background-color: white;
      color: #aaaaaa;
      row-gap: 8px;
      transition: all 0.1s ease-in-out;

      &:hover {
        cursor: pointer;
        color: #999999;
        border: solid #aaaaaa 2.5px;
      }

      & input {
        display: none;
      }
    }

    & .preview {
      width: 355px;
      position: relative;

      & img {
        display: block;
        width: 100%;
        border-radius: 8px;
        border: solid #3388ff 2.5px;
      }

      & .rect {
        border: solid #3388ff 2px;
        background-color: rgba(255, 255, 255, 0.1);
        position: relative;

        & .label {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 1.5rem;
          height: 1.5rem;
          text-align: center;
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }

        & .remove {
          position: absolute;
          width: 30px;
          height: 30px;
          top: -2px;
          right: -40px;
          background-color: white;
          color: #aaaaaa;
          border: none;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;

          &:hover {
            cursor: pointer;
            color: #999999;
          }
        }

        & .anchors {
          & div {
            width: 6px;
            height: 6px;
            background-color: #3388ff;
            position: absolute;
          }

          & :nth-child(1) {
            top: -4px;
            left: -4px;
          }

          & :nth-child(2) {
            top: -4px;
            left: calc(50% - 3px);
          }

          & :nth-child(3) {
            top: -4px;
            right: -4px;
          }
          & :nth-child(4) {
            top: calc(50% - 3px);
            left: -4px;
          }

          & :nth-child(5) {
            top: calc(50% - 3px);
            right: -4px;
          }

          & :nth-child(6) {
            bottom: -4px;
            left: -4px;
          }

          & :nth-child(7) {
            bottom: -4px;
            left: calc(50% - 3px);
          }
          & :nth-child(8) {
            bottom: -4px;
            right: -4px;
          }
        }
      }
    }
  }
`;
