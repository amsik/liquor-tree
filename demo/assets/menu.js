;(_ => {

  document.addEventListener('DOMContentLoaded', initMenu)

  const menuItems = [
    { text: 'Basic Usage', href: 'basic-usage.html' },
    { text: 'Checkboxes', href: 'checkboxes.html' },,
    { text: 'Events', href: 'events.html' },
    { text: 'Async Data', href: 'async.html' },
    { text: 'Custom Node/Icons', href: 'custom.html' },
    { text: 'Sorting', href: 'sorting.html' },
    { text: 'Filtering', href: 'filtering.html' },
    { text: 'Editing', href: 'editing.html' },
    { text: 'Custom theme', href: 'custom-theme.html' },
    { text: 'Vuex Integration', href: 'vuex.html' },
    { text: 'Exporting', href: 'exporting.html' }
  ]

  function initMenu() {
    const $hello = document.querySelector('.hello')

    if (!$hello) {
      return console.error('No hello container!')
    }

    const $menu = document.createElement('div')
    $menu.className = 'menu'

    $hello.append($menu)

    $menu.innerHTML = '<span></span><span></span><span></span>'

    createMenu($menu)
  }

  function createMenu(menu) {
    const container = document.createElement('div')
    container.className = 'menu-container'

    menuItems.forEach(item => {
      container.append(
        createLink(item)
      )
    })

    menu.addEventListener('click', _ => {
      container.classList.add('opened')
      initClose()
    }, false)

    function initClose() {
      window.addEventListener('mousedown', function close(e) {
        if (!e.target.closest('.menu-container')) {
          container.classList.remove('opened')
          window.removeEventListener('mousedown', close, false)
        }
      }, false)
    }


    document.body.appendChild(container)
  }

  function createLink({ text, href }) {
    let a = document.createElement('a')

    a.innerText = text
    a.href = href

    return a
  }

})();
