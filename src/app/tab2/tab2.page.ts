import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Partner } from '../models/partner.model';
import { PartnerService } from '../services/partner.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  partner = new Partner();
  partners: Partner[] = [];
  isLoading = false;

  partnerForm:FormGroup;
  
  constructor(private formbuilder:FormBuilder,private partnerService: PartnerService) 
  {
    
  }

  get f() {
    return this.partnerForm.controls;
  } 

  ngOnInit() {
    this.partnerForm = this.formbuilder.group({
      maxdistance:['',[Validators.required,Validators.pattern("^(0*[1-9][0-9]*(.[0-9]+)?|0+.[0-9]*[1-9][0-9]*)$")]]
    });
  }

  getPartnersBydistance(maxdistance:number,lat:number,lon:number): void {
    this.isLoading = true;
    this.partnerService.getPartnersByDistance(lat,lon,maxdistance).subscribe(
      data => this.partners = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  onSubmit()
  {
    if (this.partnerForm.value.maxdistance)
      this.getPartnersBydistance(this.partnerForm.value.maxdistance,51.5144636,-0.142571);
  }

  reset()
  {
    this.isLoading = false;
    this.partnerForm.reset();
    this.partners=[];
  }

}
