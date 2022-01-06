import fs from 'fs'

const fixedCovers = JSON.parse(fs.readFileSync('resources/fixed_covers.json'))

const convert = () => {
  const jkItems = JSON.parse(fs.readFileSync('resources/jk/all_items.json'))
  const data = JSON.parse(fs.readFileSync('resources/saved.json'));
  const items = data.map(it => {
    const jkItem = jkItems.filter(jk => jk.slug === it.slug)?.[0]
    const fc = fixedCovers.filter(fix => fix.slug === it.slug)?.[0]
    const item = {
      slug: it.slug,
      synopsis: jkItem?.synopsis,
      uploadedEpisodes: jkItem.episodes,
      // startDate: jkItem?.startDate,
      ...it.match,
      picture: fc?.new_picture ?? it.match.picture
    }
    delete item.ratio
    return item
  })
  fs.writeFileSync('resources/data.json', JSON.stringify(items))
}

convert()