# Changelog

## 1.6.0
- Bug: Column headers not re-ordering (#238)
- Bug: Datatable doesn't sort data correctly when data changed (#284)
- BREAKING: `comparator` now is a normal sort function arguments of `propA, propB`.

## 1.5.1
- Bug: Custom comparator should return new array (#286)
- Bug: Init selection to empty array (#285)

## 1.5.0
- Enhancement: `externalSorting` input for simpler server-sorting usage (#281)
- Enhancement: Add `trackByProp` for change detection with mutation of row data
- Bug: Row height variable access protection (#280)
- Chore: Upgrade to Angular 2.2.0
- Demo: Inline editing updates
- Demo: Live data refresh demo
- Breaking: Remove `refresh` method per recommendation by @robwormald

## 1.4.1
- Bug: Ignore next page when already at last (#223)
- Chore: Redid Webpack Config to be clean
- Chore: TESTS! TRAVIS BUILDS! COVERAGE REPORTING!

## 1.4.0
- Enhancement: Added `refresh` API for updating table (#255)
- Bug: Fix intersection observer type errors (#268)

## 1.3.1
- Bug: Fix force column width distribution overriding new resize (#245)

## 1.3.0
- Enhancement: `selectCheck` fn to prevent selection
- Bug: Fix columns leaking event handlers
- Bug: Fix column toggling errors (#245)
- Bug: Fix AoT Metadata not creating

## 1.2.0
- Bug: Fix columns loosing templates on resize (#252)
- Bug: Fix pager not having right pages when hidden by default
- Bug: Fix expressive column width as attribute with standard column distribution
- Bug: Fix body columns not readjusting after window resize (#251)
- Enhancement: Refactor `emptyMessage` and `totalMessage` to `messages` object
- Enhancement: Huge perf improvement for tables hidden by default

## 1.1.0
- Feature: NGC Complation
- Bug: Null value in deepValueGetter (#243)
- Chore: Update Depedencies

## 1.0.0
- Feature: Cell Selection and Keyboard Navigation
- Feature: `activation` events
- Enhancement: `OnPush` all the things!
- Enhancement: Add `totalMessage` option for localization
- Enhancement: Demo Page
- Enhancement: Page Count Formatted
- Enhancement: Automatically format column `prop` when no `name` passed
- Enhancement: Add ability to pass false to `comparator` for sort handling via event
- Bug: Window resize not updating rows in virtual scrolling
- Chore: Switch to SemVer

### Breaking Changes
- `TableOptions` has been removed and options are `Input` on component now
- `TableColumn` class has been removed, just pass normal objects
- Event names has been renamed using Angular2 standards
- Components have been renamed to Angular2 standards
- Removed `StateService`

## 0.12.0
- Bug: Return empty string on undefined deep values (#232)
- Bug: Fix force fill alog (#218)
- Enhancement: Support for other icon types (#235)
- Enhancement: Add ability to identify rows for proper selection (#154)

## 0.11.2
- Enhancement: Add ability to define css icon classes for pager / header
- Chore: Uprade to Angular 2.1.1

## 0.11.1
- Chore: Polish on new build

## 0.11.0
- Chore: New build process
- Bug: Fix detail row bug (#212)

## 0.10.1
- Bug: Fix `$$expanded` undefined with server paging (#210)

## 0.10.0
- Chore: Upgrade to Angular 2.1.0 (#202)
- Chore: Removed engine restrictions (#195)
- Bug: windows builds with node-sass (#207)
- Bug: resizing not closing correctly (#196)
- Bug: Fix height paging (#208)
- Enhancement: Improve Active CSS (#204)
- Enhancement: Add Empty Message (#194)
- Enhancement: Add deep value getter to sortRows function (#181)
- Enhancement: Sort Classes are applied to body cells (#166)
- Enhancement: AoT Compatibility (#199)
- Feature: Row Detail (#201)

## 0.9.3
- Column resize sometimes gives weird behaviour on mouse resize/click (#155)
- Fix order of setters in DataTable ngOnChanges (#179)
- Remove document event listener subscription leak in draggable & resizeable
- Fix `setScrollTop` undefined error (#182)

## 0.9.2
- Fix `name` being `undefined` introduced in 0.9.0 release

## 0.9.1
- Export component references for external consumption (#176)

## 0.9.0
- Fix accidental breaking change of renaming `HeaderCell` column property to `model`. See [commit](https://github.com/swimlane/angular2-data-table/commit/6c56b51ab918e380edb0d511730b28e66cb80afe#diff-aee46548d5e0b9f72917dd179250d4fe).
- Ensure minWidth and maxWidth values are specified saved as numbers (#167)
- Add row double click option (#168)

## 0.8.0
- Added the ability to define header templates expressively
*Breaking Change!* Renamed `template` to `cellTemplate` in column options

## 0.7.4
- Removed #142 in favor of style height
- Fixed issue with height + scrollbarV not sizing right
- Fix limit not applied (#133)
- Fix sort not resetting to top of page (#136)
- Added option validation

## 0.7.3
- Huge perf bumps (#149)

## 0.7.2
- Build fixes

## 0.7.1
- Removed template wrapper in favor of native template outlet

## 0.7.0
- Upgrade Angular 2.0.1 & ZoneJS
- Angular Code Style Compliance (#147)
- Fix initial load of rows jumbled (#156)
- Update row/options setting to ngOnChanges (#151)
- Fix column height not set correctly (#144)

## 0.6.1
- Virtual Scrolling Emits Paging (#130)

## 0.6.0
- Update to Angular 2.0.0!
- Fix horizontal header issue (#129)

## 0.5.1
- Fixed Multiple Tables on Same Page (#103)
- Fix TS Helpers not being included in release (#107)
- Update `onPage` API to reflect docs (#116)

## 0.5.0
- Upgrade to Angular2 RC7
