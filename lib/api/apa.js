// api/apa.js
export default function handler(req, res) {
  res.status(200).json({
    ok: true,
    message: "Apa.js işləyir!",
    link: "https://s7press.com"
  });
}
