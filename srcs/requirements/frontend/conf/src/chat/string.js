export function updateTime(time) {
	if (!time) return ""
	const date = new Date(time)
	const hours = date.getUTCHours().toString().padStart(2, '0')
	const minutes = date.getUTCMinutes().toString().padStart(2, '0')
	const seconds = date.getUTCSeconds().toString().padStart(2, '0')
	return(`${hours}:${minutes}:${seconds}`)
}

export function updateSender(sender) {
	if (!sender) return ""
	if (sender.length < 10)
		return sender.padEnd(10, ' ')
	else if (sender.length > 10)
		return sender.slice(0, 9) + '.'
	return sender
}

export function updateContent(content) {
	if (!content) return ""
	return content.match(new RegExp(`.{1,100}`, 'g')).join('\n                               : ')
}