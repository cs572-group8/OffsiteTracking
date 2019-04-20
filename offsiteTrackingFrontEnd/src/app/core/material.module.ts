import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatSelectModule,MatOptionModule, MatNativeDateModule
} from '@angular/material';
@NgModule({
  imports: [
  CommonModule,
  MatToolbarModule,
  MatButtonModule, 
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,MatOptionModule,
  MatDatepickerModule,
  MatNativeDateModule
  ],
  exports: [
  CommonModule,
   MatToolbarModule, 
   MatButtonModule, 
   MatCardModule, 
   MatInputModule, 
   MatDialogModule, 
   MatTableModule, 
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatSelectModule,MatOptionModule,
   MatDatepickerModule,
   MatNativeDateModule
   ],
})
export class CustomMaterialModule { }