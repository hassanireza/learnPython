# Day 28 🌐 - Working with APIs

<div align="center">

| [← Day 27: Previous Lesson](../day-27/README.md) | [🏠 Home](../../README.md) | [Day 29: Next Lesson →](../day-29/README.md) |
|:---|:---:|---:|

</div>

---

## Overview

Connect your Python programs to the internet by calling REST APIs. This skill unlocks weather apps, AI integrations, data feeds, and much more.

**What you will learn today:**

- What a REST API is and how HTTP works
- Making GET requests with `urllib.request`
- Parsing JSON responses from APIs
- Handling HTTP errors and timeouts
- Query parameters with `urllib.parse`
- API keys and environment variables

---

## Key Concepts

| Concept | Description |
|---|---|
| `REST API` | A web service that responds to HTTP requests with structured data, usually JSON. |
| `requests.get()` | Send an HTTP GET request. Returns a Response with `.status_code`, `.json()`, `.text`. |
| `status_code` | 200=OK, 404=Not Found, 429=Rate Limited, 500=Server Error. |
| `raise_for_status()` | Raises `HTTPError` on 4xx/5xx responses. Call it after every request. |

---

## Code Examples

### Making your first API call

```python
import urllib.request
import json

# Using the built-in urllib (no install required)
url = "https://api.chucknorris.io/jokes/random"
with urllib.request.urlopen(url) as response:
    data = json.loads(response.read().decode("utf-8"))
print(data["value"])

# Using requests (pip install requests)
# import requests
# resp = requests.get(url, timeout=10)
# resp.raise_for_status()
# print(resp.json()["value"])
```

### Error handling

```python
import urllib.request
import urllib.error
import json


def fetch_json(url: str) -> dict | list:
    """Fetch JSON from a URL with proper error handling."""
    try:
        with urllib.request.urlopen(url, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        raise RuntimeError(f"HTTP {e.code}: {e.reason}") from e
    except urllib.error.URLError as e:
        raise RuntimeError(f"Network error: {e.reason}") from e


data = fetch_json("https://api.chucknorris.io/jokes/random")
print(data.get("value", "No joke found"))
```

---

## Today's Project: Weather CLI App

> Fetch live weather for any city using the Open-Meteo API (completely free, no API key required).

**View the full project:** [project/solution.py](./project/solution.py)

```python
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
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---

<div align="center">

| [← Day 27: Previous Lesson](../day-27/README.md) | [🏠 Home](../../README.md) | [Day 29: Next Lesson →](../day-29/README.md) |
|:---|:---:|---:|

</div>
