const DOT_ACTIVE_CLASS = 'slider__dot--active'
const SWIPE_THRESHOLD = 50

export function initSlider() {
	const slider = document.querySelector('.slider')

	if (!slider) return

	const track = slider.querySelector('.slider__track')
	const viewport = slider.querySelector('.slider__viewport')
	const slides = [...slider.querySelectorAll('.slider__slide')]
	const dots = [...slider.querySelectorAll('.slider__dot')]
	const prev = slider.querySelector('[data-slider-prev]')
	const next = slider.querySelector('[data-slider-next]')

	if (!track || !viewport || slides.length < 2) return

	let current = 0

	const goTo = index => {
		current = (index + slides.length) % slides.length
		track.style.setProperty('--slide-index', current)

		slides.forEach((slide, i) => {
			slide.inert = i !== current
		})

		dots.forEach((dot, i) => {
			const isActive = i === current

			dot.classList.toggle(DOT_ACTIVE_CLASS, isActive)
			dot.setAttribute('aria-current', String(isActive))
		})
	}

	prev?.addEventListener('click', () => goTo(current - 1))
	next?.addEventListener('click', () => goTo(current + 1))

	dots.forEach((dot, i) => {
		dot.addEventListener('click', () => goTo(i))
	})

	let startX = null

	viewport.addEventListener('pointerdown', event => {
		startX = event.clientX
	})

	viewport.addEventListener('pointerup', event => {
		if (startX === null) return

		const deltaX = event.clientX - startX

		startX = null

		if (Math.abs(deltaX) < SWIPE_THRESHOLD) return

		goTo(deltaX < 0 ? current + 1 : current - 1)
	})

	viewport.addEventListener('pointercancel', () => {
		startX = null
	})

	goTo(0)
}
