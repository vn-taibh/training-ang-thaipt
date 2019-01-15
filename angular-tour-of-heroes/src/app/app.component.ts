import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Tour of Heroes';

	constructor(
		private router : Router
	) {}

	getLink(link: string): void {
		this.router.navigateByUrl(link);
	}
}
