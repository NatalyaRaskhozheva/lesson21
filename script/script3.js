class CreateList {
	constructor(numberElement) {
		this.numberElement = numberElement
	}
	paint() {
		console.log(this.listContainer)
		// const containerList = document.getElementById("listContainer")
		// console.log(containerList)
		for (const ol of this.listContainer.children) {
			if (ol.children.length % 2 === 0) ol.style.backgroundColor = 'green'
			else ol.style.backgroundColor = 'red'
		}
	}
	createList() {
		this.container = document.createElement('div')
		this.listContainer = document.createElement('div')
		this.listContainer.className = 'listContainer'
		for (let i = 0; i < this.numberElement; i++) {
			const ol = document.createElement('ol')
			let randomNumber = Math.floor(Math.random() * (10 - 1) + 1)
			for (let i = 0; i <= randomNumber; i++) {
				const li = document.createElement('li')
				let numberLi = Math.floor(Math.random() * (100 - 1) + 1)
				li.innerText = numberLi
				ol.append(li)
			}
			this.listContainer.append(ol)
			this.container.append(this.listContainer)
		}
		const button = document.createElement('button')
		button.innerText = 'Закрасити'
		button.onclick = this.paint.bind(this, this.listContainer)
		this.container.append(button)
		return this.container
	}
	render() {
		document.querySelector('body').append(this.createList())
	}
}

window.onload = function () {
	const newList = new CreateList(5)
	newList.render()
}