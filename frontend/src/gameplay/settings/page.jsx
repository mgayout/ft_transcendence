import React, { useEffect } from "react"
import createCanva from "./canva";

const Gameplay = ({canva, elem, color}) => {

	useEffect(() => {

		if (!canva.current) return

		const resizeCanva = () => {
			
			canva.current.width = window.innerWidth
			canva.current.height = window.innerHeight

			if (renderer)
				renderer.setSize(window.innerWidth, window.innerHeight)
			if (camera) {
				camera.aspect = window.innerWidth / window.innerHeight
				camera.updateProjectionMatrix()
			}
		}
	
		const { dispose, renderer, camera } = createCanva(canva.current, elem, color)

		window.addEventListener("resize", resizeCanva)

		resizeCanva()

		return () => {
			window.removeEventListener("resize", resizeCanva)
			dispose()
		}
	}, [canva, elem, color])

	return (<canvas ref={canva}/>)
}

export default Gameplay