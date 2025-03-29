import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxToastModule } from 'devextreme-angular';
import { Category, CommonService, SubCategory } from '../services/common.service';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxToastModule,
  ],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.css'
})
export class SubCategoryComponent {
  dataSource: SubCategory[] = [];
  categories: Category[] = [];

  popupVisible = false;
  selectedSubCategoryId: number | null = null;

  toastVisible = false;
  toastMessage = '';
  success = true;

  constructor(private service: CommonService, private router: Router) {
    // this.dataSource = service.getSubCategories();
    service.getSubCategories().subscribe(data => {
      this.dataSource = data;
    })

    // this.categories = service.getCategories();
    service.getCategories().subscribe(data => {
      this.categories = data;
    })

    this.handleEditButton = this.handleEditButton.bind(this);
    // this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.showDeleteDialog = this.showDeleteDialog.bind(this);
    this.handleViewButton = this.handleViewButton.bind(this);
  }

  handleAddButton() {
    this.router.navigate(['manage-sub-categories/add'])
  }

  handleEditButton(event: any) {
    var Id = event.row.data.id;
    this.router.navigate(['manage-sub-categories/edit', Id]);
  }

  handleViewButton(event: any) {
    var Id = event.row.data.id;
    this.router.navigate(['manage-sub-categories/view', Id]);
  }

  /*handleDeleteButton(event: any) {
    var Id = event.row.data.ID;
    this.service.deleteSubCategory(Id);
    this.dataSource = this.service.getSubCategories();
  }*/

  showDeleteDialog(event: any) {
    this.selectedSubCategoryId = event.row.data.id;
    this.popupVisible = true;
  }

  /*
  confirmDelete() {
    if(this.selectedSubCategoryId != null) {
      this.service.deleteSubCategory(this.selectedSubCategoryId);
      this.dataSource = this.service.getSubCategories();  // Refresh the list
      this.popupVisible = false;
      this.selectedSubCategoryId = null;

      this.toastVisible = false;
      setTimeout(() => {
        this.toastMessage = 'Subcategory deleted successfully';
        this.success = true;
        this.toastVisible = true;
      }, 0)
    }
  }
  */

  confirmDelete() {
    if (this.selectedSubCategoryId != null) {
      this.service.deleteSubCategory(this.selectedSubCategoryId).subscribe({
        next: () => {
          this.service.getCategories().subscribe(data => {
            this.dataSource = data;
          })
          this.popupVisible = false;
          this.selectedSubCategoryId = null;
          this.showToast('Category deleted successfully', true);
        },
        error: () => {
          this.showToast('Failed to delete the category. Please try again.', false);
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