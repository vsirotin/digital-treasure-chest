import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatButtonModule}  from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommunicatorService } from '../toolbar/service/communicator.service'
import { Subscription } from 'rxjs';
import { ToolbarComponent } from '../toolbar/toolbar.component';


import { SettingComponent } from '../setting/setting.component';
import { InfoComponent } from '../info/info.component';
import { BuyingComponent } from '../buying/buying.component';
import { ReportComponent } from '../report/report.component';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';
import { LocalizerService } from '@vsirotin/localizer';
//import { Log4ts } from '../../../../../log4ts/src/lib/log4ts';
// import { Localizer } from '../../../shared/classes/localization/localizer';
// import { ILanguageChangeNotificator } from '../../../shared/classes/localization/language-change-notificator';
// import { ILanguageDescription } from '../../../shared/classes/localization/language-description';


export const MAIN_SOURCE_DIR = "assets/languages/core/components/main/lang/";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatSidenavModule, 
    MatToolbarModule,
    MatButtonModule, 
    MatIconModule,
    MatListModule, 
    RouterModule,
    ToolbarComponent,
    BuyingComponent,
    ReportComponent,
    SettingComponent,
    InfoComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('snav') snav!: MatSidenavModule;

  private subscriptionBtnClicked: Subscription;
//  private subscriptionLangChanged: Subscription;

  logger : ILogger;

  showFiller = false;

  isShowing = false;

  currentCommponent = "info";

  mobileQuery!: MediaQueryList;

  readonly navItemsDefault: Array<INavigationEntry> = [

    {id: "buying", label: "Buying", icon: "add_shopping_cart"},
    {id: "report", label: "Report", icon: "feed"},
    {id: "info", label: "Info", icon: "info_outline"},
    {id: "settings", label: "Settings", icon: "settings"},
  ];

  private _mobileQueryListener!: () => void;
  lovalizerService: LocalizerService = new LocalizerService(); //TODO: remove this line after experiment
  // localizer: Localizer = new Localizer(MAIN_SOURCE_DIR, 1, new Logger());
  // languageChangeNotificator: ILanguageChangeNotificator = Localizer.languageChangeNotificator;

  constructor(private communicatorService: CommunicatorService,
   changeDetectorRef: ChangeDetectorRef, 
   media: MediaMatcher, 
   private cdr: ChangeDetectorRef) {

    this.logger = LoggerFactory.getLogger("core/components/main/main.component");
    this.logger.error("Start of MainComponent.constructor");

    this.subscriptionBtnClicked = this.communicatorService.buttonClicked$.subscribe(() => {
 //     this.logger.debug("Start of MainComponent.subscriptionBtnClicked");
      this.toggleMenu();
    });

    // this.subscriptionLangChanged = this
    // .languageChangeNotificator.selectionChanged$
    // .subscribe((selectedLanguage: ILanguageDescription) => {
    //   this.logger.debug("Start of MainComponent.subscriptionLangChanged selectedLanguage=" + JSON.stringify(selectedLanguage));
    //   this.logger.debug("MainComponent.subscriptionLangChanged after resetNavItems");
    //   this.cdr.detectChanges();
    //   this.logger.debug("MainComponent.subscriptionLangChanged completed");
    // }); 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
//    this.logger.debug("End of MainComponent.constructor"); 
  }

  async ngOnInit() {
    // this.logger.debug("Start of MainComponent.ngOnInit");
    // await this.localizer.initializeLanguage();
    // this.logger.debug("End of MainComponent.ngOnInit");
  }

  selectMenuItem(id: string) {
 //   this.logger.
    console.debug("Start of MainComponent.selectMenuItem id=" + id);
    this.currentCommponent = id;
    this.toggleMenu();
  }

  toggleMenu() {
    this.isShowing = !this.isShowing
  }

  ngOnDestroy() {
    // Always unsubscribe to prevent memory leaks
    this.subscriptionBtnClicked.unsubscribe();
 //  this.subscriptionLangChanged.unsubscribe();
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

};

interface INavigationEntry {
  id: string;
  label: string;
  icon: string;
}

function deepCopyArray<T>(arr: Array<T>): Array<T> {
  return arr.map(item => Object.assign({}, item));
}

