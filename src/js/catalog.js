const EXPANDED_CLASS = 'menu__grid--expanded'

export function initCatalog() {
	const grid = document.querySelector('.menu__grid')
	const more = document.querySelector('.menu__more')

	if (!grid || !more) return

	more.addEventListener('click', () => {
		grid.classList.add(EXPANDED_CLASS)
		more.hidden = true
	})
}
