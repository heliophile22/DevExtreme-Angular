import { Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ExpenseComponent } from './expense/expense.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { AddSubCategoryComponent } from './sub-category/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './sub-category/edit-sub-category/edit-sub-category.component';
import { ViewSubCategoryComponent } from './sub-category/view-sub-category/view-sub-category.component';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { EditExpenseComponent } from './expense/edit-expense/edit-expense.component';
import { ViewExpenseComponent } from './expense/view-expense/view-expense.component';

export const routes: Routes = [
    {path: 'manage-categories', component: CategoryComponent},
    {path: 'manage-categories/add', component: AddCategoryComponent},
    {path: 'manage-categories/edit/:id', component: EditCategoryComponent},
    {path: 'manage-categories/view/:id', component: ViewCategoryComponent},

    {path: 'manage-sub-categories', component: SubCategoryComponent},
    {path: 'manage-sub-categories/add', component: AddSubCategoryComponent},
    {path: 'manage-sub-categories/edit/:id', component: EditSubCategoryComponent},
    {path: 'manage-sub-categories/view/:id', component: ViewSubCategoryComponent},

    {path: 'manage-expenses', component: ExpenseComponent},
    {path: 'manage-expenses/add', component: AddExpenseComponent},
    {path: 'manage-expenses/edit/:id', component: EditExpenseComponent},
    {path: 'manage-expenses/view/:id', component: ViewExpenseComponent},
];