import cheerio from "cheerio"
import Data from "$lib/Data"
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
        const saved: Anime = Data.getSavedItem(it.slug)
        if (saved) {
          if ((saved.type == 'OVA' || saved.type == 'MOVIE' || saved.type == 'SPECIAL') && saved.uploadedEpisodes == 1) saved.episode = 1
          else saved.episode = it.episode
          return saved
        }
      }).filter(it => it != null)

      const new_additions = $('.side-menu > li').toArray().map((el) => {
        const $el = $(el);
        const it = {
          slug: $el.find('a').attr('href').split('/')[3],
        }
        const saved: Anime = Data.getSavedItem(it.slug)
        if (saved) {
          return saved
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
