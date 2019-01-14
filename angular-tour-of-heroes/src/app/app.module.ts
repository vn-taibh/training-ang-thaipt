import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormatSexPipe } from './format.pipe';
import { FormatStatusPipe } from './format.pipe';
import { HandleHeroDirective } from './handle-hero.directive';
import { HeroComponent } from './hero/hero.component';
import { UpdateHeroComponent } from './update-hero/update-hero.component';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule	
	],
	declarations: [
		AppComponent,
		DashboardComponent,
		HeroesComponent,
		HeroDetailComponent,
		FormatSexPipe,
		FormatStatusPipe,
		HandleHeroDirective,
		HeroComponent,
		UpdateHeroComponent
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
