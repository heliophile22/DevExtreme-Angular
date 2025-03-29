import { Component } from '@angular/core';
import { DxButtonModule, DxFormModule, DxToastModule } from 'devextreme-angular';
import { Category, CommonService } from '../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [
    DxFormModule,
    DxButtonModule,
    DxToastModule,
  ],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {

  newCategory: Category = {};

  namePattern = /^[^0-9]+$/;

  toastVisible = false;
  toastMessage = '';
  success = true;

  constructor(
    private router: Router,
    private service: CommonService,
    private route: ActivatedRoute,
  ) {
    var categoryId = this.route.snapshot.params['id'];
    if (categoryId) {
      // this.newCategory = this.service.getCategoryById(categoryId) || this.newCategory;

      service.getCategoryById(categoryId).subscribe({
        next: (category) => {
          this.newCategory = category
        },
        error: (error) => {
          console.error("Failed to load catgeory", error)
        }
      });
    }
  }

  redirectToCategoryList() {
    this.router.navigate(['manage-categories']);
  }

  /*
  saveCategory() {
    if (this.validateForm()) {
      this.service.updateCategory(this.newCategory);

      this.toastMessage = 'Category updated successfully';
      this.success = true;
      this.toastVisible = true; 

      setTimeout(() => { this.redirectToCategoryList(); }, 1000)
    }
  }
  */

  saveCategory() {
    if (this.validateForm()) {
      this.service.updateCategory(this.newCategory).subscribe({
        next: () => {
          this.toastMessage = 'Category updated successfully';
          this.success = true;
          this.toastVisible = true;
          setTimeout(() => this.redirectToCategoryList(), 1000);
        },
        error: (error) => {
          console.error("Failed to update category", error);
          this.toastMessage = 'Failed to update category';
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