import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TodoItem } from "src/app/models";

@Component({
  selector: "app-todo-list",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="pt-8">
      <li
        *ngFor="let item of todos"
        class="p-4 border-b border-2 border-gray-50 mb-2"
      >
        <span [ngClass]="{ completed: item.completed }">{{
          item.description
        }}</span>
        <button *ngIf="item.completed === false" class="btn btn-square">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
    </ul>
  `,
  styles: [".completed: { text-decoration: line-through}"],
})
export class TodoListComponent {
  @Input() todos: TodoItem[] = [];
}
