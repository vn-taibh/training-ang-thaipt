import {
	Component,
	OnInit,
	OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
 
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit, OnDestroy {
	heroes: Hero[] = [];
	subscription: Subscription;
 
	constructor(
		private heroService: HeroService,
		private router: Router
	) { }
 
	ngOnInit() {
		this.getHeroes();
	}
 
	getHeroes(): void {
		this.subscription = this.heroService.getHeroes().subscribe(
			heroes => this.heroes = heroes.slice(1, 5)
		);
	}

	getHeroDetail(id: string): void {
		this.router.navigateByUrl(`/detail/${id}`);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
