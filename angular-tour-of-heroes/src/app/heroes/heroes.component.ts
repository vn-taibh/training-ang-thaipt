import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css'],
	providers: [HeroService]
})
export class HeroesComponent implements OnInit {
	heroes: Hero[] ;

	constructor(private heroService: HeroService) { }

	ngOnInit() {
		this.getHeroes();
	}

	getHeroes(): void {
		this.heroService.getHeroes().subscribe((heroes) => {
			this.heroes = heroes;
		}, (err) => {
			console.log(err)
		});
	}

	delete(hero: Hero): void {
		this.heroes = this.heroes.filter(h => h !== hero);
		this.heroService.deleteHero(hero.id).subscribe(() => {
			console.log('Delete success hero id =: ' + hero.id)
		}
		, (err) => {
			console.log('Delete fail: ' + err)
		});
	}
}
