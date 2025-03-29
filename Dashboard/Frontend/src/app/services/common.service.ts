import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Category {
  id?: number;
  name?: string;
  description?: string;
}

export class SubCategory {
  id?: number;
  name?: string;
  description?: string;
  categoryId?: number;
}

export class Expense {
  id?: number;
  name?: string;
  amount?: number;
  date?: string;
  categoryId?: number;
  subCategoryId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  /*
  private categories: Category[] = [
    { id: 1, name: 'Sample1', description: 'Category Description1' },
    { id: 2, name: 'Sample2', description: 'Category Description2' },
    { id: 3, name: 'Sample3', description: 'Category Description3' },
    { id: 4, name: 'Sample4', description: 'Category Description4' },
    { id: 5, name: 'Sample5', description: 'Category Description5' },
  ]

  private subCategories: SubCategory[] = [
    { id: 1, name: 'Sample1', description: 'Subcategory Description1', categoryId: 1 },
    { id: 2, name: 'Sample2', description: 'Subcategory Description2', categoryId: 2 },
    { id: 3, name: 'Sample3', description: 'Subcategory Description3', categoryId: 3 },
    { id: 4, name: 'Sample4', description: 'Subcategory Description4', categoryId: 4 },
    { id: 5, name: 'Sample5', description: 'Subcategory Description5', categoryId: 5 },
  ]

  private expenses: Expense[] = [
    { id: 1, name: 'Expense1', amount: 100, date: '3/15/2024', categoryId: 1, subCategoryId: 5 },
    { id: 2, name: 'Expense2', amount: 200, date: '3/16/2024', categoryId: 1, subCategoryId: 3 },
    { id: 3, name: 'Expense3', amount: 300, date: '3/17/2024', categoryId: 2, subCategoryId: 1 },
    { id: 4, name: 'Expense4', amount: 400, date: '3/18/2024', categoryId: 2, subCategoryId: 4 },
    { id: 5, name: 'Expense5', amount: 500, date: '3/19/2024', categoryId: 3, subCategoryId: 2 },
  ]
  */

  baseUrl = 'https://localhost:44345';

  constructor(private http: HttpClient) { }

  getSubCategoriesByCategoryId(categoryId: number): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.baseUrl}/api/SubCategory/ByCategory/${categoryId}`);
  }

  //#region Manage Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + `/api/Category`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.baseUrl + `/api/Category`, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(this.baseUrl + `/api/Category/${id}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(this.baseUrl + `/api/Category/${category.id}`, category)
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(this.baseUrl + `/api/Category/${id}`);
  }
  //#endregion

  //#region Manage SubCategories
  getSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl + '/api/SubCategory');
  }

  addSubCategory(subCategory: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(this.baseUrl + `/api/SubCategory`, subCategory);
  }

  getSubCategoryById(id: number): Observable<SubCategory> {
    return this.http.get<SubCategory>(this.baseUrl + `/api/SubCategory/${id}`);
  }

  updateSubCategory(subCategory: SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(this.baseUrl + `/api/SubCategory/${subCategory.id}`, subCategory)
  }

  deleteSubCategory(id: number): Observable<SubCategory> {
    return this.http.delete<SubCategory>(this.baseUrl + `/api/SubCategory/${id}`);
  }
  //#endregion

  //#region Manage Expenses
  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.baseUrl + '/api/Expense');
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl + `/api/Expense`, expense);
  }

  getExpenseById(id: number): Observable<Expense> {
    return this.http.get<Expense>(this.baseUrl + `/api/Expense/${id}`);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.baseUrl + `/api/Expense/${expense.id}`, expense)
  }

  deleteExpense(id: number): Observable<Expense> {
    return this.http.delete<Expense>(this.baseUrl + `/api/Expense/${id}`);
  }
  //#endregion
}




/*
addCategory(category: Category) {
  if (!category.ID) {
    const maxId = this.categories.reduce((acc, cur) => cur.ID && cur.ID > acc ? cur.ID : acc, 0);
    category.ID = maxId + 1;
  }
  this.categories.push(category);
}

getSubCategoriesByCategoryId(categoryId: number): SubCategory[] {
  return this.subCategories.filter(sc => sc.categoryId === categoryId);
}

//#region Manage Categories
getCategories(): Category[] {
  return this.categories;
}

addCategory(category: Category) {
  var newId = this.categories.length + 1;
  category.ID = newId;
  this.categories.push(category);
}

getCategoryById(Id: number): Category | undefined {
  return this.categories.find(category => category.ID === Id);
}

updateCategory(category: Category) {
  const index = this.categories.findIndex(c => c.ID === category.ID);
  if (index > -1) {
    this.categories[index] = category;
  }
}

deleteCategory(Id: number) {
  this.categories = this.categories.filter(category => category.ID !== Id);
}
//#endregion

//#region Manage SubCategories
getSubCategories(): SubCategory[] {
  return this.subCategories;
}

addSubCategory(subCategory: SubCategory) {
  var newId = this.subCategories.length + 1;
  subCategory.ID = newId;
  this.subCategories.push(subCategory);
}

getSubCategoryById(Id: number): SubCategory | undefined {
  return this.subCategories.find(subCategory => subCategory.ID === Id);
}

updateSubCategory(subCategory: SubCategory) {
  const index = this.subCategories.findIndex(c => c.ID === subCategory.ID);
  if (index > -1) {
    this.subCategories[index] = subCategory;
  }
}

deleteSubCategory(Id: number) {
  this.subCategories = this.subCategories.filter(subCategory => subCategory.ID !== Id);
}
//#endregion

//#region Manage Expenses
getExpenses(): Expense[] {
  return this.expenses;
}

addExpense(expense: Expense) {
  var newId = this.expenses.length + 1;
  expense.ID = newId;
  this.expenses.push(expense);
}

getExpenseById(Id: number): Expense | undefined {
  return this.expenses.find(expense => expense.ID === Id);
}

updateExpense(expense: Expense) {
  const index = this.expenses.findIndex(c => c.ID === expense.ID);
  if (index > -1) {
    this.expenses[index] = expense;
  }
}

deleteExpense(Id: number) {
  this.expenses = this.expenses.filter(expense => expense.ID !== Id);
}
//#endregion
*/