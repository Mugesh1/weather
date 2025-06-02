import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export type WeatherEffect =
  | 'sunrise'
  | 'day'
  | 'sunset'
  | 'night'
  | 'rain'
  | 'heavyrain'
  | 'snow'
  | 'cloud'
  | 'mist'
  | 'fog'
  | 'haze'
  | 'dust'
  | 'scatteredCloud'
  | 'brokenCloud'
  | 'OvercastCloud'; // ✅ Capital O

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = 'd5d246c84743281345a36227dbf86e63';
  private lat = '';
  private lon = '';

  constructor(private http: HttpClient) {
    navigator.geolocation.getCurrentPosition(pos => {
      this.lat = pos.coords.latitude.toString();
      this.lon = pos.coords.longitude.toString();
    });
  }

  getCurrentEffect(): Observable<WeatherEffect> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`;
    return this.http.get<any>(url).pipe(
      map((data): WeatherEffect => {
        const weatherMain = data.weather[0].main.toLowerCase();
        const weatherDesc = data.weather[0].description.toLowerCase();
        const now = Math.floor(Date.now() / 1000);
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        const oneHour = 60 * 60;

        let timeEffect: WeatherEffect;
        if (now >= sunrise && now < sunrise + oneHour) {
          timeEffect = 'sunrise';
        } else if (now > sunset - oneHour && now <= sunset) {
          timeEffect = 'sunset';
        } else if (now >= sunrise && now <= sunset) {
          timeEffect = 'day';
        } else {
          timeEffect = 'night';
        }

        // High-priority weather
        if (weatherMain === 'snow') return 'snow';
        if (weatherMain === 'rain' && weatherDesc.includes('heavy')) return 'heavyrain';
        if (weatherMain === 'rain') return 'rain';
        if (['mist', 'fog', 'haze', 'dust'].includes(weatherMain)) {
          return weatherMain as WeatherEffect;
        }

        // Clouds
        if (weatherMain === 'clouds') {
          if (weatherDesc.includes('overcast')) return 'scatteredCloud';
          if (weatherDesc.includes('scattered')) return 'OvercastCloud';
          if (weatherDesc.includes('broken')) return 'brokenCloud';
          return 'cloud';
        }

        return timeEffect;
      }),
      catchError((err): Observable<WeatherEffect> => {
        console.error('Weather API error:', err);
        return of('day' as WeatherEffect); // ✅ Cast explicitly
      })
    );
  }
}
