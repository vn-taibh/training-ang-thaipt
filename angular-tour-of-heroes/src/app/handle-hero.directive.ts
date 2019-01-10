import { Directive, HostListener, Input } from '@angular/core';

@Directive({
	selector: '[appHandleHero]'
})
export class HandleHeroDirective {

	constructor() { }

	@Input('appHandleHero') id: number;

	@HostListener('click') onclick() {
		window.location.href = `/detail/${this.id}`;
	}
}
