import { ChangeDetectorRef, Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MediaMatcher, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule}  from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CommunicatorService } from '../toolbar/service/communicator.service'
import { Subscription } from 'rxjs';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { SettingsComponent } from '../settings/settings.component';
import { InfoComponent } from '../info/info.component';
import { SearchComponent } from '../search/search.component';
import { ReportComponent } from '../report/report.component';
import { ILogger, LoggerFactory } from '@vsirotin/log4ts';


export const MAIN_SOURCE_DIR = "assets/languages/core/components/main/lang/";

interface IUIMainLanguageRelevantItems {
  search: string;
  report: string;
  info: string;
  settings: string;
}

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
    SearchComponent,
    ReportComponent,
    SettingsComponent,
    InfoComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('snav') snav!: MatSidenavModule;

  private subscriptionBtnClicked: Subscription;
// private subscriptionLangChanged: Subscription;

  logger : ILogger = LoggerFactory.getLogger("MainComponent");

  showFiller = false;

  isShowing = false;

  currentCommponent = "info";

  mobileQuery!: MediaQueryList;

 ui : IMainUI = {
    navItems: [

      {id: "search", label: "Search", icon: "add_chart"},
      {id: "report", label: "Report", icon: "feed"},
      {id: "info", label: "Info", icon: "info_outline"},
      {id: "settings", label: "Settings", icon: "settings"},
    ],
    title: "Digital Treasure Chest",
  };

  

  private _mobileQueryListener!: () => void;
  //localizer: ILocalizer<IUIMainLanguageRelevantItems> = LocalizerFactory.createLocalizer(MAIN_SOURCE_DIR, 1);
  //languageChangeNotificator: ILanguageChangeNotificator = Localizer.languageChangeNotificator;

  constructor(private communicatorService: CommunicatorService,
   changeDetectorRef: ChangeDetectorRef, 
   media: MediaMatcher, 
   private breakpointObserver: BreakpointObserver,
   private cdr: ChangeDetectorRef,
   private titleService: Title) {
    this.logger.setLogLevel(0);
    this.logger.log("Start of constructor");

    this.titleService.setTitle(this.ui.title); 

    this.subscriptionBtnClicked = this.communicatorService.buttonClicked$.subscribe(() => {
      this.logger.debug("Start of subscriptionBtnClicked");
      this.toggleMenu();
    });

//     this.subscriptionLangChanged = this
//     .localizer.languageSwitched$
//     .subscribe((languageRelevantItems: IUIMainLanguageRelevantItems) => {
//  //     this.logger.debug("Start of subscriptionLangChanged selectedLanguage=" + JSON.stringify(selectedLanguage));
//       this.logger.debug("subscriptionLangChanged after resetNavItems");
//       this.cdr.detectChanges();
//       this.logger.debug("subscriptionLangChanged completed");
//     }); 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
//    this.logger.debug("End of constructor"); 
  }

  async ngOnInit() {
    this.logger.debug("Start of ngOnInit");
  //  await this.localizer.initializeLanguage();
    this.logger.debug("End of ngOnInit");
    const isLargeScreen = this.breakpointObserver.isMatched('(min-width: 600px)');
    this.logger.log("ngOnInit", "isLargeScreen=", isLargeScreen);
    this.isShowing = isLargeScreen;
  }

  selectMenuItem(id: string) {
    this.currentCommponent = id;
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

interface IMainUI {
  title: string;
  navItems: Array<INavigationEntry>;
}


