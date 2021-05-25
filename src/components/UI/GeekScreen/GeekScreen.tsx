
import './GeekScreen.css';

export default function PhoneScreen(props:any) {
  return (
    <div className="coordinate_preview">
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}
