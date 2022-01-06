import fs from 'fs'
import cheerio from 'cheerio';

const getItem = ($) => {
  return {
    slug: $.find('a').attr('href').split('/')[3],
    title: $.find('a').text(),
    poster: $.find('img').attr('src'),
    synopsis: $.find('.synopsis').text().trim(),
    status: $.find('.card-status').text().trim(),
    type: $.find('p.card-txt').text().trim(),
    startDate: $.find('.card-text.ep small').text(),
    episodes: parseInt($.find('.card-text.ep').contents().first().text().match(/\d+/)?.[0]) || null
  }
}

const getPage = $ => {
  return $('.custom_item2').map((_, item) => {
    return getItem($(item))
  }).toArray()
}
const getFiles = () => {
  const items = []
  fs.readdirSync('resources/jk/pages').forEach(file => {
    items.push(...getPage(cheerio.load(fs.readFileSync(`resources/jk/pages/${file}`))))
  })
  fs.writeFileSync('resources/jk/all_items.json', JSON.stringify(items))
}

const filterMatched = () => {
  const allItems = JSON.parse(fs.readFileSync('resources/jk/all_items.json'))
  const savedItems = JSON.parse(fs.readFileSync('resources/saved.json'))
  const savedSlugs = savedItems.map(it => it.slug)
  const newItems = allItems.filter(it => savedSlugs.filter(sit => it.slug === sit).length == 0 )
  fs.writeFileSync('resources/jk/new_items.json', JSON.stringify(newItems))
}
getFiles()
filterMatched()