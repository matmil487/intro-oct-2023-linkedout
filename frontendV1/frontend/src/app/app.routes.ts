import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home.component";
import { TodosComponent } from "./pages/todos.component";
import { CounterComponent } from "./pages/counter.component";
export const routes: Routes = [
  {

    path: "home",
    component: HomeComponent,
  },

  {
    path: "todos",
    component: TodosComponent,
  },

  {
    path: "counter",
    component: CounterComponent,
  },

  {
    path: "**",
    redirectTo: "home",
  },

];
