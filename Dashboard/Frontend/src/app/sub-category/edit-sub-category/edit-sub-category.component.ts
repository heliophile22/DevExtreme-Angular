import { Component } from '@angular/core';
import { DxButtonModule, DxFormModule, DxToastModule } from 'devextreme-angular';
import { Category, CommonService, SubCategory } from '../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-sub-category',
  standalone: true,
  imports: [
    DxFormModule,
    DxButtonModule,
    DxToastModule,
  ],
  templateUrl: './edit-sub-category.component.html',
  styleUrl: './edit-sub-category.component.css'
})
export class EditSubCategoryComponent {

  newSubCategory: SubCategory = {};
  categories: Category[] = [];

  namePattern = /^[^0-9]+$/;

  toastVisible = false;
  toastMessage = '';
  success = true;

  constructor(
    private router: Router,
    private service: CommonService,
    private route: ActivatedRoute,
  ) {
    var subCategoryId = this.route.snapshot.params['id'];
    if (subCategoryId) {
      // this.newSubCategory = this.service.getSubCategoryById(subCategoryId) || this.newSubCategory;

      service.getSubCategoryById(subCategoryId).subscribe({
        next: (subCategory) => {
          this.newSubCategory = subCategory
        },
        error: (error) => {
          console.error("Failed to load catgeory", error)
        }
      });
    }

    // this.categories = service.getCategories();
    service.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  redirectToSubCategoryList() {
    this.router.navigate(['manage-sub-categories']);
  }

  /*
  saveSubCategory() {
    if (this.validateForm()) {
      this.service.updateSubCategory(this.newSubCategory);
      // this.redirectToSubCategoryList();

      this.toastMessage = 'Subcategory updated successfully';
      this.success = true;
      this.toastVisible = true;
      
      setTimeout(() => { this.redirectToSubCategoryList(); }, 1000)
    }
  }
  */

  saveSubCategory() {
    if (this.validateForm()) {
      debugger;
      this.service.updateSubCategory(this.newSubCategory).subscribe({
        next: () => {
          this.toastMessage = 'Subcategory updated successfully';
          this.success = true;
          this.toastVisible = true;
          setTimeout(() => { this.redirectToSubCategoryList(); }, 1000)
        },
        error: (error) => {
          console.error("Failed to update subcategory", error);
          this.toastMessage = 'Failed to update subcategory';
          this.success = false;
          this.toastVisible = true;
        }
      });
    }
  }

  validateForm(): boolean {
    const nameValid = this.newSubCategory.name && this.newSubCategory.name.length >= 3 && this.namePattern.test(this.newSubCategory.name);
    const descriptionValid = this.newSubCategory.description && this.newSubCategory.description.length >= 3 && this.newSubCategory.description.length <= 300;
    // const categoryValid = !!this.newSubCategory.CategoryId;

    if (!nameValid) {
      // alert('Name is required, must have at least 3 symbols and should not contain digits.');
      return false;
    }

    if (!descriptionValid) {
      // alert('Description is required and must have at least 3 symbols and at most 300 symbols.');
      return false;
    }

    /*if (!categoryValid) {
      alert('Please select a category.');
      return false;
    }*/

    return true;
  }
}