import React, { useEffect, useRef, useState } from "react"
import createCanva from "./canva";

const SkinView = ({canva, elem, color}) => {

	useEffect(() => {
		if (!canva.current) return
		const { dispose } = createCanva(canva.current, elem, color)
		return () => {dispose()}
	}, [canva, elem, color])

	return (<canvas ref={canva}/>)
}

export default SkinView