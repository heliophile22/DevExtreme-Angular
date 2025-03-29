import { Component } from '@angular/core';
import { DxButtonModule, DxFormModule, DxToastModule } from 'devextreme-angular';
import { Category, CommonService, Expense, SubCategory } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [
    DxFormModule,
    DxButtonModule,
    DxToastModule,
  ],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {

  newExpense: Expense = {};
  categories: Category[] = [];
  subCategories?: SubCategory[];

  namePattern = /^[^0-9]+$/;
  amountPattern = /^\d+(\.\d{1,2})?$/;

  toastVisible = false;
  toastMessage = '';
  success = true;

  constructor(private router: Router, private service: CommonService) {
    // this.categories = service.getCategories();
    service.getCategories().subscribe(data => {
      this.categories = data;
    })
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
      this.service.addExpense(this.newExpense);
      // this.redirectToExpenseList();

      this.toastMessage = 'Expense added successfully';
      this.success = true;
      this.toastVisible = true;

      setTimeout(() => { this.redirectToExpenseList(); }, 1000)
    }
  }
  */

  saveExpense() {
    if (this.validateForm()) {
      debugger;
      this.service.addExpense(this.newExpense).subscribe({
        next: () => {
          this.toastMessage = 'Expense added successfully';
          this.success = true;
          this.toastVisible = true;
          setTimeout(() => { this.redirectToExpenseList(); }, 1000)
        },
        error: (error) => {
          console.error('There was an error adding the expense', error);
          this.toastMessage = 'Failed to add the expense. Please try again.';
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
    const categoryValid = !!this.newExpense.categoryId;
    const subCategoryValid = !!this.newExpense.subCategoryId;

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

    if (!categoryValid) {
      // alert('Please select a category.');
      return false;
    }

    if (!subCategoryValid) {
      // alert('Please select a subcategory.');
      return false;
    }

    return true;
  }
}