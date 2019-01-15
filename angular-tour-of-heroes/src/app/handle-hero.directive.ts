import { Directive, HostListener, Input } from '@angular/core';

import { Router } from '@angular/router';

@Directive({
	selector: '[appHandleHero]'
})
export class HandleHeroDirective {

	@Input() id: number;

	constructor(private route: Router) {}

	@HostListener('click') onclick() {
		console.log(this.id);
		this.route.navigateByUrl(`/heroes/${this.id}`);
	}
}
