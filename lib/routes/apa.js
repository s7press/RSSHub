import got from 'got';
import * as cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const url = 'https://apa.az/az/turizm';
    const response = await got(url);
    const $ = cheerio.load(response.body);

    const items = $('div.news-list div.news-item')
      .slice(0, 10)
      .map((_, el) => {
        const a = $(el).find('a');
        const link = a.attr('href');
        const title = a.text().trim();
        return { title, link };
      })
      .get();

    res.status(200).json({
      title: 'APA.az - Turizm xəbərləri',
      link: url,
      item: items,
    });
  } catch (err) {
    res.status(500).json({
      error: 'APA turizm route işləmədi',
      details: String(err),
    });
  }
}
