import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, FullEmployee, GroupedEmployee, TreeEmployee } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private client = inject(HttpClient);

  load(data: 'forRowGrouping.json'): Observable<GroupedEmployee[]>;
  load(data: 'company_tree.json'): Observable<TreeEmployee[]>;
  load(data: 'company.json'): Observable<Employee[]>;
  load(data: '100k.json'): Observable<FullEmployee[]>;
  load(data: string): Observable<unknown[]> {
    return this.client.get<unknown[]>(`assets/data/${data}`);
  }
}
