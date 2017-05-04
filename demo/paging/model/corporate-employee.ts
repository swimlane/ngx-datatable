/**
 * A model for an individual corporate employee
 */
export class CorporateEmployee {
    name: string;
    gender: string;
    company: string;
    age: number;

    constructor(name: string, gender: string, company: string, age: number){
        this.name = name;
        this.gender = gender;
        this.company = company;
        this.age = age;
    }
}