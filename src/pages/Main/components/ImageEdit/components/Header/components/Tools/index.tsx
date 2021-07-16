import { useContext, useMemo } from "react"
import { Button, Space, Tooltip, Modal } from "antd"
import { RedoOutlined, DeleteOutlined } from "@ant-design/icons"
import { ContextStore } from "pages/Main/context/useContext"

export default function Tools() {
  const context = useContext(ContextStore)
  const hasImage = useMemo(() => context?.fileBase64 && context?.fileBase64 !== "", [context?.fileBase64])
  const hasRectangle = useMemo(() => context?.rectangleList && context?.rectangleList.length > 0, [context?.rectangleList])

  return (
    <Space>
      <Tooltip title="回復初始狀態">
        <Button
          disabled={!hasImage}
          shape="circle"
          icon={<RedoOutlined />}
          onClick={() => {
            Modal.confirm({
              title: "確定回復初始狀態？",
              onOk() {
                context?.resetAll()
              }
            })
          }}
        ></Button>
      </Tooltip>
      <Tooltip title="刪除所有選取區域">
        <Button
          disabled={!hasRectangle}
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={() => {
            Modal.confirm({
              title: "確定刪除所有選取區域？",
              onOk() {
                context?.resetRectangleList()
              }
            })
          }}
        ></Button>
      </Tooltip>
    </Space>
  )
}
