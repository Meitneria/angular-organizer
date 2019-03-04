export interface Task {
  date: Date;
  time?: string;
  dateFromNow?: string;
  info: string;
  isChecked: boolean;
  title: string;
}
