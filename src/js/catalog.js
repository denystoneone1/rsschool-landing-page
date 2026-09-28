import { formatPrice, getImageUrl, getProducts } from './products.js'

const EXPANDED_CLASS = 'menu__grid--expanded'
const TAB_ACTIVE_CLASS = 'menu__tab--active'
const INITIAL_COUNT_TABLET = 4

function createCard(template, product) {
	const item = template.content.firstElementChild.cloneNode(true)
	const img = item.querySelector('.menu-card__img')

	img.src = getImageUrl(product)
	img.alt = product.name
	item.querySelector('.menu-card__name').textContent = product.name
	item.querySelector('.menu-card__text').textContent = product.description
	item.querySelector('.menu-card__price').textContent = formatPrice(
		product.price,
	)

	return item
}

function renderCards(grid, template, category) {
	const products = getProducts(category)

	grid.replaceChildren(
		...products.map(product => createCard(template, product)),
	)

	return products.length
}

function setActiveTab(tabs, activeTab) {
	tabs.forEach(tab => {
		const isActive = tab === activeTab

		tab.classList.toggle(TAB_ACTIVE_CLASS, isActive)
		tab.setAttribute('aria-pressed', String(isActive))
	})
}

export function initCatalog() {
	const grid = document.querySelector('.menu__grid')
	const template = document.getElementById('menu-card-template')
	const tabs = [...document.querySelectorAll('.menu__tab[data-category]')]
	const more = document.querySelector('.menu__more')

	if (!grid || !template || !tabs.length || !more) return

	const showCategory = tab => {
		setActiveTab(tabs, tab)
		const count = renderCards(grid, template, tab.dataset.category)

		grid.classList.remove(EXPANDED_CLASS)
		more.hidden = count <= INITIAL_COUNT_TABLET
	}

	showCategory(tabs[0])

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			if (!tab.classList.contains(TAB_ACTIVE_CLASS)) showCategory(tab)
		})
	})

	more.addEventListener('click', () => {
		grid.classList.add(EXPANDED_CLASS)
		more.hidden = true
	})
}
