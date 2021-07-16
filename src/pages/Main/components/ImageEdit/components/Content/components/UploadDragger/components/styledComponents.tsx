import styled from "styled-components"

export const Wrapper = styled.div`
  margin-top: 56px;
  span {
    .ant-upload.ant-upload-drag {
      height: 156px;
      width: 355px;
      border: rgba(192, 194, 196, 0.4) solid 2px;
    }
    .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
      border-color: rgba(192, 194, 196, 0.7);
    }
  }
`

export const UploadText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #a8aeb2;
`
