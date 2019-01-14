import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
	selector: 'app-update-hero',
	templateUrl: './update-hero.component.html',
	styleUrls: ['./update-hero.component.css'],
	providers: [HeroService]
})
export class UpdateHeroComponent implements OnInit, OnDestroy {

	type: string;
	hero: Hero;
	subscription: Subscription;
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
	) {}

	ngOnInit() {
		this.type = this.route.snapshot.paramMap.get('type');
		if(this.type === 'edit') {
			this.getHero();
		}
		else {
			this.type = 'add';
			this.hero = new Hero();
			this.hero.name = '';
			this.hero.description = '';
			this.hero.sex = false;
			this.hero.status = false;
		}
	}

	getHero(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.subscription = this.heroService.getHero(id).subscribe((hero: Hero) => {
			this.hero = hero;
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
		this.hero.name = this.hero.name.trim();
		if (this.hero.name === '') { return; }
		if (this.day > 31 || this.day < 0) {
			alert('Incorrect day format');
		} else if (this.month > 12 || this.month < 0) {
			alert('Incorrect month format');
		} else if (this.year < 0) {
			alert('Incorrect year format');
		} else {
			this.hero.birthday = this.getTimeBirthday();
			if(this.type === 'edit') {
				this.heroService.updateHero(this.hero).subscribe(() => {
					console.log('Update Success hero id = ' + this.hero.id);
					this.goBack()
				}, (err) => {
					console.log('Update fail: ' + err)
				});
			}
			else {
				this.heroService.addHero(this.hero).subscribe(() => {
					console.log('Add Success hero');
					this.router.navigateByUrl('/heroes');
				}, (err) => {
					console.log('Add fail: ' + err)
				});
			}
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
		this.hero.sex = value;
	}

	onChangesStatus(value: boolean): void {
		this.hero.status = value;
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
