import { TrackedRow } from './tracked-row.type';

export interface ViewRow {
  $$viewIndex: number;
  row?: TrackedRow;
}