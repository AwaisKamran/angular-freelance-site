import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('fileDiv', { static: true}) fileDiv: ElementRef<HTMLElement>;
  
  public stars = [];
  public userDataUpdated: boolean = false;
  public userDataUpdatedError: boolean = false;
  public passwordChangedSuccess: boolean = false;
  public passwordChangedError: boolean = false;
  public imageProfile: any = "assets/images/profile-pic.png";
  public file: File;
  public data: any = {
    aboutMe: JSON.parse(localStorage.getItem('user')).aboutMe,
    bankName: JSON.parse(localStorage.getItem('user')).bankName,
    bankAccountNumber: JSON.parse(localStorage.getItem('user')).bankAccountNumber,
    id: JSON.parse(localStorage.getItem('user')).id
  };

  public userData: any = {
    password: undefined,
    confirmPassword: undefined
  }

  constructor(
    public userService: UserService,
    public imageService: ImageService,
    public router: Router
  ) { 
    this.imageProfile =  this.userService.getLoggedInUserImage();
    this.imageProfile = `url(${this.imageProfile})`;
    this.imageProfile += ',url("assets/images/profile-pic.png")';
  }

  ngOnInit() {
    this.stars = new Array(5);
  }

  openFileExplorer(){
    let el: HTMLElement = this.fileDiv.nativeElement;
    el.click();
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageProfile = reader.result;
    reader.readAsDataURL(this.file);
  }

  saveServiceImage(serviceId){
    const formData = new FormData();
    formData.append('fileToUpload', this.file);
    formData.append('id', JSON.parse(localStorage.getItem("user")).id);
    formData.append('folder', 'user');

    this.imageService.saveImage(formData)
    .subscribe((res: any) => {
      if(res.success){}  
      else{
        console.log("Error uploading image.");
      }
    }, (err: any) => {
      console.log("Error uploading image.");
    });
  }

  updateUserInformation(){
    this.userService.updateUserInfo(this.data)
      .subscribe((res: any) => {
        if(res.success){
          this.userDataUpdated = true;
          this.userDataUpdatedError = false;
          if(this.file) this.saveServiceImage(res.data);

          let user = {...this.userService.user};
          user.aboutMe = this.data.aboutMe;
          user.bankName = this.data.bankName;
          user.bankAccountNumber = this.data.bankAccountNumber;
          this.userService.storeUserInfo(user);
          window.location.reload();
        }  
        else{
          this.userDataUpdated = false;
          this.userDataUpdatedError = true;
        }
      }, (err: any) => {
        this.userDataUpdated = false;
        this.userDataUpdatedError = true;
      });
  }

  navigateToDashboard(){
    this.router.navigate(["/dashboard"]);
  }

  updateUserPassword(){
    if(this.userData.password === this.userData.confirmPassword){

    }
    else{
      this.passwordChangedError = true;
    }
  }
}
