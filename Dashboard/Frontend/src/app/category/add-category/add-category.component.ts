import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonModule, DxFormModule, DxToastModule } from 'devextreme-angular';
import { Category, CommonService } from '../../services/common.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    DxFormModule,
    DxButtonModule,
    DxToastModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  newCategory: Category = {};

  namePattern = /^[^0-9]+$/;

  toastVisible = false;
  toastMessage = '';
  success = true;

  constructor(private router: Router, private service: CommonService) { }

  redirectToCategoryList() {
    this.router.navigate(['manage-categories']);
  }

  /*
  saveCategory() {
    if (this.validateForm()) {
      this.service.addCategory(this.newCategory);
      
      this.toastMessage = 'Category added successfully';
      this.success = true;
      this.toastVisible = true;

      setTimeout(() => { this.redirectToCategoryList(); }, 1000)
    }
  }
  */

  saveCategory() {
    if (this.validateForm()) {
      this.service.addCategory(this.newCategory).subscribe({
        next: (response) => {
          this.toastMessage = 'Category added successfully';
          this.success = true;
          this.toastVisible = true;
          setTimeout(() => { this.redirectToCategoryList(); }, 1000);
        },
        error: (error) => {
          console.error('There was an error adding the category', error);
          this.toastMessage = 'Failed to add the category. Please try again.';
          this.success = false;
          this.toastVisible = true;
        }
      });
    }
  }

  validateForm(): boolean {
    const nameValid = this.newCategory.name && this.newCategory.name.length >= 3 && this.namePattern.test(this.newCategory.name);
    const descriptionValid = this.newCategory.description && this.newCategory.description.length >= 3 && this.newCategory.description.length <= 300;

    if (!nameValid) {
      // alert('Name is required, must have at least 3 symbols and should not contain digits.');
      return false;
    }

    if (!descriptionValid) {
      // alert('Description is required and must have at least 3 symbols and at most 300 symbols.');
      return false;
    }

    return true;
  }
}