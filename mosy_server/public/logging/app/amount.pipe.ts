import {Pipe, PipeTransform} from "angular2/core"


@Pipe({name:"amountfilter"})
export class AmountPipe implements PipeTransform {
    transform(toFilter:string[] , filter:string[]) : string[] {

        let returnVal = [];
        if(filter[0]=="all" || filter[0]==undefined) {
            returnVal = toFilter;
        } else if(filter[0]=="latest") {
            returnVal.push(toFilter[toFilter.length-1])
        } else if(filter[0]=="10") {
            for(let i=0; i<10 && i<toFilter.length; i++) 
                returnVal.push(toFilter[i]);
        } else if(filter[0]=="20") {
            for(let i=0; i<20 && i<toFilter.length; i++) 
                returnVal.push(toFilter[i]);
        }
        return returnVal;
    }
}