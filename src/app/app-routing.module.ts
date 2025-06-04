import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './customer/workspace.component';
import { ExampleComponent } from './example/example.component';
import { GrillZoneComponent } from './grill-zone/grill-zone.component';
import { GuidelineComponent } from './guideline/guideline.component';
import { JSComponent } from './js/js.component';
import { WeatherComponent } from './weathers/weather.component';

const routes: Routes = [
  { path: '', redirectTo: '/guideline', pathMatch: 'full' }, // optional default route
  { path: 'analogy', component: ExampleComponent },
  { path: 'example', component: WorkspaceComponent },
  { path: 'guideline', component: GuidelineComponent },
  { path: 'guideJS', component: JSComponent},
  { path: 'weather', component: WeatherComponent},
  { path: 'queAns', component: GrillZoneComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
