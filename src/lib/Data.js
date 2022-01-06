// const file = fs.readFileSync("$lib/resources/join_new.json")
// const data = JSON.parse(file.toString())

// const file2 = fs.readFileSync("$lib/resources/items.json")
// const data2 = JSON.parse(file2.toString())
import Data from '$lib/content/data.json'

async function save(slug, item) {
  const res = await fetch("/assets/resources/join_new.json")
  const data = await res.json()
  const filter = data.filter(it => it.slug == slug)
  if (filter.length > 0) {
    const it = filter[0]
    it.match = item.match
    it.special = item.special
    it.notes = item.notes
    const index = data.indexOf(it)
    data[index] = it
  } else data.push(item)
  // fs.writeFileSync("$lib/resources/saved.json", JSON.stringify(data))
}

function get(slug) {
  const file = fs.readFileSync("$lib/resources/saved.json")
  const data = JSON.parse(file.toString())
  const filter = data.filter(it => it.slug == slug)
  if (filter.length > 0) {
    return filter[0]
  } else return null
}

function saved() {
  const file = fs.readFileSync("$lib/resources/saved.json")
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
  const saved = JSON.parse(fs.readFileSync("$lib/resources/saved.json").toString())
  const matched = saved.length
  return { total, matched, remaining: total - matched }
}

const getAllSaved = () => {
  // const res = await fetch('assets/resources/data.json')
  // const data = await res.json()
  return Data
}

export const getSavedItem = (slug) => Data.filter(it => it.slug === slug)?.[0]

// export default { items: 'data', save, get, saved, getMAL, getStats, getAllSaved, getSavedItem }
export default Data