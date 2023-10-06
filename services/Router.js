const Router = {
  init: () => {
    document.querySelectorAll('a.navlink').forEach((l) => {
      l.addEventListener('click', (e) => {
        e.preventDefault()
        const url = l.getAttribute('href')
        Router.go(url)
      })
    })
    // Event handler for URL changes
    window.addEventListener('popstate', (e) => Router.go(e.state.route, false))

    // Check the initial URL
    Router.go(location.pathname)
  },

  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`)

    if (addToHistory) {
      history.pushState({ route }, '', route)
    }

    let pageElement = null

    switch (route) {
      case '/':
        pageElement = document.createElement('h1')
        pageElement.textContent = 'Welcome Home'
        break
      case '/order':
        pageElement = document.createElement('h1')
        pageElement.textContent = 'Order'
        break
      default:
        if (route.startsWith('/product/')) {
          pageElement = document.createElement('h1')
          pageElement.textContent = 'Product'
          const paramId = route.split('/product/')[1]
          pageElement.dataset.id = paramId
        } else {
          pageElement = document.createElement('h1')
          pageElement.textContent = '404'
        }
    }

    if (pageElement) {
      const cache = document.querySelector('main')
      if (cache.children[0]) {
        cache.children[0].remove()
      }
      cache.appendChild(pageElement)
      window.scrollX = 0
      window.scrollY = 0
    }
  },
}

export default Router
