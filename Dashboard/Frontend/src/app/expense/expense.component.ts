import { Component } from '@angular/core';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxToastModule } from 'devextreme-angular';
import { Category, CommonService, Expense, SubCategory } from '../services/common.service';
import { Router } from '@angular/router';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxToastModule,
  ],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.css'
})
export class ExpenseComponent {
  dataSource: Expense[] = [];
  categories: Category[] = new Array<Category>();
  subCategories: SubCategory[] = [];

  popupVisible = false;
  selectedExpenseId: number | null = null;

  toastVisible = false;
  toastMessage = '';
  success = true;

  constructor(private service: CommonService, private router: Router) {
    // this.dataSource = service.getExpenses();
    service.getExpenses().subscribe(data => {
      this.dataSource = data;
    })

    // this.categories = service.getCategories();
    service.getCategories().subscribe(data => {
      this.categories = data;
    });

    // this.subCategories = service.getSubCategories();
    service.getSubCategories().subscribe(data => {
      this.subCategories = data;
    })

    this.handleEditButton = this.handleEditButton.bind(this);
    // this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.showDeleteDialog = this.showDeleteDialog.bind(this);
    this.handleViewButton = this.handleViewButton.bind(this);

    this.getFilteredSubCategories = this.getFilteredSubCategories.bind(this);
  }

  getFilteredSubCategories(options: { data: SubCategory }) {
    return {
      store: this.subCategories,
      filter: options.data ? ['CategoryId', '=', options.data.categoryId] : null,
    };
  }

  setCategoryValue(this: DxDataGridTypes.Column, newData: Expense, value: number, currentRowData: Expense) {
    if (this.defaultSetCellValue) {
      newData.subCategoryId = value;
      this.defaultSetCellValue(newData, value, currentRowData);
    }
  }

  handleAddButton() {
    this.router.navigate(['manage-expenses/add']);
  }

  handleEditButton(event: any) {
    var Id = event.row.data.id;
    this.router.navigate(['manage-expenses/edit', Id]);
  }

  handleViewButton(event: any) {
    var Id = event.row.data.id;
    this.router.navigate(['manage-expenses/view', Id]);
  }

  /*handleDeleteButton(event: any) {
    var Id = event.row.data.ID;
    this.service.deleteExpense(Id);
    this.dataSource = this.service.getExpenses();
  }*/

  showDeleteDialog(event: any) {
    this.selectedExpenseId = event.row.data.id;
    this.popupVisible = true;
  }

  /*
  confirmDelete() {
    if(this.selectedExpenseId != null) {
      this.service.deleteExpense(this.selectedExpenseId);
      this.dataSource = this.service.getExpenses();  // Refresh the list
      this.popupVisible = false;
      this.selectedExpenseId = null;

      this.toastVisible = false;
      setTimeout(() => {
        this.toastMessage = 'Expense deleted successfully';
        this.success = true;
        this.toastVisible = true;
      }, 0)
    }
  }
  */

  confirmDelete() {
    if (this.selectedExpenseId != null) {
      this.service.deleteExpense(this.selectedExpenseId).subscribe({
        next: () => {
          this.service.getExpenses().subscribe(data => {
            this.dataSource = data;
          })
          this.popupVisible = false;
          this.selectedExpenseId = null;
          this.showToast('Expense deleted successfully', true);
        },
        error: () => {
          this.showToast('Failed to delete the expense. Please try again.', false);
        }
      });
    }
  }

  showToast(message: string, success: boolean) {
    this.toastMessage = message;
    this.success = success;
    this.toastVisible = true;
    setTimeout(() => this.toastVisible = false, 1000);
  }

  cancelDelete() {
    this.popupVisible = false;
  }
}