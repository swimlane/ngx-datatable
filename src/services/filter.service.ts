import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {
    lastKeyword: string;
    filteredList: any[] = [];
    constructor() { }

    /**
     * @params
     * keyword is the keyword to search for
     * props is list of property to be filtered (searched)
     * originalList is the original keyword to filter from 
     * 
     */
    filter(keyword: string, props: Array<string>, originalList: Array<any>) {


        //if user not select any prop , keyword and originalList return original list
        if (!keyword && !props && !originalList) {
            this.filteredList = originalList;
            return this.filteredList;
        }

        keyword = keyword.toLowerCase();

        // if we ask another time for the same keyword, return the last result
        if (keyword == this.lastKeyword) {
            return this.filteredList;
        }

        // store the query, in case it changes
        this.lastKeyword = keyword;


        let filtered = originalList.filter(item => {
            let match = false;
            for (let prop of props) {
                if (item[prop].toString().toLowerCase().indexOf(keyword) > -1) {
                    match = true;
                    break;
                }
            };
            return match;
        });
        this.filteredList = filtered;


        return this.filteredList;
    }
}