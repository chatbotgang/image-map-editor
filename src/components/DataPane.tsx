import styled from 'styled-components'

type DataPaneProps = {
  className?: string
}

const DataPaneJSX = ({className}: DataPaneProps) => {
  return (
    <aside className={className}>
      <code></code>
    </aside>
  )
}

const DataPane = styled(DataPaneJSX)`
  width: 548px;
  height: 703px;
  border-radius: 5px;
  background-color: #2B3948;
`

export default DataPane

