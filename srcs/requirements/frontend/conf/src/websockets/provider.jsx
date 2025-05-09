import React from 'react'
import { Notification } from './notification'
import { Game } from './game'

export const WebSocketProvider = ({ children }) => {

	return (
		<Notification>
			<Game>
				{children}
			</Game>
		</Notification>
	)
}
