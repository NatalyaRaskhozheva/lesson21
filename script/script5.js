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
	static createInputWithLabel({ labelOptions, inputOptions }) {
		const inp = ElementsCreator.createHTMLElement({
			tag: 'input',
			...(inputOptions ?? {}),
		})
		const label = ElementsCreator.createHTMLElement({
			tag: 'label',
			...(labelOptions ?? {})
		})
		label.append(inp)
		return { label, inp }
	}
}

class CreateForm {
	constructor({ title, }) {
		this.title = title
		this.el = this.createElement()
	}
	onValue() {
		const valueEvent = new CustomEvent('value', {
			detail: {
				input: this.obj1.inp
			}
		})
		this.el.dispatchEvent(valueEvent)
	}
	createElement() {
		let div = document.createElement('div')
		div.className = 'form'
		this.obj1 = ElementsCreator.createInputWithLabel({
			labelOptions: {
				props: {
					innerText: `${this.title}`
				}
			},
			inputOptions: {
				events: {
					click: this.onValue.bind(this)
				}
			}
		})
		div.append(this.obj1.label)
		return div
	}
}

class FormManager {
	constructor() {
		this.el = this.createElement()
	}
	createValue(event) {
		console.log(event.detail)
		event.detail.input.value = '0'
	}
	createElement() {
		this.container = document.createElement('div')

		const form1 = new CreateForm({ title: 'Вік' })
		form1.el.addEventListener('value', this.createValue.bind(this))
		this.container.append(form1.el)

		const form2 = new CreateForm({ title: 'Вага' })
		form2.el.addEventListener('value', this.createValue.bind(this))
		this.container.append(form2.el)

		const form3 = new CreateForm({ title: 'Зріст' })
		form3.el.addEventListener('value', this.createValue.bind(this))
		this.container.append(form3.el)

		const form4 = new CreateForm({ title: 'Заробітна плата' })
		form4.el.addEventListener('value', this.createValue.bind(this))
		this.container.append(form4.el)

		const form5 = new CreateForm({ title: 'Стаж' })
		form5.el.addEventListener('value', this.createValue.bind(this))
		this.container.append(form5.el)

		const form6 = new CreateForm({ title: 'Порядковий номер' })
		form6.el.addEventListener('value', this.createValue.bind(this))
		this.container.append(form6.el)

		const form7 = new CreateForm({ title: 'Вага' })
		form7.el.addEventListener('value', this.createValue.bind(this))
		this.container.append(form7.el)

		return this.container
	}
	render(targetEl) {
		document.querySelector(targetEl).append(this.el)
	}
}

window.onload = function () {
	const newForm = new FormManager()
	newForm.render('.task')
}