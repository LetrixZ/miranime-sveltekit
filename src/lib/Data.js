import fs from 'fs'

const file = fs.readFileSync("resources/join_new.json")
const data = JSON.parse(file.toString())

const file2 = fs.readFileSync("resources/items.json")
const data2 = JSON.parse(file2.toString())

function save(slug, item) {
  const file = fs.readFileSync("resources/saved.json")
  const data = JSON.parse(file.toString())
  const filter = data.filter(it => it.slug == slug)
  if (filter.length > 0) {
    const it = filter[0]
    it.match = item.match
    it.special = item.special
    it.notes = item.notes
    const index = data.indexOf(it)
    data[index] = it
  } else data.push(item)
  fs.writeFileSync("resources/saved.json", JSON.stringify(data))
}

function get(slug) {
  const file = fs.readFileSync("resources/saved.json")
  const data = JSON.parse(file.toString())
  const filter = data.filter(it => it.slug == slug)
  if (filter.length > 0) {
    return filter[0]
  } else return null
}

function saved() {
  const file = fs.readFileSync("resources/saved.json")
  const data = JSON.parse(file.toString())
  return data
}

function getMAL(slug) {
  let item = data2.filter(it => it.sources.filter(it1 => it1.source == "MAL").length > 0 && it.sources.filter(it1 => it1.source == "MAL")[0].slug == slug)
  console.log(item);
  if (item.length > 0) {
    return item[0]
  } else {
    return null
  }
}

function getStats() {
  const total = data.length
  const saved = JSON.parse(fs.readFileSync("resources/saved.json").toString())
  const matched = saved.length
  return { total, matched, remaining: total - matched }
}

const getAllSaved = () => {
  const data = JSON.parse(fs.readFileSync("resources/data.json").toString())
  return data
}

const getSavedItem = (slug) => {
  const data = JSON.parse(fs.readFileSync("resources/data.json").toString())
  let item = data.filter(it => it.slug === slug)?.[0]
  if (item) {
    return item
  } else {
    return null
  }
}

export default { items: data, save, get, saved, getMAL, getStats, getAllSaved, getSavedItem }