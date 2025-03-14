import { useEffect, useState } from "react"

function ResizeScreen() {

	const [resize, setResize] = useState(true)

	useEffect(() => {

		const handleResize = () => {

			if (window.innerWidth > 1000 && window.innerHeight > 700) {
				setResize(true)
			}
			else {
				setResize(false)
			}
		}

		window.addEventListener("resize", handleResize)

		handleResize()

		return () => {window.removeEventListener("resize", handleResize)}
	}, [])

	return { resize }
}

export default ResizeScreen