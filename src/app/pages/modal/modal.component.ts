import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() data;
  @Input() createPost;
  editData;
  successMessage = null;
  constructor(public activeModal: NgbActiveModal, private dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.data)
    if(this.createPost) {
      this.editData = this.data;
    }
  }

  editDetails() {
    this.successMessage = null;
    this.editData = Object.assign(this.data);
  }

  saveDetails() {
    this.successMessage = null;
    if (this.createPost) {
      this.dataService.createPost(this.editData).subscribe((res) => {
        this.createPost = false;
        this.data = this.editData;
        this.editData = null;
        this.successMessage = 'Post Created successfully';
      })
    } else {
      this.dataService.updatePost(this.editData).subscribe((res) => {
        this.data = this.editData;
        this.editData = null;
        this.successMessage = 'Data updated successfully';
      })
    }
  }

  cancelEdit() {
    if (!this.createPost) {
      this.successMessage = null;
      this.editData = null;
    } else {
      this.activeModal.close('cancel');
    }
    
  }

}
