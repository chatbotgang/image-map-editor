
import Navbar from './Navbar';
import './PhoneScreen.css';

export default function PhoneScreen(props:any) {
  return (
    <div className="phone_screen">
      <Navbar/>
      {props.children}
    </div>
  )
}
