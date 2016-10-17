# Changelog

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
