import {Pipe, PipeTransform} from "angular2/core"


@Pipe({name:"linefilter"})
export class LinePipe implements PipeTransform {
    transform(toFilter:string[] , filter:string[]) : string[] {

        let returnVal = [];
        if(filter[0]==undefined && filter[1]==undefined) {
            returnVal = toFilter;
        }
        else {
            

            let startLine = (filter[0]==undefined||filter[0]=="")? 0:filter[0];
            let endLine = (filter[1]==undefined||filter[1]=="")? toFilter.length:Number(filter[1])+1;
            console.log(startLine)
            for(let i:number=Number(startLine); i<endLine && i<toFilter.length; i++) {
                returnVal.push(toFilter[i]);
            }
        }
        return returnVal;
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}