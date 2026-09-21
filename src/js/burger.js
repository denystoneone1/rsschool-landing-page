const TOGGLE_ACTIVE_CLASS = 'header__burger--active'
const BODY_LOCK_CLASS = 'is-menu-open'
const DESKTOP_QUERY = '(min-width: 769px)'

export function initBurger() {
	const toggle = document.querySelector('[data-burger-toggle]')

	if (!toggle) return

	const menu = document.getElementById(toggle.getAttribute('aria-controls'))

	if (!menu) return

	const setOpen = isOpen => {
		toggle.setAttribute('aria-expanded', String(isOpen))
		toggle.classList.toggle(TOGGLE_ACTIVE_CLASS, isOpen)
		menu.hidden = !isOpen
		document.body.classList.toggle(BODY_LOCK_CLASS, isOpen)
	}

	toggle.addEventListener('click', () => {
		setOpen(toggle.getAttribute('aria-expanded') !== 'true')
	})

	menu.addEventListener('click', event => {
		if (event.target.closest('a')) setOpen(false)
	})

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape') setOpen(false)
	})

	matchMedia(DESKTOP_QUERY).addEventListener('change', event => {
		if (event.matches) setOpen(false)
	})
}
