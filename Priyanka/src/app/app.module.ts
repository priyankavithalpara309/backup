import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { TimerComponent } from './timer/timer.component';
import { InformationComponent } from './information/information.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { GrowYourCapitalComponent } from './grow-your-capital/grow-your-capital.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { SliderComponent } from './slider/slider.component';
import { TeamComponent } from './team/team.component';
import { AdvisorBoardComponent } from './advisor-board/advisor-board.component';
import { FeatureComponent } from './feature/feature.component';
import { TokenComponent } from './token/token.component';
import { StrategicPartnersComponent } from './strategic-partners/strategic-partners.component';
import { Information1Component } from './information1/information1.component';
import { FooterComponent } from './footer/footer.component';
import { ClickoutsideDirective } from './clickoutside.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    HeaderComponent,
    MainComponent,
    TimerComponent,
    InformationComponent,
    AboutusComponent,
    GrowYourCapitalComponent,
    RoadmapComponent,
    SliderComponent,
    TeamComponent,
    AdvisorBoardComponent,
    FeatureComponent,
    TokenComponent,
    StrategicPartnersComponent,
    Information1Component,
    FooterComponent,
    ClickoutsideDirective  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
