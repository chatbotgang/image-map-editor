import image_icon from './../../assets/image.png';



export default function ImageUploadArea(props:any) {
  const onSelectFile = (e:any) => {
    props.onSelectFile(e)
  }
  return (
    <div className="upload_area">
      <div className="upload_message">
        <img src={image_icon} className="image_icon" alt="image_icon" /><br />
        Upload Image
        <input className="upload_btn" type="file" accept="image/*" onChange={onSelectFile} />
      </div>
    </div>
  )
}
