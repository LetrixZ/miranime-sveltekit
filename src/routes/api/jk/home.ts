import Data, { getSavedItem } from "$lib/Data"
import cheerio from "cheerio"
import type Anime from "$lib/models/Anime"
// import redis from "$lib/redis"
export async function get() {
  // const redisData = await redis.get('jk_home')
  const redisData = null
  if (!redisData) {
    const res = await fetch('https://jkanime.net/')
    if (res.ok) {
      const $ = cheerio.load(await res.text())

      const recent_episodes = $('.maximoaltura > a.bloqq').toArray().map((el) => {
        const $el = $(el);
        const it = {
          slug: $el.attr('href').split('/')[3],
          episode: parseInt($el.attr('href').split('/')[4]),
        }
        const saved: Anime = getSavedItem(it.slug)
        if (saved) {
          const item = { ...saved }
          if ((item.type == 'OVA' || item.type == 'MOVIE' || item.type == 'SPECIAL') && item.uploadedEpisodes == 1) item.episode = 1
          else item.episode = it.episode
          return item
        }
      }).filter(it => it != null)

      const new_additions = $('.side-menu > li').toArray().map((el) => {
        const $el = $(el);
        const it = {
          slug: $el.find('a').attr('href').split('/')[3],
        }
        const saved: Anime = getSavedItem(it.slug)
        if (saved) {
          const item = { ...saved }
          return item
        }
      }).filter(it => it != null)

      // await redis.set('jk_home', JSON.stringify({ recent_episodes, new_additions }), 'EX', 30 * 60)

      return {
        status: 200,
        body: { new_additions, recent_episodes }
      }
    }
  } else {
    return {
      status: 200,
      body: { ...JSON.parse(redisData) }
    }
  }
  return {
    status: 500,
    body: { message: 'request failed' }
  }
}
