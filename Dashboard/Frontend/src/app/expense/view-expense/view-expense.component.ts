import { Component } from '@angular/core';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';
import { Category, CommonService, Expense, SubCategory } from '../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-expense',
  standalone: true,
  imports: [
    DxButtonModule,
    DxFormModule,
  ],
  templateUrl: './view-expense.component.html',
  styleUrl: './view-expense.component.css'
})
export class ViewExpenseComponent {

  newExpense: Expense = {};
  categories: Category[] = [];
  subCategories: SubCategory[] = [];

  constructor(
    private router: Router, 
    private service: CommonService,
    private route: ActivatedRoute,
  ) {
    // this.categories = service.getCategories();
    service.getCategories().subscribe(data => {
      this.categories = data;
    })
    // this.subCategories = service.getSubCategories();
    service.getSubCategories().subscribe(data => {
      this.subCategories = data;
    })

    var expenseId = this.route.snapshot.params['id'];
    if (expenseId) {
      // this.newExpense = this.service.getExpenseById(expenseId) || this.newExpense;

      this.service.getExpenseById(expenseId).subscribe({
        next: (expense) => this.newExpense = expense,
        error: (error) => console.error("Failed to load expense", error)
      });
    }
  }

  redirectToExpenseList() {
    this.router.navigate(['manage-expenses']);
  }
}