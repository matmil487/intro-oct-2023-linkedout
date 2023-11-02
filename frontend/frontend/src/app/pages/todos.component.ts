import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoEntryComponent } from "./components/todo-entry.component";
import { TodoListComponent } from "./components/todo-list.component";
import { TodoItem } from "../models";

@Component({
  selector: "app-todos",
  standalone: true,
  template: `
    <section>
      <app-todo-entry (itemAdded)="addItem($event)" />
    </section>
    <section>
      <app-todo-list [todos]="list" />
    </section>
  `,
  styles: [],
  imports: [CommonModule, TodoEntryComponent, TodoListComponent],
})
export class TodosComponent {
  list: TodoItem[] = [
    { id: "1", description: "Wash Car", completed: false },
    { id: "2", description: "Rake Leaves", completed: true },
    { id: "3", description: "Make TAcos", completed: false },
  ];

  addItem(description: string) {
    const newItem: TodoItem = {
      id: crypto.randomUUID(),
      description,
      completed: false,
    };
    this.list = [newItem, ...this.list];
  }
}
