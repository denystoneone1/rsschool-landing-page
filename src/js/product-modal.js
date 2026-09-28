import { formatPrice, getImageUrl } from './products.js'

const BODY_LOCK_CLASS = 'is-modal-open'

function toCents(value) {
	return Math.round(Number(value) * 100)
}

function createOption(template, { type, name, value, key, label }) {
	const option = template.content.firstElementChild.cloneNode(true)
	const input = option.querySelector('input')

	input.type = type
	input.name = name
	input.value = value
	option.querySelector('.product-modal__option-key').textContent = key
	option.querySelector('.product-modal__option-value').textContent = label

	return option
}

export function createProductModal() {
	const dialog = document.querySelector('.product-modal')
	const modalTemplate = document.getElementById('product-modal-template')
	const optionTemplate = document.getElementById('product-option-template')

	if (!dialog || !modalTemplate || !optionTemplate) return null

	dialog.append(modalTemplate.content.cloneNode(true))
	dialog.setAttribute('aria-labelledby', 'product-modal-name')

	const img = dialog.querySelector('.product-modal__img')
	const name = dialog.querySelector('.product-modal__name')
	const text = dialog.querySelector('.product-modal__text')
	const price = dialog.querySelector('.product-modal__price')
	const sizes = dialog.querySelector('[data-modal-sizes]')
	const additives = dialog.querySelector('[data-modal-additives]')

	let product = null

	const updateTotal = () => {
		const size = sizes.querySelector(':checked')?.value
		const sizeCents = size ? toCents(product.sizes[size]['add-price']) : 0
		const additivesCents = [...additives.querySelectorAll(':checked')].reduce(
			(sum, input) =>
				sum + toCents(product.additives[input.value]['add-price']),
			0,
		)

		price.textContent = formatPrice(
			(toCents(product.price) + sizeCents + additivesCents) / 100,
		)
	}

	const renderOptions = () => {
		sizes.replaceChildren(
			...Object.entries(product.sizes).map(([key, { size }]) =>
				createOption(optionTemplate, {
					type: 'radio',
					name: 'size',
					value: key,
					key: key.toUpperCase(),
					label: size,
				}),
			),
		)
		additives.replaceChildren(
			...product.additives.map((additive, index) =>
				createOption(optionTemplate, {
					type: 'checkbox',
					name: 'additive',
					value: index,
					key: index + 1,
					label: additive.name,
				}),
			),
		)

		const firstSize = sizes.querySelector('input')

		if (firstSize) firstSize.checked = true
	}

	dialog.addEventListener('change', updateTotal)

	dialog.addEventListener('click', event => {
		if (event.target === dialog || event.target.closest('[data-modal-close]')) {
			dialog.close()
		}
	})

	dialog.addEventListener('close', () => {
		document.body.classList.remove(BODY_LOCK_CLASS)
	})

	return {
		open(nextProduct) {
			product = nextProduct
			img.src = getImageUrl(product)
			img.alt = product.name
			name.textContent = product.name
			text.textContent = product.description
			renderOptions()
			updateTotal()

			document.body.classList.add(BODY_LOCK_CLASS)
			dialog.showModal()
			dialog.scrollTop = 0
		},
	}
}
