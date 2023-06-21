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
			...(inputOptions ?? {})
		})
		const label = ElementsCreator.createHTMLElement({
			tag: 'label',
			...(labelOptions ?? {})
		})
		label.append(inp)
		return { label, inp }
	}
}
class addTaskForm {
	constructor() {
		this.el = this.createElement()
	}
	onAddTask() {
		const addEvent = new CustomEvent('add', {
			detail: {
				title: this.taskTitleInp.value,
				priority: this.taskPriorityInp.value,
			}
		})
		this.el.dispatchEvent(addEvent)
	}

	createElement() {
		const container = ElementsCreator.createHTMLElement({
			tag: 'div'
		})
		const h1 = ElementsCreator.createHTMLElement({
			tag: 'h1',
			props: {
				innerText: 'Нова задача'
			}
		})
		container.append(h1)

		const div1 = document.createElement
			('div')
		let obj1 = ElementsCreator.
			createInputWithLabel({
				labelOptions: {
					props: {
						innerText: 'Текст задачі',
					}
				},
				inputOptions: {
					atrrs: {
						placeholder: 'Нова задача',
					}
				},
			})
		div1.append(obj1.label)
		this.taskTitleInp = obj1.inp
		container.append(div1)
		const div2 = document.createElement
			('div')
		let obj2 = ElementsCreator.
			createInputWithLabel({
				labelOptions: {
					props: {
						innerText: 'Пріоритетність задачі',
					}
				},
				inputOptions: {
					atrrs: {
						placeholder: 'Пріоритет',
					},
					props: {
						type: 'number',
					}
				},
			})
		div2.append(obj2.label)
		this.taskPriorityInp = obj2.inp
		container.append(div2)

		const btn = ElementsCreator.createHTMLElement({
			tag: 'button',
			props: {
				innerText: 'Додати задачу',
			},
			events: {
				click: this.onAddTask.bind(this),
			},
		})
		container.append(btn)
		return container
	}
	render(targetSelector) {
		document.querySelector(targetSelector).append(this.el)
	}
}

class Task {
	constructor({ id, title, priority }) {
		this.title = title
		this.priority = priority
		this.id = id
		this.el = this.createElement()
	}
	onDelete() {
		const deleteEvent = new CustomEvent('delete', {
			detail: {
				taskId: this.id
			}
		})
		this.el.dispatchEvent(deleteEvent)
	}
	createElement() {
		const container = document.createElement('div')

		const span = ElementsCreator.createHTMLElement({
			tag: 'span',
			props: {
				innerText: `${this.title} - ${this.priority}`
			}
		})
		container.append(span)

		const btn = ElementsCreator.createHTMLElement({
			tag: 'button',
			props: {
				innerText: 'remove'
			},
			events: {
				dblclick: this.onDelete.bind(this),
			}
		})
		container.append(btn)

		return container
	}
}

class TaskManager {
	constructor() {
		this.taskList = []
		this.el = this.createElement()
	}
	deleteTask(event) {
		const taskId = event.detail.taskId
		this.taskList = this.taskList.filter(task => task.id !== taskId)
		this.displayList()
	}
	addTask(event) {
		const task = {
			id: new Date().getTime(),
			...event.detail,
		}
		const taskObj = new Task(task)
		taskObj.el.addEventListener('delete', this.deleteTask.bind(this))
		this.taskList.push(taskObj)
		this.displayList()
	}

	displayList() {
		this.tasksContainer.innerHTML = ''
		this.taskList.forEach(task => {
			this.tasksContainer.append(task.el)
		})
	}
	createElement() {
		const container = document.createElement('div')

		const addForm = new addTaskForm()
		addForm.el.addEventListener('add', this.addTask.bind(this))
		container.append(addForm.el)

		this.tasksContainer = document.createElement('div')
		container.append(this.tasksContainer)

		return container
	}
	render(targetEl) {
		document.querySelector(targetEl).append(this.el)
	}
}

window.onload = function () {
	const manager = new TaskManager()
	manager.render('.taskForm')
}