"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var column_prop_getters_1 = require("./column-prop-getters");
function sectionRows(rows, prop, sections) {
    var getter = column_prop_getters_1.getterForProp(prop);
    // index sections by the section property value for fast lookup
    var sectionByValue = {};
    var sectionCounts = [];
    for (var sectionIndex in sections) {
        sectionByValue[sections[sectionIndex].propValue] = {
            index: sectionIndex,
            section: sections[sectionIndex]
        };
        sectionCounts[sectionIndex] = 0;
    }
    var rowSections = new Map();
    // reduce to only rows that are part of an open section and add a section index to each row
    rows = rows || [];
    var sectionedRows = rows.reduce(function (includedRows, row) {
        var val = getter(row, prop);
        if (val in sectionByValue) {
            var sectionIndex = sectionByValue[val].index;
            rowSections.set(row, sectionIndex);
            sectionCounts[sectionIndex]++;
            if (sectionByValue[val].section.expanded) {
                includedRows.push(row);
            }
        }
        return includedRows;
    }, []);
    // add section header rows
    for (var sectionIndex in sections) {
        var sectionHeader = __assign({}, (sections[sectionIndex]), { $$sectionIndex: sectionIndex, $$isSectionHeader: true });
        sectionedRows.push(sectionHeader);
    }
    sectionedRows = sectionedRows.sort(function (a, b) {
        var aSection = a.$$isSectionHeader ? a.$$sectionIndex : rowSections.get(a);
        var bSection = b.$$isSectionHeader ? b.$$sectionIndex : rowSections.get(b);
        if (aSection === bSection) {
            if (a.$$isSectionHeader) {
                return -1;
            }
            if (b.$$isSectionHeader) {
                return 1;
            }
            return 0;
        }
        return +aSection < +bSection ? -1 : 1;
    });
    // sort by section index
    return {
        rows: sectionedRows,
        rowSections: rowSections,
        sectionCounts: sectionCounts
    };
}
exports.sectionRows = sectionRows;
//# sourceMappingURL=section.js.map