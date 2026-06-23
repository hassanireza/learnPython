"""
Day 28 Project: Weather CLI App
================================
Fetch live weather using Open-Meteo API (no API key needed).
"""
import json
import urllib.request
import urllib.parse
import urllib.error


WMO_CODES: dict[int, str] = {
    0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
    45: "Fog", 48: "Rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
    61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
    71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow",
    80: "Rain showers", 81: "Moderate showers", 82: "Violent showers",
    95: "Thunderstorm", 96: "Thunderstorm with hail",
}


def geocode(city: str) -> tuple[float, float, str]:
    """Return (lat, lon, display_name) for a city."""
    params = urllib.parse.urlencode({"name": city, "count": 1, "format": "json"})
    url = f"https://geocoding-api.open-meteo.com/v1/search?{params}"
    with urllib.request.urlopen(url, timeout=10) as resp:
        data = json.loads(resp.read())
    results = data.get("results", [])
    if not results:
        raise ValueError(f"City not found: {city!r}")
    r = results[0]
    return r["latitude"], r["longitude"], f"{r['name']}, {r.get('country', '')}"


def get_weather(lat: float, lon: float) -> dict:
    """Fetch current weather from Open-Meteo."""
    params = urllib.parse.urlencode({
        "latitude": lat, "longitude": lon,
        "current_weather": "true",
        "timezone": "auto",
        "forecast_days": 1,
    })
    url = f"https://api.open-meteo.com/v1/forecast?{params}"
    with urllib.request.urlopen(url, timeout=10) as resp:
        return json.loads(resp.read())


def display_weather(city_name: str, data: dict) -> None:
    cw        = data["current_weather"]
    temp_c    = cw["temperature"]
    temp_f    = temp_c * 9 / 5 + 32
    wind      = cw["windspeed"]
    code      = int(cw["weathercode"])
    condition = WMO_CODES.get(code, "Unknown")
    is_day    = cw.get("is_day", 1)
    icon      = "☀️" if is_day and code == 0 else "⛈️" if code >= 95 else "🌧️" if 60 <= code < 70 else "🌤️"

    print(f"""
  ╔══════════════════════════════════════╗
  {icon}  {city_name}
  ╠══════════════════════════════════════╣
    Condition   : {condition}
    Temperature : {temp_c}°C  /  {temp_f:.1f}°F
    Wind Speed  : {wind} km/h
  ╚══════════════════════════════════════╝""")


def main() -> None:
    print("=" * 45)
    print("        WEATHER CLI  (Open-Meteo)")
    print("=" * 45)
    while True:
        city = input("\nCity name (or 'quit'): ").strip()
        if city.lower() in ("quit", "q", ""):
            break
        try:
            lat, lon, name = geocode(city)
            weather = get_weather(lat, lon)
            display_weather(name, weather)
        except ValueError as e:
            print(f"  {e}")
        except Exception as e:
            print(f"  Network error: {e}")


if __name__ == "__main__":
    main()
