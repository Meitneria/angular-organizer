export interface Task {
  date: string;
  time?: string;
  dateFromNow?: string;
  info: string;
  isChecked: boolean;
  title: string;
  id: string;
  projectId: string;
}
