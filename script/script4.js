class ElementsCreator {
	static createHTMLElement({ tag, attrs, props, events }) {
		const el = document.createElement(tag)
		if (attrs) {
			for (const attrKey in attrs) {
				el.setAttribute(attrKey, attrs[attrKey])
			}
		}
		if (props) {
			for (const propKey in props) {
				el[propKey] = props[propKey]
			}
		}
		if (events) {
			for (const eventType in events) {
				el.addEventListener(eventType, events[eventType])
			}
		}
		return el
	}
	static createTable({ numberTr, numberTd, id, tdOptions }) {
		const table = ElementsCreator.createHTMLElement({
			tag: 'table',
			props: {
				id: id
			},
			...(tdOptions ?? {})


		})

		for (let i = 0; i < numberTr; i++) {
			let tr = ElementsCreator.createHTMLElement({
				tag: 'tr'
			})
			table.append(tr)
			for (let i = 0; i < numberTd; i++) {

				let td = ElementsCreator.createHTMLElement({
					tag: 'td',
					props: {
						innerText: parseInt(Math.random() * 10)
					},
				})
				tr.append(td)
			}
		}
		return table
	}

}
class CreateTableList {
	constructor({ id, numberTr, numberTd, counter }) {
		this.id = id
		this.numberTr = numberTr
		this.numberTd = numberTd
		this.counter = counter
		this.elTitle = this.createElementTitle()
		this.elTable = this.createElementTable()

	}
	createBorder() {
		const addBorder = new CustomEvent('newBorder', {
			detail: {
				id: this.id,
				counter: ++this.counter,
				el: this.elTitle
			}
		})
		this.elTable.dispatchEvent(addBorder)
	}
	createElementTitle() {
		let title = ElementsCreator.createHTMLElement({
			tag: 'div',
			props: {
				innerText: `Кількість натискань - ${this.counter},`
			}
		})
		return title
	}
	createElementTable() {
		let table = ElementsCreator.createTable({
			id: this.id,
			numberTr: this.numberTr,
			numberTd: this.numberTd,
			tdOptions: {
				events: {
					click: this.createBorder.bind(this)
				}
			}
		})

		return table
	}
}
class TableManager {
	constructor() {
		this.borderList = []
		this.el = this.createElement()
	}
	addBorder(event) {
		console.log(event.detail)
		const tableId = event.detail.id
		let counter = event.detail.counter
		this.borderList.push(tableId)
		const el = event.detail.el
		el.innerText = ''
		el.innerText = `Кількість натискань - ${counter}`
		this.displayList()
	}
	displayList() {
		for (const children of this.container.children) {
			for (const el of this.borderList) {
				if (children.id == el) {
					children.className = 'borderStyle'
				}
			}
		}
	}
	createElement() {
		this.container = document.createElement('div')


		const table1 = new CreateTableList({
			id: 1, numberTr: 3, numberTd: 3, counter: 0
		})
		table1.elTable.addEventListener('newBorder', this.addBorder.bind(this))
		this.container.append(table1.elTitle)
		this.container.append(table1.elTable)


		const table2 = new CreateTableList({ id: 2, numberTr: 3, numberTd: 3, counter: 0 })
		table2.elTable.addEventListener('newBorder', this.addBorder.bind(this))
		this.container.append(table2.elTitle)
		this.container.append(table2.elTable)


		const table3 = new CreateTableList({ id: 3, numberTr: 3, numberTd: 3, counter: 0 })
		table3.elTable.addEventListener('newBorder', this.addBorder.bind(this))
		this.container.append(table3.elTitle)
		this.container.append(table3.elTable)

		return this.container
	}
	render(targetEl) {
		document.querySelector(targetEl).append(this.el)
	}
}

window.onload = function () {
	const newTable = new TableManager()
	newTable.render('.task')
}