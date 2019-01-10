import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatsexpipe'})
export class FormatSexPipe implements PipeTransform {
	transform(value: number): string {
		let sex: string = 'Male';
		if(!value){
			sex = 'Fmale';
		}
		return sex;
	}
}

@Pipe({name: 'formatstatus'})
export class FormatStatusPipe implements PipeTransform {
	transform(value: number): string {
		let status: string = 'Yes';
		if(!value){
			status = 'No';
		}
		return status;
	}
}
