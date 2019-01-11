import { Directive, HostListener, Input } from '@angular/core';

import { Router } from '@angular/router';

@Directive({
	selector: '[appHandleHero]'
})
export class HandleHeroDirective {

	constructor(private route: Router) { }

	@Input('appHandleHero') id: number;

	@HostListener('click') onclick() {
		this.route.navigateByUrl(`/detail/${this.id}`);
	}
}
