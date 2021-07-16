import { useCallback, useState, useContext } from "react"
import { Upload, Spin, message } from "antd"
import { PictureOutlined, LoadingOutlined } from "@ant-design/icons"
import { ContextStore } from "pages/Main/context/useContext"
import { Wrapper, UploadText } from "./components/styledComponents"
import getBase64 from "pages/Main/utils/getBase64"

export default function Content() {
  const [isLoading, setIsLoading] = useState(false)
  const context = useContext(ContextStore)

  const updateFile = useCallback(
    async file => {
      const convertedFile = await getBase64(file)
      context?.setFileBase64(convertedFile)
    },
    [context]
  )

  const handleImageUpload = useCallback(
    info => {
      if (info.file.status === "uploading") {
        setIsLoading(true)
        updateFile(info.file.originFileObj)
      }
    },
    [updateFile]
  )

  return (
    <Wrapper>
      <Upload.Dragger
        multiple={false}
        onChange={handleImageUpload}
        showUploadList={false}
        beforeUpload={file => {
          if (file.type === "image/jpeg" || file.type === "image/png") {
            return true
          }

          message.warn("請上傳jpeg或png檔")
          return false
        }}
        customRequest={() => {}}
      >
        <UploadText>
          {isLoading ? (
            <Spin indicator={<LoadingOutlined />} />
          ) : (
            <>
              <PictureOutlined />
              <p>Upload Image</p>
            </>
          )}
        </UploadText>
      </Upload.Dragger>
    </Wrapper>
  )
}
