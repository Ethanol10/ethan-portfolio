import { useEffect, useRef } from "react";
import {Main, MainObj} from './MainAppEntrypoint';
import home from "../media/Icons/home.png";
import { useNavigate } from "react-router";


function ThreeEntrypoint(props) {
  const {sceneInteractable} = props;
  const refContainer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    let threeApp = new Main(refContainer, sceneInteractable);

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

      //Cleanup the Three Scene on unmount
      if(MainObj !== null){
        MainObj.Destroy();
        console.log("cleanup!");
      }
    }
  }, [sceneInteractable, ]);


  return (
    <>
      {sceneInteractable && 
        <div className="boids-interactable-back-button" onClick={() => navigate("/")}>
          <img alt="Return home" src={home}/>
        </div>
      }
      <div ref={refContainer} className="threejs-container"></div>
    </>
  );
}

export default ThreeEntrypoint