const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const writeStream = fs.createWriteStream('ingredients.csv')

// write headers
writeStream.write(`Ingredient\n`)

request(
  'https://irenamacri.com/recipes/spicy-pumpkin-coconut-soup',
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)

      $('.tasty-recipes-ingredients li').each((i, el) => {
        const ingredient = $(el).text().replace(/,/g, '')

        const cr = $('\n')

        console.log(ingredient)

        writeStream.write(`${ingredient}, ${cr}`)
      })
    }
    console.log('Done writing to file.')
  },
)
