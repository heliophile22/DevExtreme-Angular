import { Component } from '@angular/core';
import { Category, CommonService, Expense, SubCategory } from '../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DxButtonModule, DxFormModule, DxToastModule } from 'devextreme-angular';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [
    DxFormModule,
    DxButtonModule,
    DxToastModule,
  ],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {
  newExpense: Expense = {};
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  namePattern = /^[^0-9]+$/;
  amountPattern = /^\d+(\.\d{1,2})?$/;

  toastVisible = false;
  toastMessage = '';
  success = true;

  constructor(
    private router: Router,
    private service: CommonService,
    private route: ActivatedRoute,
  ) {
    // this.categories = this.service.getCategories();
    service.getCategories().subscribe(data => {
      this.categories = data;
    })
    // this.subCategories = this.service.getSubCategories();
    this.service.getSubCategories().subscribe(data => {
      this.subCategories = data;
    });

    var expenseId = this.route.snapshot.params['id'];
    if (expenseId) {
      // this.newExpense = this.service.getExpenseById(expenseId) || this.newExpense;
      service.getExpenseById(expenseId).subscribe({
        next: (expense) => {
          this.newExpense = expense
        },
        error: (error) => {
          console.error("Failed to load expense", error)
        }
      });
    }
  }

  formFieldDataChanged(e: any) {
    if (e.dataField === 'categoryId') {
      const categoryId = e.value;
      // this.subCategories = this.service.getSubCategoriesByCategoryId(categoryId);
      this.service.getSubCategoriesByCategoryId(categoryId).subscribe(data => {
        this.subCategories = data;
      });
    }
  }

  redirectToExpenseList() {
    this.router.navigate(['manage-expenses']);
  }

  /*
  saveExpense() {
    if (this.validateForm()) {
      this.service.updateExpense(this.newExpense);
      // this.redirectToExpenseList();

      this.toastMessage = 'Expense updated successfully';
      this.success = true;
      this.toastVisible = true;

      setTimeout(() => { this.redirectToExpenseList(); }, 1000)
    }
  }
  */

  saveExpense() {
    if (this.validateForm()) {
      this.service.updateExpense(this.newExpense).subscribe({
        next: () => {
          this.toastMessage = 'Expense updated successfully';
          this.success = true;
          this.toastVisible = true;
          setTimeout(() => { this.redirectToExpenseList(); }, 1000);
        },
        error: (error) => {
          console.error("Failed to update expense", error);
          this.toastMessage = 'Failed to update expense';
          this.success = false;
          this.toastVisible = true;
        }
      });
    }
  }

  validateForm(): boolean {
    const nameValid = this.newExpense.name && this.newExpense.name.length >= 3 && this.namePattern.test(this.newExpense.name);
    const amountValid = this.newExpense.amount && this.amountPattern.test(this.newExpense.amount.toString());
    const dateValid = !!this.newExpense.date && !isNaN(Date.parse(this.newExpense.date));
    // const categoryValid = !!this.newExpense.CategoryId;
    // const subCategoryValid = !!this.newExpense.SubCategoryId;

    if (!nameValid) {
      // alert('Name is required, must have at least 3 symbols and should not contain digits.');
      return false;
    }

    if (!amountValid) {
      // alert('Amount is required and must be a valid number.');
      return false;
    }

    if (!dateValid) {
      // alert('Date is required and must be in the format MM/DD/YYYY.');
      return false;
    }

    /*if (!categoryValid) {
      alert('Please select a category.');
      return false;
    }

    if (!subCategoryValid) {
      alert('Please select a subcategory.');
      return false;
    }*/

    return true;
  }
}