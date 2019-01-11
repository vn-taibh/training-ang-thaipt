import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-edit-hero',
	templateUrl: './edit-hero.component.html',
	styleUrls: ['./edit-hero.component.css'],
	providers: [HeroService]
})
export class EditHeroComponent implements OnInit {
	hero: Hero;
	sex: boolean;
	status: boolean;
	day: number;
	month: number;
	year: number;
	min: any = {'day': 1, 'month': 1, 'year': 1970};
	max: any = {'day': 31, 'month': 12, 'year': 3000};

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location
	) {}
	
	ngOnInit(): void {
		this.getHero();	
	}

	getHero(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.heroService.getHero(id).subscribe((hero: Hero) => {
			this.hero = hero;
			this.sex = this.hero.sex;
			this.status = this.hero.status;
			this.getDMY(this.hero.birthday);
		}, (err) => {
			console.log(err)
		});
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.hero.sex = this.sex;
		this.hero.status = this.status;
		if (this.day > 31 || this.day < 0) {
			alert('Incorrect birthday format');
		} else if (this.month > 12 || this.month < 0) {
			alert('Incorrect birthday format');
		} else {
			this.hero.birthday = this.getTimeBirthday();
			this.heroService.updateHero(this.hero).subscribe(() => {
				console.log('Update Success hero id = ' + this.hero.id);
				this.goBack()
			}, (err) => {
				console.log('Update fail: ' + err)
			});
		}
	}

	onChangesSex(value: boolean): void {
		this.sex = value;
	}

	onChangesStatus(value: boolean): void {
		this.status = value;
	}

	getDMY(birthday: number): void {
		let date = new Date(birthday);
		this.month = date.getMonth() + 1;
		this.day = date.getDate();
		this.year = date.getFullYear();
	}

	getTimeBirthday(): any {
		let date = new Date();
		date.setDate(this.day);
		date.setMonth(this.month - 1);
		date.setFullYear(this.year);
		return date.getTime();
	}
}
