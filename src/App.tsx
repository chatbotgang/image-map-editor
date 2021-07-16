import { ConfigProvider } from "antd"
import zhTW from "antd/es/locale/zh_TW"
import "antd/dist/antd.css"
import Main from "pages/Main"

function App() {
  return (
    <ConfigProvider locale={zhTW}>
      <Main />
    </ConfigProvider>
  )
}

export default App
