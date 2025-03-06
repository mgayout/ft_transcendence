import React, { useEffect } from "react"
import createCanva from "./canva";

const Gameplay = ({canva, elem, color}) => {

	useEffect(() => {
		console.log(elem, color)
		if (!canva.current) return
		const { dispose } = createCanva(canva.current, elem, color)
		return () => {dispose()}
	}, [canva, elem, color])

	return (<canvas ref={canva}/>)
}

export default Gameplay