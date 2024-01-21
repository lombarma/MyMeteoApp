import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {JenAiAucuneIdee, LongAndLatAndCity, SpecsOnCity, WeatherFilters, WeatherService} from "./weather.service";
import {startWith, Subject, switchMap, takeUntil, tap} from "rxjs";
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

// TODO : Pipe Celsius/Farenheit
// TODO : revoir le FormGroup
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  city!: string;
  weather!: SpecsOnCity;
  longAndLatAndCity!: LongAndLatAndCity;

  weatherFiltersForm = new FormGroup({});

  private weatherService = inject(WeatherService);

  onDestroy$ = new Subject<void>();

  isLoaded: boolean = false;

  ngOnInit(): void {
    this.buildFiltersForm();
    this.watchForWeatherFilters();
  }

  buildFiltersForm(): void {
    Object.keys(JenAiAucuneIdee).forEach((filter): any => {
      this.weatherFiltersForm.addControl(filter, new FormControl<boolean>(false));
    });
  }

  watchForWeatherFilters(): void {
     this.weatherFiltersForm.valueChanges
          .pipe(
          startWith({}),
          switchMap((filters) =>  this.weatherService.getLongAndLat("Paris")
            .pipe(
              tap(longAndLatAndCity => this.longAndLatAndCity = longAndLatAndCity),
              switchMap(longAndLatAndCity => this.weatherService.getWeather(longAndLatAndCity, filters))
            )
          ),
          takeUntil(this.onDestroy$)
        ).subscribe(weather => {
          this.city = this.longAndLatAndCity.city;
          this.weather = weather;
          this.isLoaded = true;
        })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
