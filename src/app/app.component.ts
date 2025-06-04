import { Component, OnDestroy, Renderer2 } from '@angular/core';
import hljs from 'highlight.js';
import { WeatherEffect, WeatherService } from './weathers/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'ngrx';
  weatherEffect: WeatherEffect = 'scatteredCloud';
  private intervalId: any;

  constructor(private weatherService: WeatherService, private renderer: Renderer2) {}

  ngAfterViewInit() {
    hljs.highlightAll();
    setTimeout(() => {
      this.fetchWeatherEffect(); // Initial call
      this.intervalId = setInterval(() => {
        this.fetchWeatherEffect();
      }, 20000);
    }, 2000);
  }

  fetchWeatherEffect() {
    this.weatherService.getCurrentEffect().subscribe({
      next: (effect) => {
        this.weatherEffect = effect;

        const allClasses: WeatherEffect[] = [
          'sunrise', 'day', 'sunset', 'night', 'rain', 'snow', 'cloud', 'heavyrain', 'mist', 'fog', 'haze', 'dust'
        ];
        allClasses.forEach(cls => this.renderer.removeClass(document.body, cls));
        this.renderer.addClass(document.body, effect);
      },
      error: (err) => {
        console.error('Error fetching weather:', err);
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
