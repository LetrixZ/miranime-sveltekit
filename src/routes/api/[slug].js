import Data from "$lib/Data";

export async function get(request) {
  const { slug } = request.params
  let item = Data.items.filter(it => it.slug == slug)
  console.log(item);
  let match = Data.get(slug)
  if (match) {
    item[0].match = match.match
    item[0].special = match.special
    item[0].notes = match.notes
  }
  if (item.length > 0) {
    return {
      status: 200,
      body: item[0]
    }
  } else {
    return {
      status: 404,
      body: null
    }
  }
}

export async function post(request) {
  const { slug } = request.params
  Data.save(slug, JSON.parse(request.body))
  return {
    status: 200,
    body: []
  }
}