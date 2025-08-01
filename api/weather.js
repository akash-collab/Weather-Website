export default async function handler(req, res) {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      return res.status(404).json({ error: "City not found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}