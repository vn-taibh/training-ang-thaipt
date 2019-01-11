import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService }  from '../hero.service';

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
	min: any = {'day' : 1,'month':1 ,'year': 1975};
	max: any = {'day' : 31,'month':12 ,'year': 3000};

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
			this.heroService.updateHero(this.hero)
					.subscribe(() => {
								this.goBack()
							}, (err) => {
								console.log('Update fail: ' + err)
							});
		}
	}

	onChangesSex(dk: boolean): void {
		this.sex = dk;
	}

	onChangesStatus(dk: boolean): void {
		this.status = dk;
	}

	getDMY(date: number): void {
		let a = new Date(date);
		this.month = a.getMonth() + 1;
		this.day = a.getDate();
		this.year = a.getFullYear();
	}

	getTimeBirthday(): any {
		let d = new Date();
		d.setDate(this.day);
		d.setMonth(this.month - 1);
		d.setFullYear(this.year);
		return d.getTime();
	}
}
