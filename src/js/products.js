import products from '../data/products.json'

export function getProducts(category) {
	return products.filter(product => product.category === category)
}

export function getImageUrl(product) {
	return new URL(`../assets/images/menu/${product.image}`, import.meta.url).href
}

export function formatPrice(value) {
	return `$${Number(value).toFixed(2)}`
}
