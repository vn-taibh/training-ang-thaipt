import { Component, Input } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-hero',
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.css'],
	providers: [HeroService]
})
export class HeroComponent {

	@Input() heroes: Hero[] ;

	constructor(private heroService: HeroService) { }

	delete(hero: Hero): void {
		this.heroes = this.heroes.filter(h => h !== hero);
		this.heroService.deleteHero(hero.id)
				.subscribe(() => {
					}, (err) => {
						console.log('Delete fail: ' + err)
					});
	}
}
