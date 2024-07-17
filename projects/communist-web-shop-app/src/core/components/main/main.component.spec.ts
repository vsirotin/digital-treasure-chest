import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from "@angular/router/testing";
import { Logger } from '../../../shared/services/logging/logger';
import { LanguageData, Localizer } from '../../../shared/classes/localization/localizer';
import { MAIN_SOURCE_DIR } from './main.component';
import { ILanguageChangeNotificator } from '../../../shared/classes/localization/language-change-notificator';
import { Observable, Subscription } from 'rxjs';
import { ILanguageDescription } from '../../../shared/classes/localization/language-description';


xdescribe('MainComponent', () => {

  let localizer: Localizer;
  
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  let langSelectNotificationService: ILanguageChangeNotificator; 

  beforeEach(async () => {
    localStorage.clear();
    let logger: Logger = new Logger();
    let localizer1 = new Localizer(MAIN_SOURCE_DIR, 1, logger);
    langSelectNotificationService = Localizer.languageChangeNotificator;

    await TestBed.configureTestingModule({
      imports: [MainComponent, BrowserModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [{provide: Localizer, useValue: localizer1}, {provide: Logger, useValue: logger}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localizer = component.localizer; 

  });

   it('should create', () => {
    expect(component).toBeTruthy();
  });

  function checkLabels(expectations: string[]) {
    const items = fixture.debugElement.queryAll(By.css('a[mat-list-item]'));
    expect(items.length).toBe(6);

    items.forEach((title, index) => {
      expect(title.nativeElement.textContent.trim()).toContain(expectations[index]);
    });
  }
  
  describe('By start (by Default)...', () => {

    it('should have 5 links with default labels ', () => {

      const expectedLinkLabels = [
        'Capture', 
        'Edit', 
        'Analysis', 
        'Import/Export',       
        'Settings',
        'Info'];

      checkLabels(expectedLinkLabels);  

    });

    it('should have default active component ', () => {

      const appEdit = fixture.debugElement.query(By.css('mat-sidenav-content'));
      expect(appEdit.nativeElement.textContent).toContain("Start ");

    });

    it('after click on Edit should Edit component presented ', () => {
      doCleckOnmenuItemAndCheckActiveComponent('Edit', 'edit works!');      
    });

    it('after click on Edit should Edit component presented ', () => {
      doCleckOnmenuItemAndCheckActiveComponent('Analysis', 'analysis works!');      
    });

    it('after click on Edit should Edit component presented ', () => {
      doCleckOnmenuItemAndCheckActiveComponent('Import/Export', 'import-export works!');      
    });

    it('after click on Edit should Edit component presented ', () => {
      doCleckOnmenuItemAndCheckActiveComponent('Settings', 'Settings');      
    });

    it('after click on Edit should Edit component presented ', () => {
      doCleckOnmenuItemAndCheckActiveComponent('Info', 'info works!');      
    });

    function doCleckOnmenuItemAndCheckActiveComponent(menuItemLabel: string, expectedTextPart: string) {
      const buttons = fixture.debugElement.queryAll(By.css('a[mat-list-item]'));
      buttons.forEach(button => console.log("button textContent=" + button.nativeElement.textContent));


      const button = buttons.find(button => button.nativeElement.textContent.includes(menuItemLabel));
      button?.triggerEventHandler('click', null);
      fixture.detectChanges();

      const appEdit = fixture.debugElement.query(By.css('mat-sidenav-content'));
      expect(appEdit.nativeElement.textContent).toContain(expectedTextPart);
    }
  });

  describe('After language change on de-DE...', () => {
    let languageChanged$: Observable<LanguageData>;

    let subscription: Subscription;
    let langDescr: ILanguageDescription;
    
    beforeEach(() => {  
      languageChanged$ = localizer.languageChanged$;
      langDescr = {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"};
    });

    afterEach(() => {
      subscription.unsubscribe();
    });

    it('the selected language should be de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
        expect(languageTag.ietfTag).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });    

    it('the current language in localizer should be de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
        expect(localizer.currentLanguage?.ietfTag).toEqual("de-DE");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });  

    it('the localizer should have languageMap for de-DE', (done) => {   
      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
        expect(localizer.getTranslation('capture', 'not-exist')).toEqual("Datenerfassung");
        done();
      });
      langSelectNotificationService.selectionChanged(langDescr);
    });  


    it('should have 5 German labels', (done) => {   
      console.log("Start Test. MainComponent.spec.ts: should have 5 German labels")

      subscription = languageChanged$
      .subscribe((languageTag: LanguageData) => {
         console.log("In subscription 1 MainComponent.spec.ts: should have 5 German labels languageTag=" 
         + JSON.stringify(languageTag) + " localizer.currentLanguageMap="
           + JSON.stringify(Object.fromEntries(localizer.currentLanguageMap)));
        fixture.detectChanges();

        const expectedLinkLabels = [
          'Datenerfassung', 
          'Datenänderung', 
          'Daten-Analyse', 
          'Import/Export von Daten',       
          'Einstellungen',
          'Info'];
  
          console.log("In subscription 2 Before test MainComponent.spec.ts: should have 5 German labels")  
          checkLabels(expectedLinkLabels); 

        done();
      });
      console.log("Before langSelectNotificationService.selectionChanged(langDescr); MainComponent.spec.ts: should have 5 German labels")
      component.languageChangeNotificator.selectionChanged(langDescr);
      console.log("After langSelectNotificationService.selectionChanged(langDescr); MainComponent.spec.ts: should have 5 German labels")
    });
  });
});
