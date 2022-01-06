import Data from "$lib/Data";
import redis from "$lib/redis";

export async function get() {
    const items = Data.getAllSaved()
    const shuffled = items.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 15);
    return {
        status: 200,
        body: selected,
    }
}