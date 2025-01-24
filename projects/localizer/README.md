# Localizer

[![GitHub license](https://img.shields.io/badge/license-Apache%20License%202.0-blue.svg?style=flat)](https://www.apache.org/licenses/LICENSE-2.0)

[![npm](https://img.shields.io/npm/v/@vsirotin/localizer?sort=semver&logo=npm)](https://www.npmjs.com/package/@vsirotin/localizer)
[![npm type definitions](https://img.shields.io/npm/types/v-github-icon?logo=typescript)](https://github.com/vinayakkulkarni/v-github-icon/blob/main/package.json)

[![npm](https://img.shields.io/npm/dt/@vsirotin/localizer?logo=npm)](http://npm-stat.com/charts.html?package=@vsirotin/localizer)
[![npm](https://img.shields.io/npm/dw/@vsirotin/localizer?logo=npm)](http://npm-stat.com/charts.html?package=@vsirotin/keeper-master-data)

 
## Introduction

**Internationalization (i18n)** involves designing and developing a software product, application, or document content so that it can be easily adapted to various cultures, regions, and languages without requiring engineering changes. It ensures that the application is flexible enough to handle different languages, scripts, and cultural norms. In short, i18n is about making an application ready for localization.

**Localization (l10n)** involves adapting a software product, application, or document content to meet the language, cultural, and other specific requirements of a particular target market or locale. This includes translating text, adjusting layouts to fit different scripts, using appropriate images and symbols, and following local regulations. Localization aims to provide a seamless and culturally relevant user experience for users in different regions.

**Localizer** (this TypeScript library) supports localization  in web applications.

How it works in the case of 30 mostly used in Internet languages, you can see in [demo application](https://vsirotin.github.io/digital-treasure-chest/). Its code you can see [here](https://github.com/vsirotin/communist-web-shop/blob/70a8bf069c2cfd4626b9de43e36aea35b6eda570/projects/main-app).

## Architectural Overview of Localizer

The **Localizer** architecture is designed to facilitate the seamless integration of localization into web applications. It consists of the following key components:

**LocalizerFactory**: Responsible for creating instances of localizers. It ensures that each component or class that requires localization gets a properly configured localizer instance.

**Localizer**: Handles the actual localization logic, including fetching and applying translations based on the current language.

**LanguageChangeNotificator**: Manages language change events and notifies all registered localizers to update their translations accordingly.

## How to use

### Setting a Language for Localizer Instances
To set a language for localizer instances, you need to use the **LanguageChangeNotificator** to notify all localizers about the language change. Here is a general approach wit without using specific features of web framworks (e.g. Angular):

1. Create an instance of **LanguageChangeNotificator** like this:

```javascript
 private selectedLanguageService: ILanguageChangeNotificator = LocalizerFactory.languageChangeNotificator;

  constructor(){}

  onRadioChange() { 
    this.selectedLanguageService.selectionChanged(this.selectedLangCode);
  }
 ``` 

2. When the user selects a new language, call the selectionChanged method on the LanguageChangeNotificator instance with the new language code.
3. All registered localizers will automatically update their translations based on the new language.

For more details see [Language Selection Component](https://github.com/vsirotin/communist-web-shop/blob/ba3b6503d0e1a69189807238abccf23e3e6f7af2/projects/main-app/src/shared/components/language-selection).

### Creating and Using a Localizer in a Component or Class
To create and use a localizer in a component or class, follow these steps:

1. Import the necessary classes from the localizer library:

```javascript
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';
```
2. Implement the **ILocalizationClient** interface in your component or class:

```javascript

import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

...
export class ReportComponent implements ILocalizationClient<IReportUI> {
  private localizer: ILocalizer;

  constructor() {
   this.localizer = LocalizerFactory.createLocalizer<IReportUI>("assets/languages/core/components/report/lang", 1, this.ui, this);
  }

  updateLocalization(data: IReportUI): void {
    this.ui = data;
  }
}
```

Let explain the parameters, used by creation of localizers above:

1. "assets/languages/core/components/report/lang" - a path to "root" directory for versions (directories) with translations of language specific elements in used lynguages.  
2. 1 - a version of interface or language translations. 
3. this.ui - an initial variant of translated items. It will be used when needed translation are not acceciabled. 
4. this - a class or component, that contains localizer and implements interface **ILocalizationClient**.

When the language changes, the **updateLocalization** method will be called with the new translations.


For more details see [Report Component](https://github.com/vsirotin/communist-web-shop/blob/a7414d7ea5f2f4a3a7207ff0e8611e827b2b6f2b/projects/main-app/src/core/components/report)

### Placement of Language-Specific JSON Files
Language-specific JSON files should be placed in the appropriate directory structure within the assets/languages directory. For example, for the report component, the JSON files should be placed in /src/assets/languages/core/components/report/lang/1.

This structure ensures that each component has its own set of language-specific files, making it easy to manage and update translations for individual components.

For more details see [Language-Specific JSON Files](https://github.com/vsirotin/communist-web-shop/blob/aa05ef3d41050498b9c54ff1cf5c9502910f5751/projects/main-app/src/assets/languages/core/components/report/lang/1)

### Local Storage of JSON Files
The JSON files will be saved locally browser local storage. This allows the application to load the necessary translations directly from the local storage, ensuring fast and reliable access to the localization data.
Wenn your application should update transalions, you schould update version number by localizer.

### Language specific formating

The code fragment below shows, how you can use **Localizer** by language specific formating:

```javascript
   LocalizerFactory.languageChangeNotificator.selectionChanged('de-DE');
    let currenrLang = LocalizerFactory.getCurrentLanguageCode();
    const deDEFormatter = new Intl.DateTimeFormat(currenrLang);
    const date = new Date(Date.UTC(2025, 1, 20, 3, 0, 0));

    let result = deDEFormatter.format(date);
    expect(result).toEqual('20.2.2025');

    LocalizerFactory.languageChangeNotificator.selectionChanged('en-US');
    currenrLang = LocalizerFactory.getCurrentLanguageCode();

    const enUSFormatter = new Intl.DateTimeFormat(currenrLang);
    result = enUSFormatter.format(date);
    expect(result).toEqual('2/20/2025');
```

---

For more details, you can refer to the relevant files in the [GitHub repository](https://github.com/vsirotin/communist-web-shop/blob/d72ecbcb1efb5c0f5c25d6b14dfbefe1b84764e3/projects/localizer).


---

## Release Notes #

## 1.0.3
Rebuild because new dependencies.

## 1.0.4 
Update of dependencies. Correction of deployment unit.

## 1.1.1 
 1. New functions in LocalizerFactory: 
 
    **static getCurrentLanguageCode()**

 2. New functions in class LanguageChangeNotificator:

    **isLanguageSupported(ietfTag: string|null|undefined): boolean**

    **getDefaultLanguageDescription(): ILanguageDescription**
  
    **getDefaultLanguageTag(): string**

    **setDefaultLanguageDescription(lang: ILanguageDescription): void**


 3. Documentation improvement 
