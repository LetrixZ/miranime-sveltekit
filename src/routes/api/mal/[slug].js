import Data from "$lib/Data"

export async function get(request) {
  const { slug } = request.params
  const item = Data.getMAL(slug)
  if (item) item.ratio = 100
  return {
    status: 200,
    body: item
  }
}