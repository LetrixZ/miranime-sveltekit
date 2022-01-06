import Data from "$lib/Data"

export async function get(request) {
  return {
    status: 200,
    body: Data.saved()
  }
}