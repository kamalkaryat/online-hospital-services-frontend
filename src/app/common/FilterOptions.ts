import { Injectable } from "@angular/core";

@Injectable()
export class FilterOptions{

    public _filter(options: string[],value: string): string[] {
        const filterValue = value.toLowerCase();
        return options.filter(
            option => option.toLowerCase().includes(filterValue));
      }
}