import React, {FunctionComponent} from 'react';
import { RootState } from '../stores';
import { useSelector } from 'react-redux';

const  Results: FunctionComponent = () => {
    const rectangles = useSelector((state: RootState) => state.rectangle.rectangles);


  return (
   <pre className="results">
       {rectangles.length > 0 && JSON.stringify(rectangles).replaceAll("}", "\n  }").replaceAll(",\"", ",\n  \"").replaceAll("{\"", "{\n  \"")}
   </pre>
  );
}

export default Results;
