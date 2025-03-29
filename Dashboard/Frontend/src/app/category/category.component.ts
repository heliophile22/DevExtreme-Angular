import { Component } from '@angular/core';
import { DxButtonModule, DxDataGridModule, DxPopupModule, DxToastModule } from 'devextreme-angular';
import { Router } from '@angular/router';
import { Category, CommonService } from '../services/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    DxDataGridModule,
    DxButtonModule,
    CommonModule,
    DxPopupModule,
    DxToastModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  dataSource: Category[] = [];

  popupVisible = false;
  selectedCategoryId: number | null = null;

  toastVisible = false;
  toastMessage = '';
  success = true;

  constructor(private service: CommonService, private router: Router) {
    // this.dataSource = service.getCategories();
    service.getCategories().subscribe(data => {
      this.dataSource = data;
    })

    this.handleEditButton = this.handleEditButton.bind(this);
    // this.handleDeleteButton = this.handleDeleteButton.bind(this);
    this.showDeleteDialog = this.showDeleteDialog.bind(this);
    this.handleViewButton = this.handleViewButton.bind(this);
  }

  handleAddButton() {
    this.router.navigate(['manage-categories/add']);
  }

  handleEditButton(event: any) {
    var Id = event.row.data.id;
    this.router.navigate(['manage-categories/edit', Id]);
  }

  handleViewButton(event: any) {
    var Id = event.row.data.id;
    this.router.navigate(['manage-categories/view', Id]);
  }

  /*handleDeleteButton(event: any) {
    var Id = event.row.data.ID;
    this.service.deleteCategory(Id);
    this.dataSource = this.service.getCategories();  // Refresh the list
  }*/

  showDeleteDialog(event: any) {
    this.selectedCategoryId = event.row.data.id;
    this.popupVisible = true;
  }

  /*
  confirmDelete() {
    if(this.selectedCategoryId != null) {
      this.service.deleteCategory(this.selectedCategoryId);
      this.dataSource = this.service.getCategories();  // Refresh the list
      this.popupVisible = false;
      this.selectedCategoryId = null;

      this.toastVisible = false;
      setTimeout(() => {
        this.toastMessage = 'Category deleted successfully';
        this.success = true;
        this.toastVisible = true;
      }, 0)
    }
  }
  */

  confirmDelete() {
    if (this.selectedCategoryId != null) {
      this.service.deleteCategory(this.selectedCategoryId).subscribe({
        next: () => {
          this.service.getCategories().subscribe(data => {
            this.dataSource = data;
          })
          this.popupVisible = false;
          this.selectedCategoryId = null;
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