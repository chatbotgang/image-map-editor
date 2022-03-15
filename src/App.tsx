import {useState} from 'react';

import * as Type from 'type';
import * as Comp from "components";

import style from './App.module.css';

function App() {
  const [rectangleList, setRectangleList] = useState<Type.Rectangle[]>([]);
  const appendRectangleList = (rectangle: Type.Rectangle) => {
    setRectangleList(list => [...list, rectangle]);
  };

  const deleteRectangle = (index: number) => {
    setRectangleList(list => list.filter((_, i) => i !== index));
  }

  return (
    <div className={style.App}>
      <div className={style.ImageUploadArea}>
        <Comp.ImagePreviewer {...{rectangleList, appendRectangleList, deleteRectangle}} />
      </div>
      <pre className={style.ConsoleArea}>
        {!!rectangleList.length && JSON.stringify(rectangleList.map(r => ({x: r.left, y: r.top, width: r.width, height: r.height})), null, 4)}
      </pre>
    </div>
  );
}

export default App;
