import { storiesOf } from '@storybook/vue'

storiesOf('Async data', module)
  .add('data as Promise', () => ({
    data: () => ({
      treeData: $store.dispatch('PROMISE')
    }),
    template: `
      <div>
        <p>It is able to pass any promise-like object (object has <b>then</b> method)</p>
        <tree :data="treeData" />
      </div>
    `
  }))
  .add('fetchData options as string', () => ({
    data: () => ({
      treeOptions: {
        fetchData: `/fetch0/data-{id}.json?text={text}`,

        // the same as above
        /*
        fetchData(node) {
          return `/assets/data/fetch0/data-${node.id}.json`
        }
        */

        onFetchError(error) {
          console.log(error)
        }
      }
    }),
    template: `
      <div>
        <p>fetchData receives a template for the url. Braces will be replaces by a relevant property of the Node. If data is not passed it will make a request with <b>id = root</b></p>
        <tree :options="treeOptions" />
      </div>
    `
  }))
  .add('fetchData options as string with default data', () => ({
    data: () => ({
      treeData: [
        {
          "text": "Getting Started",
          "isBatch": true,
          "id": 1
        },
        {
          "text": "Patterns",
          "isBatch": true,
          "id": 2
        },
        {
          "text": "Has an error",
          "isBatch": true
        }
      ],
      treeOptions: {
        fetchData: `/fetch0/data-{id}.json?text={text}`,

        // the same as above
        /*
        fetchData(node) {
          return `/assets/data/fetch0/data-${node.id}.json`
        }
        */

        onFetchError(error) {
          console.log(error)
        }
      }
    }),
    template: `
      <div>
        <p>Tree data is passed. Therefore, there is no request to the server.</p>
        <tree :data="treeData" :options="treeOptions" />
      </div>
    `
  }))
  .add('fetchData options as function', () => ({
    data: () => ({
      treeOptions: {
        fetchData(node) {
          // return Promise object
          return fetch(`/fetch0/data-${node.id}.json`).then(r => r.json()).catch(e => console.log(e))
        }
      }
    }),
    template: `
      <div>
        <p>You are able to handle a request by yourself. The function must return a <b>promise-like</b> object.</p>
        <tree :options="treeOptions" />
      </div>
    `
  }))

// Vuex emulation
const $store = {
  dispatch(t) {
    switch(t) {
      case 'FETCH-TREE': return fetch('/assets/data/fetch-example.json').then(r => r.json())
      case 'PROMISE': return new Promise(resolve => {
        setTimeout(_ => {
          resolve([{
            "text": "Item 1",
            "state": {
              "selected": true
            }
          },

          {
            "text": "Item 2",
            "state": {
              "expanded": true
            },
            "children": [{
                "text": "<b>Item 2.1</b>",
                "state": {
                  "checked": true
                }
              },
              {
                "text": "Item 2.2"
              },
              {
                "text": "Item 2.3",
                "children": [{
                    "text": "Item 2.2.3.1"
                  },
                  {
                    "text": "Item 2.2.3.2"
                  },
                  {
                    "text": "Item 2.2.3.3"
                  },
                  {
                    "text": "Item 2.2.3.4",
                    "children": [{
                        "text": "Item 2.2.3.4.1"
                      },
                      {
                        "text": "Item 2.2.3.4.2"
                      }
                    ]
                  }
                ]
              },
              {
                "text": "Item 2.4"
              }
            ]
          },

          {
            "text": "Item 3",
            "state": {
              "selected": true
            }
          },

          {
            "text": "Item 4"
          },

          {
            "text": "Item 5",
            "state": {
              "expanded": true,
              "disabled": true
            },
            "children": [{
                "text": "Item 5.1"
              },
              {
                "text": "Item 5.2"
              },
              {
                "text": "Item 5.3"
              }
            ]
          }
        ])
        }, 1500)
      })
    }
  }
}
