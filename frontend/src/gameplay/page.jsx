import React, { useEffect } from "react"
import createCanva from "./canva";

const Gameplay = ({canva}) => {

	useEffect(() => {
		if (canva.current) {
			const { renderer, camera/*, dispose*/ } = createCanva(canva.current)
		}
		else {
			console.log("canva not defined")
		}

		/*const handleResize = () => {
			renderer.setSize(terrain.WIDTH, terrain.HEIGHT);
			camera.aspect = terrain.WIDTH / terrain.HEIGHT;
			camera.updateProjectionMatrix();
		}
		
		window.addEventListener('resize', handleResize);*/
		return () => {
			//window.removeEventListener('resize', handleResize);
			//dispose();
		}
	}, [canva])

	return (
		<div>
			<canvas ref={canva}/>
		</div>
	  )
}

export default Gameplay