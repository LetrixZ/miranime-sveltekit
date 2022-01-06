import Data from "$lib/Data";

export async function get(request) {
  const item = Data.getSavedItem(request.params.slug)
  if (item) return {
    status: 200,
    body: item
  }
  else return {
    status: 404,
    body: { message: 'item not found' }
  }
}