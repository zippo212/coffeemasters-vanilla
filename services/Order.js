import { getProductById } from './Menu.js'

export async function addToCart(id) {
  const product = await getProductById(id)
  const result = app.store.cart.find((p) => p.product.id === Number(id))

  if (result) {
    app.store.cart = app.store.cart.map((p) =>
      p.product.id === Number(id) ? { ...p, quantity: p.quantity + 1 } : p
    )
  } else {
    app.store.cart = app.store.cart.concat({ product, quantity: 1 })
  }
}

export async function removeFromCart(id) {
  app.store.cart = app.store.cart.filter((p) => p.product.id !== Number(id))
}
