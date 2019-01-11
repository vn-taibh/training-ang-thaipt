import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-add-hero',
	templateUrl: './add-hero.component.html',
	styleUrls: ['./add-hero.component.css'],
	providers: [HeroService]
})
export class AddHeroComponent {

	sex: boolean = true;
	status: boolean = true;
	min: any = {'day': 1, 'month': 1, 'year': 1970};
	max: any = {'day': 31, 'month': 12, 'year': 3000};

	constructor(
		private heroService: HeroService,
		private location: Location
	) {}

	getHeroes(): Hero[] {
		let Heroes: Hero[];
		this.heroService.getHeroes().subscribe((heroes) => {
			Heroes = heroes;
		}, (err) => {
			console.log(err)
		});
		return Heroes;
	}

	genId(): number {
		let Heroes: Hero[] = this.getHeroes();
		return Heroes.length > 0 ? Math.max(...Heroes.map(hero => hero.id)) + 1 : 1;
	}

	add(name: string, day: number, month: number, year: number, description: string): void {
		name = name.trim();
		if (!name) { return; }
		if (day > 31 || day < 0) {
			alert('Incorrect day format');
		} else if (month > 12 || month < 0) {
			alert('Incorrect month format');
		} else if (year < 0) {
			alert('Incorrect year format');
		} else {
			let id: number = +this.genId;
			let birthday: number = this.getTimeBirthday(day, month, year);
			let hero: Hero = {
				'id': id ,
				'name': name, 
				"birthday": birthday, 
				'sex': this.sex, 
				'description': description, 
				'status': this.status
			};
			this.heroService.addHero(hero).subscribe(() => {
				console.log('Add Success hero id = ' + id);
				this.goBack();
			}, (err) => {
				console.log('Add fail: ' + err)
			});
		}
	}

	onChangesSex(value: boolean): void {
		this.sex = value;
	}

	onChangesStatus(value: boolean): void {
		this.status = value;
	}

	getTimeBirthday(day: number, month: number, year: number): number {
		let date = new Date();
		date.setDate(day);
		date.setMonth(month - 1);
		date.setFullYear(year);
		return date.getTime();
	}

	goBack(): void {
		this.location.back();
	}
}
