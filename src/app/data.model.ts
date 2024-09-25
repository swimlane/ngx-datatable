export interface Employee {
  name: string;
  gender: string;
  company: string;
  age?: number;
}

export interface FullEmployee {
  id: number;
  name: string;
  gender: string;
  age: number;
  address: {
    state: string;
    city: string;
  };
}

export interface GroupedEmployee {
  exppayyes?: number;
  exppayno?: number;
  exppaypending?: number;
  source?: string;
  name: string;
  gender: string;
  company: string;
  age: number;
  comment?: string;
  groupcomment?: string;
}
