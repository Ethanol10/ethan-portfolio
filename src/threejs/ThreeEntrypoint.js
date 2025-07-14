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

    const handleFocus = () => {
      if(MainObj !== null){
        MainObj.SetFocusState(true);
      }
    }

    const handleBlur = () => {
      if(MainObj !== null){
        MainObj.SetFocusState(false);
      }
    }

    //Set resize handler
    window.addEventListener('resize', handleResize);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    threeApp.Render();


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    }
  }, []);


  return (
    <div ref={refContainer} className="threejs-container"></div>
  );
}

export default ThreeEntrypoint