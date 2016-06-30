import {Pipe, PipeTransform} from "angular2/core"


@Pipe({name:"namefilter"})
export class NameFilterPipe implements PipeTransform {
    transform(toFilter:string[] , filter:string[]) : string[] {
        if(filter[0]==undefined) return toFilter;
        return toFilter.filter(item => item.indexOf(filter[0])!=-1);
    }
}