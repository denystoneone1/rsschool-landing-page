const TOGGLE_ACTIVE_CLASS = 'header__burger--active'
const MENU_OPEN_CLASS = 'burger-menu--open'
const BODY_LOCK_CLASS = 'is-menu-open'
const DESKTOP_QUERY = '(min-width: 769px)'

export function initBurger() {
	const toggle = document.querySelector('[data-burger-toggle]')

	if (!toggle) return

	const menu = document.getElementById(toggle.getAttribute('aria-controls'))

	if (!menu) return

	const isOpen = () => toggle.getAttribute('aria-expanded') === 'true'

	const setOpen = open => {
		toggle.setAttribute('aria-expanded', String(open))
		toggle.setAttribute(
			'aria-label',
			open ? 'Close navigation menu' : 'Open navigation menu',
		)
		toggle.classList.toggle(TOGGLE_ACTIVE_CLASS, open)
		menu.classList.toggle(MENU_OPEN_CLASS, open)
		menu.inert = !open
		document.body.classList.toggle(BODY_LOCK_CLASS, open)
	}

	toggle.addEventListener('click', () => {
		setOpen(!isOpen())
	})

	menu.addEventListener('click', event => {
		if (event.target.closest('a')) setOpen(false)
	})

	document.addEventListener('keydown', event => {
		if (event.key === 'Escape' && isOpen()) {
			setOpen(false)
			toggle.focus()
		}
	})

	matchMedia(DESKTOP_QUERY).addEventListener('change', event => {
		if (event.matches) setOpen(false)
	})
}
