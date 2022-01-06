import Data from "$lib/Data";

export async function get() {
    const shuffled = Data.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 15);
    return {
        status: 200,
        body: selected,
    }
}