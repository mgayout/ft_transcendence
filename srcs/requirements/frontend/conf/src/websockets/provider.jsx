import React from 'react'
import { Notification } from './notification'
import { Game } from './game'
import { Chat } from './chat'

export const WebSocketProvider = ({ children }) => {

	return (
		<Notification>
			<Chat>
				<Game>
					{children}
				</Game>
			</Chat>
		</Notification>
	)
}
