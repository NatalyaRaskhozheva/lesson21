function onTdClick() {
	let div = this
	div.style.color = 'red'
	while (div.nextElementSibling) {
		div = div.nextElementSibling
		div.style.color = 'red'

	}
}
const body = document.querySelector('body')

for (const div of body.children) {
	div.onclick = onTdClick
}