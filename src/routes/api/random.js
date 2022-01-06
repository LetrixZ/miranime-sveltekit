import Data from "$lib/Data";

export async function get(request) {
  let item = Data.items[Math.floor(Math.random() * Data.items.length)];
  while (Data.saved().filter(it => it.slug == item.slug).length > 0) {
    console.log(Data.saved().filter(it => it.slug == item.slug));
    item = Data.items[Math.floor(Math.random() * Data.items.length)];
  }
  return {
    status: 200,
    body: item
  }
}