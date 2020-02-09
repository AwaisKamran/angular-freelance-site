import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service';
import { ConstantsService } from '../services/constants.service';
import { QualificationService } from '../services/qualification.service';
import { ExperienceService } from '../services/experience.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  @ViewChild('fileDiv', { static: true }) fileDiv: ElementRef<HTMLElement>;

  public stars = [];
  public qualifications = [];
  public userDataUpdated: boolean = false;
  public userDataUpdatedError: boolean = false;
  public passwordChangedSuccess: boolean = false;
  public passwordChangedError: boolean = false;
  public qualificationAddedSuccess: boolean = false;
  public qualificationAddedError: boolean = false;
  public experienceAddedSuccess: boolean = false;
  public experienceAddedError: boolean = false;
  public addWorkPermit: boolean = false;
  public addLicense: boolean = false;
  public userUpdateFailedLicense: boolean = false;
  public userUpdateFailedWorkPermit: boolean = false;
  public showLicenseSection: boolean = parseInt(JSON.parse(localStorage.getItem('user')).hasLicense) === 0? false: true;
  public showPermitSection: boolean = parseInt(JSON.parse(localStorage.getItem('user')).hasWorkPermit) === 0? false: true;
  public downloadLinkPermit: string;
  public downloadLinkLicense: string;
  public imageProfile: any = "assets/images/profile-pic.png";
  public file: File;
  public userDocumentFile: File;
  public data: any = {
    email: JSON.parse(localStorage.getItem('user')).email,
    city: JSON.parse(localStorage.getItem('user')).city,
    aboutMe: JSON.parse(localStorage.getItem('user')).aboutMe,
    bankName: JSON.parse(localStorage.getItem('user')).bankName,
    bankAccountNumber: JSON.parse(localStorage.getItem('user')).bankAccountNumber,
    bankCode: JSON.parse(localStorage.getItem('user')).bankCode,
    id: JSON.parse(localStorage.getItem('user')).id
  };

  public qualification: any = {
    title: undefined,
    institute: undefined,
    score: undefined,
    userId: JSON.parse(localStorage.getItem('user')).id
  };

  public experience: any = {
    title: undefined,
    companyName: undefined,
    startYear: undefined,
    endYear: undefined,
    userId: JSON.parse(localStorage.getItem('user')).id
  };

  public userData: any = {
    password: undefined,
    confirmPassword: undefined,
    userId: JSON.parse(localStorage.getItem('user')).id
  }

  constructor(
    public userService: UserService,
    public imageService: ImageService,
    public experienceService: ExperienceService,
    public qualificationService: QualificationService,
    public constantsService: ConstantsService,
    public router: Router
  ) {
    this.imageProfile = this.userService.getLoggedInUserImage();
    this.imageProfile = `url(${this.imageProfile})`;
    this.imageProfile += ',url("assets/images/profile-pic.png")';

    if(this.showLicenseSection){
      this.downloadLinkLicense = `${this.constantsService.url}uploads/license/${JSON.parse(localStorage.getItem("user")).id}.jpg`;
    }

    if(this.showPermitSection){
      this.downloadLinkPermit = `${this.constantsService.url}uploads/permit/${JSON.parse(localStorage.getItem("user")).id}.jpg`;
    }
  }

  ngOnInit() {
    this.stars = new Array(5);
  }

  submitQualification() {
    this.qualificationService.addQualification(this.qualification)
      .subscribe((res: any) => {
        if (res.success) {
          this.qualificationAddedSuccess = true;
          this.qualificationAddedError = false;
        }
        else {
          this.qualificationAddedSuccess = false;
          this.qualificationAddedError = true;
          console.log("Error uploading qualification.");
        }
      }, (err: any) => {
        this.qualificationAddedSuccess = false;
        this.qualificationAddedError = true;
        console.log("Error uploading qualification.");
      });
  }

  submitExperience() {
    this.experienceService.addExperience(this.experience)
      .subscribe((res: any) => {
        if (res.success) {
          this.experienceAddedSuccess = true;
          this.experienceAddedError = false;
        }
        else {
          this.experienceAddedSuccess = false;
          this.experienceAddedError = true;
          console.log("Error uploading experience.");
        }
      }, (err: any) => {
        this.experienceAddedSuccess = false;
        this.experienceAddedError = true;
        console.log("Error uploading experience.");
      });
  }

  openFileExplorer() {
    let el: HTMLElement = this.fileDiv.nativeElement;
    el.click();
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageProfile = reader.result;
    reader.readAsDataURL(this.file);
  }

  onFileEventChanged(event) {
    this.userDocumentFile = event.target.files[0];
  }

  isAdmin() {
    return this.userService.isUserAdmin();
  }

  saveServiceImage(serviceId) {
    const formData = new FormData();
    formData.append('fileToUpload', this.file);
    formData.append('id', JSON.parse(localStorage.getItem("user")).id);
    formData.append('folder', 'user');

    this.imageService.saveImage(formData)
      .subscribe((res: any) => {
        if (res.success) { }
        else {
          console.log("Error uploading image.");
        }
      }, (err: any) => {
        console.log("Error uploading image.");
      });
  }

  saveUserDocumentImage(folder) {
    const formData = new FormData();
    formData.append('fileToUpload', this.userDocumentFile);
    formData.append('id', JSON.parse(localStorage.getItem("user")).id);
    formData.append('folder', folder);

    this.imageService.saveImage(formData)
      .subscribe((res: any) => {
        if (res.success) { 
          this.userDocumentFile = null;
          let user = JSON.parse(localStorage.getItem("user"))
          if(folder === 'license'){
            this.downloadLinkLicense = `${this.constantsService.url}uploads/license/${JSON.parse(localStorage.getItem("user")).id}.jpg`;
            this.showLicenseSection = true;       
            user.hasLicense = "1";
          }
          else{
            this.downloadLinkPermit = `${this.constantsService.url}uploads/permit/${JSON.parse(localStorage.getItem("user")).id}.jpg`;
            this.showPermitSection = true;
            user.hasWorkPermit = "1";
          }
          this.userService.storeUserInfo(user);
        }
        else {
          this.userDocumentFile = null;
          console.log("Error uploading image.");
        }
      }, (err: any) => {
        this.userDocumentFile = null;
        console.log("Error uploading image.");
      });
  }

  updateUserInformation() {
    this.userService.updateUserInfo(this.data)
      .subscribe((res: any) => {
        if (res.success) {
          this.userDataUpdated = true;
          this.userDataUpdatedError = false;
          if (this.file) this.saveServiceImage(res.data);

          let user = { ...this.userService.user };
          user.aboutMe = this.data.aboutMe;
          user.email = this.data.email;
          user.city = this.data.city;
          user.bankName = this.data.bankName;
          user.bankCode = this.data.bankCode;
          user.bankAccountNumber = this.data.bankAccountNumber;
          this.userService.storeUserInfo(user);
          window.location.reload();
        }
        else {
          this.userDataUpdated = false;
          this.userDataUpdatedError = true;
        }
      }, (err: any) => {
        this.userDataUpdated = false;
        this.userDataUpdatedError = true;
      });
  }

  navigateToDashboard() {
    this.router.navigate(["/dashboard"]);
  }

  submitLicense() {
    if (!this.addLicense) {
      this.userUpdateFailedLicense = true;
      return;
    }

    this.userService.updateUserLicense({ "userId": this.data.id })
      .subscribe((res: any) => {
        if (res.success) {
          this.addLicense = false;
          this.userUpdateFailedLicense = false;
          this.saveUserDocumentImage('license');
        }
        else {
          this.userUpdateFailedLicense = true;
        }
      }, (err: any) => {
        this.userUpdateFailedLicense = true;
      });
  }

  submitWorkPermit() {
    if (!this.addWorkPermit) {
      this.userUpdateFailedWorkPermit = true;
      return;
    }

    this.userService.updateWorkPermit({ "userId": this.data.id })
      .subscribe((res: any) => {
        if (res.success) {
          this.addWorkPermit = false;
          this.userUpdateFailedWorkPermit = false;
          this.saveUserDocumentImage('permit');
        }
        else {
          this.userUpdateFailedWorkPermit = true;
        }
      }, (err: any) => {
        this.userUpdateFailedWorkPermit = true;
      });
  }

  updateUserPassword() {
    if (this.userData.password === this.userData.confirmPassword) {
      this.userService.updateUserPassword(this.userData)
        .subscribe((res: any) => {
          if (res.success) {
            this.passwordChangedError = false;
            this.passwordChangedSuccess = true;
          }
          else {
            this.passwordChangedError = true;
            this.passwordChangedSuccess = false;
          }
        }, (err: any) => {
          this.passwordChangedError = true;
          this.passwordChangedSuccess = false;
        });
    }
    else {
      this.passwordChangedError = true;
      this.passwordChangedSuccess = false;
    }
  }
}
