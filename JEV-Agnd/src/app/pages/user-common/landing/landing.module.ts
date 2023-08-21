import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LandingPageRoutingModule } from './landing-routing.module';

import { LandingPage } from './landing.page';

import { RouterModule } from '@angular/router';

import { CarouselModule } from '../../../components/carousel/carousel.module';
import { SlideModule } from '../../../components/slide/slide.module';
import { FooterModule } from '../../../components/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LandingPageRoutingModule,
    CarouselModule,
    SlideModule,
    FooterModule,
    RouterModule
  ],
  declarations: [LandingPage]
})
export class LandingPageModule {}