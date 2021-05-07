// scrapes web page for recipes from 'https://irenamacri.com/recipes'
// specific to this domain

/* ToDo:
 * find way to smart remove commas to facilitate correctly
 * formatted CSV file.
 *
 * Install node modules globally to avoid local dir bloat (incl downstream
 * issues re GIT operations)
 */

// gethers: title, description, ingredients & cooking steps.

const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const writeStream = fs.createWriteStream('recipe.csv')

// write headers
writeStream.write(`Title, Description, Ingredients, Steps\n`)

request(
  'https://irenamacri.com/recipes/paleo-chicken-prawn-thai-laksa',
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html)

      const recipeTitle = $('.tasty-recipes-title').text()
      const recipeDesc = $('.tasty-recipes-description  > p')
        .text()
        .replace(/,/g, '.')

      console.log(recipeTitle)
      console.log(recipeDesc)

      const cr = $('\n')

      writeStream.write(`${recipeTitle}, ${cr}`)
      writeStream.write(`${recipeDesc}, ${cr}`)

      const ingredientsTitle = `Ingredients...`
      console.log(`${ingredientsTitle}, ${cr}`)
      writeStream.write(`${cr}, ${ingredientsTitle}, ${cr}`)

      $('.tasty-recipes-ingredients li').each((i, el) => {
        const ingredient = $(el).text()

        const cr = $(`\n`)

        console.log(`${ingredient}`)

        writeStream.write(`${ingredient}, ${cr}`)
      })

      const stepsTitle = `Steps...`
      console.log(`${stepsTitle}, ${cr}`)

      writeStream.write(`${cr}, ${stepsTitle}, ${cr}`)

      $('.tasty-recipes-instructions li').each((i, el) => {
        const step = $(el).text()

        const cr = $('\n')

        console.log(`${step}`)

        writeStream.write(`${step}, ${cr}`)
      })
    }
    console.log('Done writing to file...')
  },
)
