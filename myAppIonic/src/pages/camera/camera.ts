import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

/**
 * Generated class for the CameraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
  providers: [
    Camera
  ]
})
export class CameraPage {

  public image: string = "";
  public base64_img: string = 'data:image/jpeg;base64,';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera) {
  }

  public ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  public takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      this.image = this.base64_img + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

}
