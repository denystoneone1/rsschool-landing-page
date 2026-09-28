import { formatPrice, getImageUrl, getProducts } from './products.js'

const EXPANDED_CLASS = 'menu__grid--expanded'
const DEFAULT_CATEGORY = 'coffee'

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
	grid.replaceChildren(
		...getProducts(category).map(product => createCard(template, product)),
	)
}

export function initCatalog() {
	const grid = document.querySelector('.menu__grid')
	const template = document.getElementById('menu-card-template')
	const more = document.querySelector('.menu__more')

	if (!grid || !template || !more) return

	renderCards(grid, template, DEFAULT_CATEGORY)

	more.addEventListener('click', () => {
		grid.classList.add(EXPANDED_CLASS)
		more.hidden = true
	})
}
