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
import * as uiDefault from '../../../assets/languages/core/components/main/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';


export const MAIN_SOURCE_DIR = "assets/languages/core/components/main/lang";

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
export class MainComponent implements OnInit, OnDestroy, ILocalizationClient<IMainUI> {
  @ViewChild('snav') snav!: MatSidenavModule;

  private subscriptionBtnClicked: Subscription;

  logger : ILogger = LoggerFactory.getLogger("MainComponent");

  showFiller = false;

  isShowing = false;

  currentCommponent = "info";

  mobileQuery!: MediaQueryList;

  ui: IMainUI = (uiDefault as any).default;

  private _mobileQueryListener!: () => void;
  private localizer: ILocalizer;

  constructor(private communicatorService: CommunicatorService,
   changeDetectorRef: ChangeDetectorRef, 
   media: MediaMatcher, 
   private breakpointObserver: BreakpointObserver,
   private cdr: ChangeDetectorRef,
   private titleService: Title) {
    this.localizer = LocalizerFactory.createLocalizer<IMainUI>(MAIN_SOURCE_DIR, 1, this.ui, this);
    this.logger.log("Start of constructor");

    this.titleService.setTitle(this.ui.title); 

    this.subscriptionBtnClicked = this.communicatorService.buttonClicked$.subscribe(() => {
      this.logger.debug("Start of subscriptionBtnClicked");
      this.toggleMenu();
    });


    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  updateLocalization(data: IMainUI): void {
    this.ui  = data;
  }

  async ngOnInit() {
    this.logger.debug("Start of ngOnInit");
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


