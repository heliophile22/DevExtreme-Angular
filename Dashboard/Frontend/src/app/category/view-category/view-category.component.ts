import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CommonService } from '../../services/common.service';
import { DxButtonModule, DxFormModule } from 'devextreme-angular';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [
    DxButtonModule,
    DxFormModule,
  ],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.css'
})
export class ViewCategoryComponent {

  newCategory: Category = {};

  constructor(
    private router: Router,
    private service: CommonService,
    private route: ActivatedRoute,
  ) {
    var categoryId = this.route.snapshot.params['id'];
    if (categoryId) {
      // this.newCategory = this.service.getCategoryById(categoryId) || this.newCategory;

      this.service.getCategoryById(categoryId).subscribe({
        next: (category) => this.newCategory = category,
        error: (error) => console.error("Failed to load category", error)
      });
    }
  }

  redirectToCategoryList() {
    this.router.navigate(['manage-categories']);
  }
}