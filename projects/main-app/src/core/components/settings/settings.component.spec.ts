// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { DEFAUIL_UI_ITEMS, SETTINGS_SOURCE_DIR, SettingsComponent } from './settings.component';
// import { BrowserModule, By } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { Observable, Subscription } from 'rxjs';
// import { LanguageData, Localizer, ILanguageDescription, ILanguageChangeNotificator, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

// xdescribe('SettingsComponent', () => {

//   let localizer: ILocalizer;

//   let component: SettingsComponent;
//   let fixture: ComponentFixture<SettingsComponent>;

//   let langSelectNotificationService: ILanguageChangeNotificator; 

//   beforeEach(async () => {
//     localStorage.clear();
//     let localizer1 = LocalizerFactory.createLocalizer<UIItems>(SETTINGS_SOURCE_DIR, 1, DEFAUIL_UI_ITEMS, this); new Localizer(SETTINGS_SOURCE_DIR, 1);
//     langSelectNotificationService = Localizer.languageChangeNotificator;

//     await TestBed.configureTestingModule({
//       imports: [SettingsComponent, BrowserModule, BrowserAnimationsModule],
//       providers: [{provide: Localizer, useValue: localizer1}]
//     })
//     .compileComponents();
    
//     fixture = TestBed.createComponent(SettingsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     localizer = component.localizer; 
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   }); 

//   describe('By start (by Default)...', () => {

//     it('should have default label Settings', () => {
//       fixture.detectChanges();
//       const matCardTitleDebugElement = fixture.debugElement.query(By.css('mat-card-title'));
//       const matCardTitleElement = matCardTitleDebugElement.nativeElement;
//       expect(matCardTitleElement.textContent).toEqual('Settings'); 
//     });

//     it('should have two buttons with default labels Expand All and Collapse All', () => {
//       const expandButton1 = fixture.debugElement.query(By.css('button[mat-button]:nth-child(1)'));
//       expect(expandButton1.nativeElement.textContent).toContain('Expand All');

//       const expandButton2 = fixture.debugElement.query(By.css('button[mat-button]:nth-child(2)'));
//       expect(expandButton2.nativeElement.textContent).toContain('Collapse All');
//     });

//     it('should have three sub-components with icons and default combinations labels and Icons', () => {
//       const panelTitles = fixture.debugElement.queryAll(By.css('mat-panel-title'));
//       const panelDescriptions = fixture.debugElement.queryAll(By.css('mat-panel-description'));

//       expect(panelTitles.length).toBe(3);
//       expect(panelDescriptions.length).toBe(3);

//       const expectedIconAndTitles = [
//         'language Language:', 
//         'palette Appearance', 
//         'rule_folder Rules'];

//       panelTitles.forEach((title, index) => {
//         expect(title.nativeElement.textContent.trim()).toContain(expectedIconAndTitles[index]);
//       });

//       const expectedDescriptions = [
//         'English  English', 
//         'Set appearance options', 
//         'Set rules for automatic data deletion, etc.'];

//       panelDescriptions.forEach((description, index) => {
//         expect(description.nativeElement.textContent.trim()).toContain(expectedDescriptions[index]);
//       });
//     });
//   });

//   xdescribe('After language change on de-DE...', () => {
//     let languageChanged$: Observable<LanguageData>;

//     let subscription: Subscription;
//     let langDescr: ILanguageDescription;
    
//     beforeEach(() => {  
//       languageChanged$ = localizer.languageChanged$;
//       langDescr = {"enName": "German", "originalName": "Deutsch", "ietfTag": "de-DE"};
//     });

//     afterEach(() => {
//       subscription.unsubscribe();
//     });

//     it('the selected language should be de-DE', (done) => {   
//       subscription = languageChanged$
//       .subscribe((languageTag: LanguageData) => {
//         expect(languageTag.ietfTag).toEqual("de-DE");
//         done();
//       });
//       langSelectNotificationService.selectionChanged(langDescr);
//     });    

//     it('the current language in localizer should be de-DE', (done) => {   
//       subscription = languageChanged$
//       .subscribe((languageTag: LanguageData) => {
//         expect(localizer.currentLanguage?.ietfTag).toEqual("de-DE");
//         done();
//       });
//       langSelectNotificationService.selectionChanged(langDescr);
//     });  

//     it('the localizer should have languageMap for de-DE', (done) => {   
//       subscription = languageChanged$
//       .subscribe((languageTag: LanguageData) => {
//         expect(localizer.getTranslation('settings', 'not-exist')).toEqual("Einstellungen");
//         done();
//       });
//       langSelectNotificationService.selectionChanged(langDescr);
//     });  

//     it('should have default label Einstellungen', (done) => {   
//       subscription = languageChanged$
//       .subscribe((languageTag: LanguageData) => {
//         fixture.detectChanges();
//         const matCardTitleDebugElement = fixture.debugElement.query(By.css('mat-card-title'));
//         const matCardTitleElement = matCardTitleDebugElement.nativeElement;
//         expect(matCardTitleElement.textContent).toEqual('Einstellungen'); 
//         done();
//       });
//       langSelectNotificationService.selectionChanged(langDescr);
//     });

//     it('should have two buttons with default labels Expand All and Collapse All', (done) => {   
//       subscription = languageChanged$
//       .subscribe((languageTag: LanguageData) => {
//         fixture.detectChanges();
//         const expandButton1 = fixture.debugElement.query(By.css('button[mat-button]:nth-child(1)'));
//         expect(expandButton1.nativeElement.textContent).toContain('Alles erweitern');

//         const expandButton2 = fixture.debugElement.query(By.css('button[mat-button]:nth-child(2)'));
//         expect(expandButton2.nativeElement.textContent).toContain('Alles reduzieren');
//         done();
//       });
//       langSelectNotificationService.selectionChanged(langDescr);
//     });

//     it('should have three sub-components with icons and default combinations labels and Icons', (done) => {   
//       subscription = languageChanged$
//       .subscribe((languageTag: LanguageData) => {
//         fixture.detectChanges();
//         const panelTitles = fixture.debugElement.queryAll(By.css('mat-panel-title'));
//         const panelDescriptions = fixture.debugElement.queryAll(By.css('mat-panel-description'));

//         expect(panelTitles.length).toBe(3);
//         expect(panelDescriptions.length).toBe(3);

//         const expectedIconAndTitles = [
//           'language Sprache:', 
//           'palette Erscheinungsbild', 
//           'rule_folder Regeln'];

//         panelTitles.forEach((title, index) => {
//           expect(title.nativeElement.textContent.trim()).toContain(expectedIconAndTitles[index]);
//         });

//         const expectedDescriptions = [
//           'Deutsch  German', 
//           'Erscheinungsoptionen setzen', 
//           'Regeln für automatische Datenlöschung festlegen usw.'];

//         panelDescriptions.forEach((description, index) => {
//           expect(description.nativeElement.textContent.trim()).toContain(expectedDescriptions[index]);
//         });
//         done();   
//       });
//       langSelectNotificationService.selectionChanged(langDescr); 
//     });
//   });
// });
