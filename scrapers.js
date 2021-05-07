const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('ingredients.csv');

// write headers
writeStream.write(`Ingredient\n`);

request('https://irenamacri.com/recipes/spicy-pumpkin-coconut-soup', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $= cheerio.load(html);

    // const recipeDescription = $('.tasty-recipes-description');

    // const recipeDescBlurb = recipeDescription
    //   .find('p')
    //   .text();

    const recipeIngredients = $('.tasty-recipes-ingredients > ul');
    // #tasty-recipes-12547 > div > div.tasty-recipes-ingredients > ul

    const ingredientsList = recipeIngredients
    .children()
    .text()
    .replace(/,/g, '');


    // console.log(recipeDescription.html());
    // console.log(recipeDescBlurb);
    // console.log(ingredientsList);
    console.log(recipeIngredients);
    
    // write row to CSV
    writeStream.write(`${ingredientsList}\n`);

  }
  
});


