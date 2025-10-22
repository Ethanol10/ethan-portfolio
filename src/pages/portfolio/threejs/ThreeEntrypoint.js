import { useEffect, useRef } from "react";
import {Main, MainObj} from './MainAppEntrypoint';
import home from "../../../media/Icons/home.png";
import { useNavigate } from "react-router";


function ThreeEntrypoint(props) {
  const {sceneInteractable, setFocus} = props;
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
        if(setFocus !== undefined){
          setFocus(true);
        }
      }
    }

    const handleBlur = () => {
      if(MainObj !== null){
        MainObj.SetFocusState(false);
        if(setFocus !== undefined){
          setFocus(false);
        }
      }
    }

    const handleScroll = () => {
      // Check if container is still in viewport
      if(MainObj !== null){
        if(refContainer.current.getBoundingClientRect().top < window.innerHeight &&
        refContainer.current.getBoundingClientRect().bottom >= 300) {
          handleFocus();
        }
        else {
          handleBlur();
        }
      }
    }

    //Set resize handler
    window.addEventListener('resize', handleResize);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("scroll", handleScroll);
    threeApp.Render();


    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("scroll", handleScroll);

      //Cleanup the Three Scene on unmount
      if(MainObj !== null){
        MainObj.Destroy();
      }
    }
  }, [sceneInteractable, setFocus,]);


  return (
    <>
      {sceneInteractable && 
        <div className="boids-interactable-back-button" onClick={() => navigate("/")}>
          <img loading="lazy" alt="Return home" src={home}/>
        </div>
      }
      <div ref={refContainer} className="threejs-container"></div>
    </>
  );
}

export default ThreeEntrypoint