function onTdClick() {
	let input = this

	let current = input.value


	while (input.nextElementSibling) {
		input = input.nextElementSibling
		input.value = ++current
	}
	while (input.previousElementSibling) {
		input = input.previousElementSibling
		input.value = --current
	}
}
const body = document.querySelector('body')


for (const input of body.children) {
	input.oninput = onTdClick
}

