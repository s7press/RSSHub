import { Hono } from 'hono';
import Index from '@/views/index';
import got from 'got';
import * as cheerio from 'cheerio';

const app = new Hono();

// Ana səhifə
app.get('/', (ctx) => {
    ctx.header('Cache-Control', 'no-cache');
    return ctx.html(<Index debugQuery={ctx.req.query('debug')} />);
});

// APA Turizm route
app.get('/apa/turizm', async (ctx) => {
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

        return ctx.json({
            title: 'APA.az - Turizm xəbərləri',
            link: url,
            item: items,
        });
    } catch (err) {
        return ctx.json({ error: 'APA turizm route işləmədi', details: String(err) }, 500);
    }
});

export default app;
