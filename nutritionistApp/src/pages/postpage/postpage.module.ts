import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Postpage } from './postpage';

@NgModule({
  declarations: [
    Postpage,
  ],
  imports: [
    IonicPageModule.forChild(Postpage),
  ],
})
export class PostPageModule {}
