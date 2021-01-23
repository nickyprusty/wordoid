import { Component, OnInit } from "@angular/core";
import { DataService } from '../../data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: "app-index",
  templateUrl: "index.component.html"
})
export class IndexComponent implements OnInit {

  allPosts = [];
  displayedPosts = [];
  isCollapsed = true;
  selectedPost;
  disaplyModal = false;
  modalRef;
  showToaster = false;
  currentPage = 1;
  maxSize = 5
  constructor(private dataService: DataService, private modalService: NgbModal,) {}
  
  scrollToDownload(element: any) {
    element.scrollIntoView({ behavior: "smooth" });
  }
  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("index-page");
    this.getPosts();
  }

  getPosts() {
    this.dataService.getPosts().subscribe((res) => {
      this.allPosts = res; 
      this.displayedPosts = this.allPosts.slice(0, 10);
      console.log(this.allPosts, this.displayedPosts);
    })
  }

  editPost() {

  }

  showPostDetails(postId, isEmpty?) {
    if (isEmpty) {
      const emptypost = {
        title: '',
        body: '',
        userId: null,
        id: null
      }
      this.modalRef = this.modalService.open(ModalComponent, { ariaLabelledBy: 'modal-basic', backdrop: 'static', keyboard: false, size: 'lg' });
        this.modalRef.componentInstance.data = emptypost;
        this.modalRef.componentInstance.createPost = true;
        this.modalRef.result.then(async (result) => {
          console.log(result)
        });
    } else {
      this.dataService.getPosts(postId).subscribe((res) => {
        this.selectedPost = res; 
        this.modalRef = this.modalService.open(ModalComponent, { ariaLabelledBy: 'modal-basic', backdrop: 'static', keyboard: false, size: 'lg' });
        this.modalRef.componentInstance.data = res;
        this.modalRef.result.then(async (result) => {
          console.log(result)
        });
      })
    }
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.displayedPosts = this.allPosts.slice(startItem, endItem);
  }
}
