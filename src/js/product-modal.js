import { formatPrice, getImageUrl } from './products.js'

const BODY_LOCK_CLASS = 'is-modal-open'

export function createProductModal() {
	const dialog = document.querySelector('.product-modal')

	if (!dialog) return null

	const img = dialog.querySelector('.product-modal__img')
	const name = dialog.querySelector('.product-modal__name')
	const text = dialog.querySelector('.product-modal__text')
	const price = dialog.querySelector('.product-modal__price')

	dialog.addEventListener('click', event => {
		if (event.target === dialog || event.target.closest('[data-modal-close]')) {
			dialog.close()
		}
	})

	dialog.addEventListener('close', () => {
		document.body.classList.remove(BODY_LOCK_CLASS)
	})

	return {
		open(product) {
			img.src = getImageUrl(product)
			img.alt = product.name
			name.textContent = product.name
			text.textContent = product.description
			price.textContent = formatPrice(product.price)

			document.body.classList.add(BODY_LOCK_CLASS)
			dialog.showModal()
			dialog.scrollTop = 0
		},
	}
}
