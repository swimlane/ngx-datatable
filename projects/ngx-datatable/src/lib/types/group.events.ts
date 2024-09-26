import { Group } from "./group.type";

export interface GroupToggleEvent<TRow> {
  type: 'group';
  value: Group<TRow>;
}

export interface AllGroupsToggleEvent {
  type: 'all';
  value: boolean;
}

export type GroupToggleEvents<TRow> = GroupToggleEvent<TRow> | AllGroupsToggleEvent;
