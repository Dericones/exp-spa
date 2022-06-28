export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
    this.switch()
    this.changeBold()
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
    .then(data => data.text())
    .then(html => {
      document.querySelector('#app').innerHTML = html
    })
    this.changeBold()
  }

  switch() {
    const { pathname } = window.location
    const { body } = document

    switch (pathname) {
      case '/about':
        body.className = 'about'
        return

      case '/explorer':
        body.className = 'explorer'
        return

      default:
        body.className = ''
        return
    }
  }

  changeBold() {
    const { pathname } = window.location
    const home = document.querySelector('.home')
    const abo = document.querySelector('.abo')
    const exp = document.querySelector('.exp')

    switch (pathname) {
      case '/about':
        abo.classList.add('grow')
        home.classList.remove('grow')
        exp.classList.remove('grow')
        return
      
      case '/explorer':
        exp.classList.add('grow')
        home.classList.remove('grow')
        abo.classList.remove('grow')
        return
      
      default:
        home.classList.add('grow')
        abo.classList.remove('grow')
        exp.classList.remove('grow')
        return
    }
  }  
}

