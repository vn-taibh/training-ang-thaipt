import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-hero',
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.css'],
	providers: [HeroService]
})
export class HeroComponent {

	@Input() oneHero: Hero[] ;
	@Output() ondeletehero = new EventEmitter<Hero>();

	constructor(private heroService: HeroService) { }

	delete(hero: Hero): void {
		this.ondeletehero.emit(hero);
	}
}
