


export function JsonArrayIndent(props:{jsonArray:(any)[]}) {
  return (
    <div>
      {props.jsonArray.length !== 0 && '['}
      {props.jsonArray.map((json:any, index:any) => {
        let each_json = JSON.stringify(json, ['x', 'y', 'width', 'height'], '\t')
        if (index === props.jsonArray.length - 1) return each_json
        else return each_json + ','
      })}
      {props.jsonArray.length !== 0 && ']'}
    </div>
  )
}
