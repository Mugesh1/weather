import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { WeatherEffect, WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  effect: WeatherEffect = 'day';
  weatherData: any = null;
  loading = true;
  error = '';

  private apiKey = 'd5d246c84743281345a36227dbf86e63';
  private lat: number | null = null;
  private lon: number | null = null;

  constructor(
    private weatherService: WeatherService,
    private http: HttpClient,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    // Get location and fetch weather
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.fetchWeather();
        },
        err => {
          this.error = 'Location access denied. Cannot fetch weather.';
          this.loading = false;
        }
      );
    } else {
      this.error = 'Geolocation not supported.';
      this.loading = false;
    }
  }

  fetchWeather() {
    if (this.lat == null || this.lon == null) {
      this.error = 'No location available.';
      this.loading = false;
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${this.apiKey}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;

        // Determine the weather effect using your service's logic
        this.determineEffect(data);

        // Apply CSS class to the component root (or document.body)
        this.applyEffectClass();
      },
      error: (err) => {
        this.error = 'Failed to load weather data.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  determineEffect(data: any) {
    
  }

  applyEffectClass() {
    // Remove all possible effect classes from body
    const effects: WeatherEffect[] = [
      'sunrise', 'day', 'sunset', 'night', 'rain', 'heavyrain', 'snow', 'cloud', 'mist', 'fog', 'haze', 'dust', 'scatteredCloud', 'brokenCloud', 'OvercastCloud'
    ];

    effects.forEach(c => this.renderer.removeClass(document.body, c));

    // Add current effect class
    this.renderer.addClass(document.body, this.effect);
  }
}
