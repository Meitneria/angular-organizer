export class Task {
  title: string;
  description: string;
  date: number;
  isChecked: boolean;

  constructor(title: string, description: string, date: number) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.isChecked = false;
  }
}
