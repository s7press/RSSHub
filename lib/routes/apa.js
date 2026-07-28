// api/apa.js
export default async function handler(req, res) {
  try {
    // Sadə JSON cavabı qaytarır
    res.status(200).json({
      message: "Apa.js işləyir!",
      link: "https://s7press.com", // buraya öz sayt linkini yaza bilərsən
    });
  } catch (error) {
    res.status(500).json({ error: "Serverdə problem yarandı" });
  }
}
