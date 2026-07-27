const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const url = 'https://apa.az/az/turizm'; // APA.az Turizm xəbərləri
    const response = await got(url);
    const $ = cheerio.load(response.data);

    const items = $('div.news-list div.news-item')
        .slice(0, 10)
        .map((_, el) => {
            const a = $(el).find('a');
            const link = a.attr('href');
            const title = a.text().trim();
            return {
                title,
                link,
            };
        })
        .get();

    ctx.state.data = {
        title: 'APA.az - Turizm xəbərləri',
        link: url,
        item: items,
    };
};
