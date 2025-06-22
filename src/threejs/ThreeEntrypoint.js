import { useEffect, useRef } from "react";
import Main from './MainAppEntrypoint';


function ThreeEntrypoint() {
  const refContainer = useRef(null);
  
  useEffect(() => {
    let threeApp = new Main(refContainer);

    threeApp.Render();
  }, []);


  return (
    <div ref={refContainer} className="threejs-container"></div>
  );
}

export default ThreeEntrypoint