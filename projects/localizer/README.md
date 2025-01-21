# Localizer


## Introduction

**Internationalization (i18n)** involves designing and developing a software product, application, or document content so that it can be easily adapted to various cultures, regions, and languages without requiring engineering changes. It ensures that the application is flexible enough to handle different languages, scripts, and cultural norms. In short, i18n is about making an application ready for localization.

**Localization (l10n)** involves adapting a software product, application, or document content to meet the language, cultural, and other specific requirements of a particular target market or locale. This includes translating text, adjusting layouts to fit different scripts, using appropriate images and symbols, and following local regulations3. Localization aims to provide a seamless and culturally relevant user experience for users in different regions.

This TypeScript library supports localization (using terms and texts in a given natural language) in web applications.

Before the needed information for a component in a specific natural language is used, it can be requested as a JSON file from this library. The library will attempt to find it in local storage. If it is not found, it will be requested from a specified web resource.

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


 2. Documentation improvement 
