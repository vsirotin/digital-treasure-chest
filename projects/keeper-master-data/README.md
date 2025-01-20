# Keeper for Master Data

## Description ##
This TypeScript library supports the use and management of master data in web applications.

Master data, contrary to business data, will rarely change. 

Upon request for a specific part of the master data, the library tries to find it in local storage. If not found, it will be requested from a given web resource, saved locally, and then returned to the caller. 

This means that the expensive call of external resources is saved because the data is stored locally. 
The application can decide or learn via detours that the new data must be retrieved from external resources. In this case, the data should be deleted locally.

Synchronous and asynchronous resources can be used as external resources. 

## Using ##

The library allows you to develop your own tools.
It contains some predefined readers, writers, adapters (combination of reader and writer) and keepers (a chain of adapters):

### Readers: ###
- Http - Reader
- Browser language detector
- Default reader (return always the same value)

### Adaptors: ###
- LocalStorage Adapter for simple data
- LocalStorage Adapter for hierarchical data

### Keepers for master data: ###
- Keeper for external HTTP resource
- Keeper for user language

---

Let's look at a typical web application situation. 
For our components, master data is assigned that changes relatively rarely.  This cause, as well as a possibly bad connection, is the reason why it is worthwhile to store the master data locally (in the browser's LocalStorage). 
For this we can use an existing class from our library:

```JavaScript
    keeper = new KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion(componentCoordinate, componentVersion);

 ...
    let result = await keeper.findAsync(key);           
```
Let's look at how this class is built internally:
```JavaScript
  
    export class KeeperMasterDataBrowserLocalStoreHtppForComponentWithVersion<T> extends KeeperMasterDataKeyValueAsync<T> {

    
    constructor(componentCoordinate: string, componentVersion: number) {
        super(new LocalStorageAdapterWithVersionsAndCategories(componentVersion, componentCoordinate), 
        [new HTTPKeyValueRepositoryReader(componentCoordinate + "/" + componentVersion + "/")]);
    }

}
```

It is the chain of an adapter and a “half-adapter” (reader).

You can build your own keepers based on this model. 

---
Other code examples please see in GitHub repository of project.

---
# Relese Notes #

## 2.0.1

Major change

1. The Specification of LocalStorageAdapter has been changed. This has been made less error-prone. 
2. Documentation improvement. 