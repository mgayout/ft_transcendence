import React from 'react'
import Router from './Router'
import { RouterProvider } from 'react-router-dom'

function App() {
	return (
		<RouterProvider router={Router}/>
	)
}

export default App