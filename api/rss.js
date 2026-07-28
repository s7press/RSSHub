// api/rss.js
export default function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>S7Press RSS</title>
      <link>https://s7press.com</link>
      <description>Son xəbərlər</description>
      <item>
        <title>Nümunə xəbər</title>
        <link>https://s7press.com/test</link>
        <description>Bu sadəcə test üçün nümunədir</description>
      </item>
    </channel>
  </rss>`;

  res.status(200).send(rss);
}
