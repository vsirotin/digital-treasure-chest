# Main Use Cases of this application

## 1. Start
### U1-1. First start
User starts the app first time or after deleting all his data with U5-3. 

Behavior: 
1. App finds out the browser language.
2. App sets a current language.
3. App presents Info page with current language. 

### U1-2. Subsequent starts
User starts the application after the first start.

Behavior:
1. App finds out a current language.
2. App sets a current language.
3. Depending on the chest status:
   - If the chest is empty, the app presents the search page.
   - Else, the app presents the report page.

# 2. Shopping
## U2-1. Selection an numbers
Behavior:
1. Depending on the chest status:
   - If the chest is not completelly filled, the app presents:
     - list of selection criteries in current language. 
     - information, how many numbers are already is in chest and how many number the user can add into the chest.
    - Else recomendation (with button)  to go to chest and to remove some numbers from chest. In this case no next steps are possible. 
2. User selects some criteries.
3. After selection of each criteria app presents:
    - how many numbers from chest and "new" numbers matches to current combination of criterias
    - If selcted numbers can be add in chest, these numbers are presented as a list inclusive a numbers from chest, those match to selection criteria. Numbers from chest will be present diffferent as "new" numbers. A button "Add" will be in this case available, otherwise - not. 
## U2-2. Add selection in chest
Behavior:
1. After user's click on button "Add" "new" numbers will be placed in chest and selection cleared.

## U2-3. Clear selection in chest
Behavior:
1. After user's click on "Clear criteries" selection criteries an selected numbers will be cleared. 

# Reporting
## U3-1. Show numbers in chest
Behavior:
1. Depending on the chest status:
   - If the chest is empty corresponded message will be presented.
   - else a table this numbers and their properties will be presented. 

## U3-2. Show special information about a number
Behavior:
1. Depending on existing special information about some number in table special icon for this number will be presented. If user click on this icon, a pop-up with special information about this number will be presented. 

## U3-3. Remove number from chest
Behavior:
1. In the table in some row a "delete" icon will be presented. When user click on it, the corresponded number will be remove from chest with confirmation dialog.  

# Info

## U4-1. Show information about an application
Behavior:
1. Information about app will be presented in current language. 

# Settings

## U5-1. Select application language
Behavior:
1. User select a language. 
2. Selected language will be current language for all parts of app. Since this moment up to next language selection all text in app will be presented in current language. 
3. Information about current language will be presented in toolbar and saved for next sessions. 

## U5-2. Set logging parameters
Behavior:
1. User select a name for files to logging or pattern for file names. 
2. Logging according selected criteria will be started. 
3. Logging setting are working only for current session. 

## U5-3. Clear all personal data
Behavior:
1. User click on button "Delete all my data from browser memory for this application".
2. App present confirmation dialog with button "Ok" ans "Cancel".
3. If user clickt on "Ok" all data from all types of browser memory will be removed. 

