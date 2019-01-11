import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Hero } from './hero';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {
 
	private heroesUrl = 'http://5c321fcafe034a001404dcb8.mockapi.io/api/v1/Heroes'; // URL to web api
 
	constructor( private http: HttpClient ) { }
 
	/** GET heroes from the server */
	getHeroes (): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl)
			.pipe(
				tap(_ => console.log('fetched heroes'))
			);
	}
 
	/** GET hero by id. Return `undefined` when id not found */
	getHeroNo404<Data>(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/?id=${id}`;
		return this.http.get<Hero[]>(url)
			.pipe(
				map(heroes => heroes[0]), // returns a {0|1} element array
				tap(h => {
					const outcome = h ? `fetched` : `did not find`;
					console.log(`${outcome} hero id=${id}`);
				})
			);
	}
 
	/** GET hero by id. Will 404 if id not found */
	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url).pipe(
			tap(_ => console.log(`fetched hero id=${id}`))
		);
	}
 
	/* GET heroes whose name contains search term */
	searchHeroes(term: string): Observable<Hero[]> {
		if (!term.trim()) {
			// if not search term, return empty hero array.
			return of([]);
		}
		return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
			tap(_ => console.log(`found heroes matching "${term}"`))
		);
	}
 
	//////// Save methods //////////
 
	/** POST: add a new hero to the server */
	addHero (hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
			tap((hero: Hero) => console.log(`added hero w/ id=${hero.id}`))
		);
	}
 
	/** DELETE: delete the hero from the server */
	deleteHero (id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
 
		return this.http.delete<Hero>(url, httpOptions).pipe(
			tap(_ => console.log(`deleted hero id=${id}`))
		);
	}
 
	/** PUT: update the hero on the server */
	updateHero (hero: Hero): Observable<any> {
		const url = `${this.heroesUrl}/${hero.id}`;
		return this.http.put(url, hero, httpOptions).pipe(
			tap(_ => console.log(`updated hero id=${hero.id}`))
		);
	}
}
