import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Tree } from '@angular/router/src/utils/tree';

@Component({
	selector: 'app-update-hero',
	templateUrl: './update-hero.component.html',
	styleUrls: ['./update-hero.component.css'],
	providers: [HeroService]
})
export class UpdateHeroComponent implements OnInit {

	type: string;
	hero: Hero;
	subscription: Subscription;
	id: number;
	name:string;
	sex: boolean;
	status: boolean;
	description: string;
	day: number = 1;
	month: number = 1;
	year: number = 1970;
	min: any = {'day': 1, 'month': 1, 'year': 1970};
	max: any = {'day': 31, 'month': 12, 'year': 3000};

	constructor(
		private route: ActivatedRoute,
		private heroService: HeroService,
		private location: Location,
		private router : Router
	) {
		this.type = this.route.snapshot.paramMap.get('type');
	}

	ngOnInit() {
		if(this.type === 'edit') {
			this.getHero();
		}
		else {
			this.type = 'add';
		}
	}

	getHero(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.subscription = this.heroService.getHero(id).subscribe((hero: Hero) => {
			this.hero = hero;
			this.id = this.hero.id;
			this.name = this.hero.name;
			this.sex = this.hero.sex;
			this.status = this.hero.status;
			this.description = this.hero.description;
			this.getDMY(this.hero.birthday);
		}, (err) => {
			console.log(err)
		});
	}

	getDMY(birthday: number): void {
		let date = new Date(birthday);
		this.month = date.getMonth() + 1;
		this.day = date.getDate();
		this.year = date.getFullYear();
	}

	save(): void {
		if (this.day > 31 || this.day < 0) {
			alert('Incorrect birthday format');
		} else if (this.month > 12 || this.month < 0) {
			alert('Incorrect birthday format');
		} else {
			this.hero.sex = this.sex;
			this.hero.status = this.status;
			this.hero.name = this.name;
			this.hero.description = this.description;
			this.hero.birthday = this.getTimeBirthday();
			this.heroService.updateHero(this.hero).subscribe(() => {
				console.log('Update Success hero id = ' + this.hero.id);
				this.goBack()
			}, (err) => {
				console.log('Update fail: ' + err)
			});
		}
	}

	add(): void {
		this.name = this.name.trim();
		if (!this.name) { return; }
		if (this.day > 31 || this.day < 0) {
			alert('Incorrect day format');
		} else if (this.month > 12 || this.month < 0) {
			alert('Incorrect month format');
		} else if (this.year < 0) {
			alert('Incorrect year format');
		} else {
			let id: number;
			let birthday: number = this.getTimeBirthday();
			let hero: Hero = {
				'id': id ,
				'name': this.name, 
				"birthday": birthday, 
				'sex': this.sex, 
				'description': this.description, 
				'status': this.status
			};
			this.heroService.addHero(hero).subscribe(() => {
				console.log('Add Success hero');
				this.router.navigateByUrl('/heroes');
			}, (err) => {
				console.log('Add fail: ' + err)
			});
		}
	}

	goBack(): void {
		this.location.back();
	}

	getTimeBirthday(): any {
		let date = new Date();
		date.setDate(this.day);
		date.setMonth(this.month - 1);
		date.setFullYear(this.year);
		return date.getTime();
	}

	onChangesSex(value: boolean): void {
		this.sex = value;
	}

	onChangesStatus(value: boolean): void {
		this.status = value;
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
