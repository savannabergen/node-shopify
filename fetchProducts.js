require('dotenv').config()
const Shopify = require('shopify-api-node')

const shopify = new Shopify({
  shopName: process.env.SHOPIFY_STORE,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN
})

const query = `{
  products(first: 10) {
    edges {
      node {
        id
        title
        variants(first: 10) {
          edges {
            node {
              id
              title
              price
            }
          }
        }
      }
    }
  }
}`

const fetchProducts = async () => {
  try {
    const response = await shopify.graphql(query)
    console.log('Products', JSON.stringify(response, null, 2))
  } catch (error) {
    console.log('Error Fetching Products', error)
  }
}

fetchProducts()