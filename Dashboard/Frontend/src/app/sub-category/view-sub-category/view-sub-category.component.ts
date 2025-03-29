import { Component } from '@angular/core';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';
import { Category, CommonService, SubCategory } from '../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-sub-category',
  standalone: true,
  imports: [
    DxButtonModule,
    DxFormModule,
  ],
  templateUrl: './view-sub-category.component.html',
  styleUrl: './view-sub-category.component.css'
})
export class ViewSubCategoryComponent {

  newSubCategory: SubCategory = {};
  categories: Category[] = [];

  constructor(
    private router: Router, 
    private service: CommonService,
    private route: ActivatedRoute,
  ) {
    var subCategoryId = this.route.snapshot.params['id'];
    if (subCategoryId) {
      // this.newSubCategory = this.service.getSubCategoryById(subCategoryId) || this.newSubCategory;
      this.service.getSubCategoryById(subCategoryId).subscribe({
        next: (subCategory) => this.newSubCategory = subCategory,
        error: (error) => console.error("Failed to load subcategories", error)
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
}