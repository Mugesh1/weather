import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerAddComponent } from './customer/customer-add/customer-add.component';
import { CustomerViewComponent } from './customer/customer-view/customer-view.component';
import { CustomerReducer, customerFeatureKey } from './customer/store/reducer/customer.reducer';
import { WorkspaceComponent } from './customer/workspace.component';
import { HighlightDirective } from './directives/highlightJS';
import { BankAnalogyComponent } from './example/bank-analogy/bank-analogy.component';
import { ExampleComponent } from './example/example.component';
import { RestuarantAnalogyComponent } from './example/restuarant-analogy/restuarant-analogy.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { metaReducers, reducers } from './reducers';
import { CloudCanvasComponent } from './weathers/cloud-canvas/cloud-canvas.component';
import { HeavyRainComponent } from './weathers/heavy-rain/heavy-rain.component';
import { RainComponent } from './weathers/rain/rain.component';
import { SnowfallComponent } from './weathers/snowfall/snowfall.component';
import { SunriseComponent } from './weathers/sunrise/sunrise.component';
import { SunsetComponent } from './weathers/sunset/sunset.component';
import { JSComponent } from './js/js.component';
import { WeatherComponent } from './weathers/weather.component';
import { WindEffectComponent } from './weathers/wind-effect/wind-effect.component';

@NgModule({
  declarations: [AppComponent, HighlightDirective, CustomerViewComponent, CustomerAddComponent, BankAnalogyComponent, RestuarantAnalogyComponent, SnowfallComponent, RainComponent, SunriseComponent, SunsetComponent, CloudCanvasComponent, HeavyRainComponent, ExampleComponent, GuidelineComponent,
    WorkspaceComponent,
    JSComponent,
    WeatherComponent,
    WindEffectComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreModule.forFeature(customerFeatureKey, CustomerReducer),
    ...(environment.production ? [] : [StoreDevtoolsModule.instrument()])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
