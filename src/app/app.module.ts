import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FilePageComponent } from './components/file-page/file-page.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { FilesTransformPipe } from './pipes/files-transform.pipe';
import { TextTransformPipe } from './pipes/text-transform.pipe';
import { PathSplitterPipe } from './pipes/path-splitter.pipe';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';


@NgModule({
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    FilePageComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    FilesTransformPipe,
    TextTransformPipe,
    PathSplitterPipe,
    ContextMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
