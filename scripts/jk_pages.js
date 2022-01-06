import axios from "axios";
import cheerio from "cheerio"
import fs from 'fs'
const url = 'https://jkanime.net/directorio/1/';
const visited = new Set();
const allProducts = [];

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


const getHtmlAxios = async url => {
  const { data } = await axios.get(url);
  await sleep(500);
  return data;
};

const getHtml = async url => {
  return await getHtmlAxios(url);
};

const extractContent = $ =>
  $('.product')
    .map((_, product) => {
      const $product = $(product);

      return {
        id: $product.find('a[data-product_id]').attr('data-product_id'),
        title: $product.find('h2').text(),
        price: $product.find('.price').text(),
      };
    })
    .toArray();

const extractLinks = $ => [
  ...new Set(
    $('.page-numbers a')
      .map((_, a) => $(a).attr('href'))
      .toArray()
  ),
];

const hasNext = $ => {
  if ($('.nav-next').length) return true
  else return false
}

const crawl = async url => {
  visited.add(url);
  console.log('Crawl: ', url);
  const html = await getHtml(url);
  const $ = cheerio.load(html);
  fs.writeFileSync(`resources/jk/pages/${parseInt(url.split('/')[4])}.html`, html)
  if (hasNext($)) {
    const page = parseInt(url.split('/')[4]) + 1
    q.enqueue(crawlTask, `https://jkanime.net/directorio/${page}/`)
  }
};

// Change the default concurrency or pass it as param 
const queue = (concurrency = 2) => {
  let running = 0;
  const tasks = [];

  return {
    enqueue: async (task, ...params) => {
      tasks.push({ task, params });
      if (running >= concurrency) {
        return;
      }

      ++running;
      while (tasks.length) {
        const { task, params } = tasks.shift();
        await task(...params);
      }
      --running;
    },
  };
};

const crawlTask = async url => {
  if (visited.has(url)) {
    return;
  }

  await crawl(url);
};

const q = queue();
q.enqueue(crawlTask, url);