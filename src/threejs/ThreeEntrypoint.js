import { useEffect, useRef } from "react";
import {Main, MainObj} from './MainAppEntrypoint';


function ThreeEntrypoint() {
  const refContainer = useRef(null);
  
  useEffect(() => {
    let threeApp = new Main(refContainer);

    const handleResize = () => {
      if(MainObj !== null){
        MainObj.ResizeCam();
      }
    };

    //Set resize handler
    window.addEventListener('resize', handleResize);

    threeApp.Render();


    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);


  return (
    <div ref={refContainer} className="threejs-container"></div>
  );
}

export default ThreeEntrypoint