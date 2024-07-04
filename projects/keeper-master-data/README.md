# KeeperMasterData

This TypeScript library supports the use and management of master data in web applications.

Master data, contrary to business data, will rarely change. 

Upon request for a specific part of the master data, the library tries to find it in local storage. If not found, it will be requested from a given web resource, saved locally, and then returned to the caller. 

This library utilizes the **browser-local-storage** library from this collection.

**Attention!** The library is not ready for use. Work in progress!
