import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { IndexComponent } from "./index/index.component";
import { ModalComponent } from './modal/modal.component';
import { CollapseModule } from "ngx-bootstrap/collapse";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    PaginationModule.forRoot()
  ],
  declarations: [
    IndexComponent,
    ModalComponent
  ],
  exports: [
    IndexComponent
  ],
  providers: []
})
export class PagesModule {}
