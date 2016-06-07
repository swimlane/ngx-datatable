var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("utils/debounce", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        return function () {
            context = this;
            args = arguments;
            timestamp = new Date();
            var later = function () {
                var last = new Date() - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                }
                else {
                    timeout = null;
                    if (!immediate)
                        result = func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow)
                result = func.apply(context, args);
            return result;
        };
    }
    exports_1("debounce", debounce);
    function debounceable(duration, immediate) {
        return function innerDecorator(target, key, descriptor) {
            return {
                configurable: true,
                enumerable: descriptor.enumerable,
                get: function getter() {
                    Object.defineProperty(this, key, {
                        configurable: true,
                        enumerable: descriptor.enumerable,
                        value: debounce(descriptor.value, duration, immediate)
                    });
                    return this[key];
                }
            };
        };
    }
    exports_1("debounceable", debounceable);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("utils/column", [], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function columnsByPin(cols) {
        var ret = {
            left: [],
            center: [],
            right: []
        };
        if (cols) {
            for (var i = 0, len = cols.length; i < len; i++) {
                var c = cols[i];
                if (c.frozenLeft) {
                    ret.left.push(c);
                }
                else if (c.frozenRight) {
                    ret.right.push(c);
                }
                else {
                    ret.center.push(c);
                }
            }
        }
        return ret;
    }
    exports_2("columnsByPin", columnsByPin);
    function columnGroupWidths(groups, all) {
        return {
            left: columnTotalWidth(groups.left),
            center: columnTotalWidth(groups.center),
            right: columnTotalWidth(groups.right),
            total: columnTotalWidth(all)
        };
    }
    exports_2("columnGroupWidths", columnGroupWidths);
    function columnTotalWidth(columns, prop) {
        var totalWidth = 0;
        if (columns) {
            for (var i = 0, len = columns.length; i < len; i++) {
                var c = columns[i];
                var has = prop && c[prop];
                totalWidth = totalWidth + (has ? c[prop] : c.width);
            }
        }
        return totalWidth;
    }
    exports_2("columnTotalWidth", columnTotalWidth);
    return {
        setters:[],
        execute: function() {
            ;
            ;
        }
    }
});
System.register("utils/scrollbarWidth", [], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    function scrollbarWidth() {
        var outer = document.createElement("div");
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.msOverflowStyle = "scrollbar";
        document.body.appendChild(outer);
        var widthNoScroll = outer.offsetWidth;
        outer.style.overflow = "scroll";
        var inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);
        var widthWithScroll = inner.offsetWidth;
        outer.parentNode.removeChild(outer);
        return widthNoScroll - widthWithScroll;
    }
    exports_3("scrollbarWidth", scrollbarWidth);
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
System.register("models/SortDirection", [], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var SortDirection;
    return {
        setters:[],
        execute: function() {
            (function (SortDirection) {
                SortDirection[SortDirection["asc"] = 0] = "asc";
                SortDirection[SortDirection["desc"] = 1] = "desc";
            })(SortDirection || (SortDirection = {}));
            exports_4("SortDirection", SortDirection);
        }
    }
});
System.register("models/Sort", [], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var Sort;
    return {
        setters:[],
        execute: function() {
            Sort = (function () {
                function Sort(props) {
                    Object.assign(this, props);
                }
                return Sort;
            }());
            exports_5("Sort", Sort);
        }
    }
});
System.register("models/SortType", [], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var SortType;
    return {
        setters:[],
        execute: function() {
            (function (SortType) {
                SortType[SortType["single"] = 0] = "single";
                SortType[SortType["multi"] = 1] = "multi";
            })(SortType || (SortType = {}));
            exports_6("SortType", SortType);
        }
    }
});
System.register("utils/sort", ["models/SortType", "models/SortDirection"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var SortType_1, SortDirection_1;
    function nextSortDir(sortType, current) {
        if (sortType === SortType_1.SortType.single) {
            if (current === SortDirection_1.SortDirection.asc) {
                return SortDirection_1.SortDirection.desc;
            }
            else {
                return SortDirection_1.SortDirection.asc;
            }
        }
        else {
            if (!current) {
                return SortDirection_1.SortDirection.asc;
            }
            else if (current === SortDirection_1.SortDirection.asc) {
                return SortDirection_1.SortDirection.desc;
            }
            else if (currentSort === SortDirection_1.SortDirection.desc) {
                return undefined;
            }
        }
    }
    exports_7("nextSortDir", nextSortDir);
    function orderByComparator(a, b) {
        if (a === null || typeof a === 'undefined')
            a = 0;
        if (b === null || typeof b === 'undefined')
            b = 0;
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0;
    }
    exports_7("orderByComparator", orderByComparator);
    function sortRows(rows, dirs) {
        var temp = rows.slice();
        return temp.sort(function (a, b) {
            for (var _i = 0, dirs_1 = dirs; _i < dirs_1.length; _i++) {
                var _a = dirs_1[_i], prop = _a.prop, dir = _a.dir;
                var comparison = dir !== SortDirection_1.SortDirection.desc ?
                    orderByComparator(a[prop], b[prop]) :
                    -orderByComparator(a[prop], b[prop]);
                if (comparison !== 0)
                    return comparison;
            }
            return 0;
        });
    }
    exports_7("sortRows", sortRows);
    return {
        setters:[
            function (SortType_1_1) {
                SortType_1 = SortType_1_1;
            },
            function (SortDirection_1_1) {
                SortDirection_1 = SortDirection_1_1;
            }],
        execute: function() {
            ;
        }
    }
});
System.register("utils/id", [], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    function id() {
        return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
    }
    exports_8("id", id);
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
System.register("utils/camelCase", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function camelCase(str) {
        str = str.replace(/[^a-zA-Z0-9 ]/g, " ");
        str = str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
        str = str.replace(/([^a-zA-Z0-9 ])|^[0-9]+/g, '').trim().toLowerCase();
        str = str.replace(/([ 0-9]+)([a-zA-Z])/g, function (a, b, c) {
            return b.trim() + c.toUpperCase();
        });
        return str;
    }
    exports_9("camelCase", camelCase);
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
System.register("models/TableColumn", ["utils/id", "utils/camelCase"], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    var id_1, camelCase_1;
    var TableColumn;
    return {
        setters:[
            function (id_1_1) {
                id_1 = id_1_1;
            },
            function (camelCase_1_1) {
                camelCase_1 = camelCase_1_1;
            }],
        execute: function() {
            TableColumn = (function () {
                function TableColumn(props) {
                    this.$id = id_1.id();
                    this.frozenLeft = false;
                    this.frozenRight = false;
                    this.flexGrow = 0;
                    this.minWidth = 100;
                    this.maxWidth = undefined;
                    this.width = 150;
                    this.resizable = true;
                    this.comparator = undefined;
                    this.sortable = true;
                    this.draggable = true;
                    this.canAutoResize = true;
                    Object.assign(this, props);
                    if (!this.prop && this.name) {
                        this.prop = camelCase_1.camelCase(this.name);
                    }
                }
                return TableColumn;
            }());
            exports_10("TableColumn", TableColumn);
            ;
        }
    }
});
System.register("models/ColumnMode", [], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var ColumnMode;
    return {
        setters:[],
        execute: function() {
            (function (ColumnMode) {
                ColumnMode[ColumnMode["standard"] = 0] = "standard";
                ColumnMode[ColumnMode["flex"] = 1] = "flex";
                ColumnMode[ColumnMode["force"] = 2] = "force";
            })(ColumnMode || (ColumnMode = {}));
            exports_11("ColumnMode", ColumnMode);
        }
    }
});
System.register("models/SelectionType", [], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var SelectionType;
    return {
        setters:[],
        execute: function() {
            (function (SelectionType) {
                SelectionType[SelectionType["single"] = 0] = "single";
                SelectionType[SelectionType["multi"] = 1] = "multi";
                SelectionType[SelectionType["multiShift"] = 2] = "multiShift";
            })(SelectionType || (SelectionType = {}));
            exports_12("SelectionType", SelectionType);
        }
    }
});
System.register("models/TableOptions", ["models/ColumnMode", "models/SortType"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var ColumnMode_1, SortType_2;
    var TableOptions;
    return {
        setters:[
            function (ColumnMode_1_1) {
                ColumnMode_1 = ColumnMode_1_1;
            },
            function (SortType_2_1) {
                SortType_2 = SortType_2_1;
            }],
        execute: function() {
            TableOptions = (function () {
                function TableOptions(props) {
                    this.scrollbarV = true;
                    this.scrollbarH = true;
                    this.rowHeight = 30;
                    this.columnMode = ColumnMode_1.ColumnMode.standard;
                    this.loadingMessage = 'Loading...';
                    this.emptyMessage = 'No data to display';
                    this.headerHeight = 30;
                    this.footerHeight = 0;
                    this.externalPaging = false;
                    this.limit = undefined;
                    this.count = 0;
                    this.offset = 0;
                    this.loadingIndicator = false;
                    this.reorderable = true;
                    this.sortType = SortType_2.SortType.single;
                    this.sorts = [];
                    Object.assign(this, props);
                }
                return TableOptions;
            }());
            exports_13("TableOptions", TableOptions);
        }
    }
});
System.register("services/State", ['@angular/core', "utils/column", "utils/scrollbarWidth", "utils/sort", "models/Sort", "models/SortType"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
    var core_1, column_1, scrollbarWidth_1, sort_1, Sort_1, SortType_3;
    var StateService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (column_1_1) {
                column_1 = column_1_1;
            },
            function (scrollbarWidth_1_1) {
                scrollbarWidth_1 = scrollbarWidth_1_1;
            },
            function (sort_1_1) {
                sort_1 = sort_1_1;
            },
            function (Sort_1_1) {
                Sort_1 = Sort_1_1;
            },
            function (SortType_3_1) {
                SortType_3 = SortType_3_1;
            }],
        execute: function() {
            StateService = (function () {
                function StateService() {
                    this.onRowsUpdate = new core_1.EventEmitter();
                    this.onPageChange = new core_1.EventEmitter();
                    this.scrollbarWidth = scrollbarWidth_1.scrollbarWidth();
                    this.offsetX = 0;
                    this.offsetY = 0;
                    this.innerWidth = 0;
                    this.bodyHeight = 300;
                }
                Object.defineProperty(StateService.prototype, "columnsByPin", {
                    get: function () {
                        return column_1.columnsByPin(this.options.columns);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StateService.prototype, "columnGroupWidths", {
                    get: function () {
                        return column_1.columnGroupWidths(this.columnsByPin, this.options.columns);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StateService.prototype, "pageCount", {
                    get: function () {
                        if (!this.options.externalPaging) {
                            return this.rows.length;
                        }
                        return this.options.count;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StateService.prototype, "pageSize", {
                    get: function () {
                        if (this.options.scrollbarV)
                            return Math.ceil(this.bodyHeight / this.options.rowHeight) + 1;
                        return this.options.limit;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(StateService.prototype, "indexes", {
                    get: function () {
                        var first = 0, last = 0;
                        if (this.options.scrollbarV) {
                            first = Math.max(Math.floor((this.offsetY || 0) / this.options.rowHeight, 0), 0);
                            last = Math.min(first + this.pageSize, this.pageCount);
                        }
                        else {
                            first = Math.max(this.options.offset * this.options.limit, 0);
                            last = Math.min(first + this.pageSize, this.pageCount);
                        }
                        return { first: first, last: last };
                    },
                    enumerable: true,
                    configurable: true
                });
                StateService.prototype.setSelected = function (selected) {
                    this.selected = selected;
                    return this;
                };
                StateService.prototype.setRows = function (rows) {
                    this.rows = rows.slice();
                    this.onRowsUpdate.emit(rows);
                    return this;
                };
                StateService.prototype.setOptions = function (options) {
                    this.options = options;
                    return this;
                };
                StateService.prototype.setPage = function (page) {
                    this.options.offset = page - 1;
                    this.onPageChange.emit({
                        offset: this.options.offset,
                        limit: this.pageSize,
                        pageCount: this.pageCount
                    });
                };
                StateService.prototype.nextSort = function (column) {
                    var idx = this.options.sorts.findIndex(function (s) { return s.prop === column.prop; });
                    var curSort = this.options.sorts[idx];
                    var curDir = undefined;
                    if (curSort)
                        curDir = curSort.dir;
                    var dir = sort_1.nextSortDir(this.options.sortType, curDir);
                    if (dir === undefined) {
                        this.options.sorts.splice(idx, 1);
                    }
                    else if (curSort) {
                        this.options.sorts[idx].dir = dir;
                    }
                    else {
                        if (this.options.sortType === SortType_3.SortType.single) {
                            this.options.sorts.splice(0, this.options.sorts.length);
                        }
                        this.options.sorts.push(new Sort_1.Sort({ dir: dir, prop: column.prop }));
                    }
                    if (!column.comparator) {
                        this.setRows(sort_1.sortRows(this.rows, this.options.sorts));
                    }
                    else {
                        column.comparator(this.rows, this.options.sorts);
                    }
                };
                StateService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], StateService);
                return StateService;
            }());
            exports_14("StateService", StateService);
        }
    }
});
System.register("utils/VisibilityObserver", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var VisibilityObserver;
    return {
        setters:[],
        execute: function() {
            VisibilityObserver = (function () {
                function VisibilityObserver(element, callback) {
                    this.callback = callback;
                    if (window.IntersectionObserver) {
                        this.observer = new IntersectionObserver(this.processChanges.bind(this), { threshold: [0.5] });
                        this.observer.observe(element);
                    }
                    else {
                        this.runPolyfill(element);
                    }
                }
                VisibilityObserver.prototype.runPolyfill = function (element) {
                    var _this = this;
                    var checkVisibility = function () {
                        var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height;
                        if (width && height) {
                            _this.callback && _this.callback();
                        }
                        else {
                            setTimeout(function () { return checkVisibility(); }, 10);
                        }
                    };
                    checkVisibility();
                };
                VisibilityObserver.prototype.isVisible = function (boundingClientRect, intersectionRect) {
                    return ((intersectionRect.width * intersectionRect.height) /
                        (boundingClientRect.width * boundingClientRect.height) >= 0.5);
                };
                VisibilityObserver.prototype.visibleTimerCallback = function (element, observer) {
                    delete element.visibleTimeout;
                    this.processChanges(observer.takeRecords());
                    if ('isVisible' in element) {
                        delete element.isVisible;
                        this.callback && this.callback();
                        observer.unobserve(element);
                    }
                };
                VisibilityObserver.prototype.processChanges = function (changes) {
                    var _this = this;
                    changes.forEach(function (changeRecord) {
                        var element = changeRecord.target;
                        element.isVisible = _this.isVisible(changeRecord.boundingClientRect, changeRecord.intersectionRect);
                        if ('isVisible' in element) {
                            element.visibleTimeout = setTimeout(_this.visibleTimerCallback.bind(_this), 1000, element, _this.observer);
                        }
                        else {
                            if ('visibleTimeout' in element) {
                                clearTimeout(element.visibleTimeout);
                                delete element.visibleTimeout;
                            }
                        }
                    });
                };
                return VisibilityObserver;
            }());
            exports_15("VisibilityObserver", VisibilityObserver);
        }
    }
});
System.register("directives/Visibility", ['@angular/core', "utils/VisibilityObserver"], function(exports_16, context_16) {
    "use strict";
    var __moduleName = context_16 && context_16.id;
    var core_2, VisibilityObserver_1;
    var Visibility;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (VisibilityObserver_1_1) {
                VisibilityObserver_1 = VisibilityObserver_1_1;
            }],
        execute: function() {
            Visibility = (function () {
                function Visibility(element) {
                    this.visible = false;
                    this.onVisibilityChange = new core_2.EventEmitter();
                    new VisibilityObserver_1.VisibilityObserver(element.nativeElement, this.visbilityChange.bind(this));
                }
                Visibility.prototype.visbilityChange = function () {
                    this.visible = true;
                    this.onVisibilityChange.emit(true);
                };
                __decorate([
                    core_2.HostBinding('class.visible'), 
                    __metadata('design:type', Object)
                ], Visibility.prototype, "visible", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', Object)
                ], Visibility.prototype, "onVisibilityChange", void 0);
                Visibility = __decorate([
                    core_2.Directive({ selector: '[visibility-observer]' }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_2.ElementRef !== 'undefined' && core_2.ElementRef) === 'function' && _a) || Object])
                ], Visibility);
                return Visibility;
                var _a;
            }());
            exports_16("Visibility", Visibility);
        }
    }
});
System.register("utils/math", ["utils/column"], function(exports_17, context_17) {
    "use strict";
    var __moduleName = context_17 && context_17.id;
    var column_2;
    function columnTotalWidth(columns, prop) {
        var totalWidth = 0;
        for (var _i = 0, allColumns_1 = allColumns; _i < allColumns_1.length; _i++) {
            var column = allColumns_1[_i];
            var has = prop && column[prop];
            totalWidth = totalWidth + (has ? column[prop] : column.width);
        }
        return totalWidth;
    }
    exports_17("columnTotalWidth", columnTotalWidth);
    function getTotalFlexGrow(columns) {
        var totalFlexGrow = 0;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var c = columns_1[_i];
            totalFlexGrow += c.flexGrow || 0;
        }
        return totalFlexGrow;
    }
    exports_17("getTotalFlexGrow", getTotalFlexGrow);
    function adjustColumnWidths(allColumns, expectedWidth) {
        var columnsWidth = columnTotalWidth(allColumns), totalFlexGrow = getTotalFlexGrow(allColumns), colsByGroup = column_2.columnsByPin(allColumns);
        if (columnsWidth !== expectedWidth) {
            scaleColumns(colsByGroup, expectedWidth, totalFlexGrow);
        }
    }
    exports_17("adjustColumnWidths", adjustColumnWidths);
    function scaleColumns(colsByGroup, maxWidth, totalFlexGrow) {
        for (var attr in colsByGroup) {
            for (var _i = 0, _a = colsByGroup[attr]; _i < _a.length; _i++) {
                var column = _a[_i];
                if (!column.canAutoResize) {
                    maxWidth -= column.width;
                    totalFlexGrow -= column.flexGrow;
                }
                else {
                    column.width = 0;
                }
            }
        }
        var hasMinWidth = {};
        var remainingWidth = maxWidth;
        do {
            var widthPerFlexPoint = remainingWidth / totalFlexGrow;
            remainingWidth = 0;
            for (var attr in colsByGroup) {
                for (var _b = 0, _c = colsByGroup[attr]; _b < _c.length; _b++) {
                    var column = _c[_b];
                    if (column.canAutoResize && !hasMinWidth[column.prop]) {
                        var newWidth = column.width + column.flexGrow * widthPerFlexPoint;
                        if (column.minWidth !== undefined && newWidth < column.minWidth) {
                            remainingWidth += newWidth - column.minWidth;
                            column.width = column.minWidth;
                            hasMinWidth[column.prop] = true;
                        }
                        else {
                            column.width = newWidth;
                        }
                    }
                }
            }
        } while (remainingWidth !== 0);
    }
    function forceFillColumnWidths(allColumns, expectedWidth, startIdx) {
        var contentWidth = 0, columnsToResize = startIdx > -1 ?
            allColumns.slice(startIdx, allColumns.length).filter(function (c) { return c.canAutoResize; }) :
            allColumns.filter(function (c) { return c.canAutoResize; });
        for (var _i = 0, allColumns_2 = allColumns; _i < allColumns_2.length; _i++) {
            var column = allColumns_2[_i];
            if (!column.canAutoResize) {
                contentWidth += column.width;
            }
            else {
                contentWidth += (column.$$oldWidth || column.width);
            }
        }
        var remainingWidth = expectedWidth - contentWidth, additionWidthPerColumn = remainingWidth / columnsToResize.length, exceedsWindow = contentWidth > expectedWidth;
        for (var _a = 0, columnsToResize_1 = columnsToResize; _a < columnsToResize_1.length; _a++) {
            var column = columnsToResize_1[_a];
            if (exceedsWindow) {
                column.width = column.$$oldWidth || column.width;
            }
            else {
                if (!column.$$oldWidth) {
                    column.$$oldWidth = column.width;
                }
                var newSize = column.$$oldWidth + additionWidthPerColumn;
                if (column.minWith && newSize < column.minWidth) {
                    column.width = column.minWidth;
                }
                else if (column.maxWidth && newSize > column.maxWidth) {
                    column.width = column.maxWidth;
                }
                else {
                    column.width = newSize;
                }
            }
        }
    }
    exports_17("forceFillColumnWidths", forceFillColumnWidths);
    return {
        setters:[
            function (column_2_1) {
                column_2 = column_2_1;
            }],
        execute: function() {
        }
    }
});
System.register("directives/LongPress", ['@angular/core'], function(exports_18, context_18) {
    "use strict";
    var __moduleName = context_18 && context_18.id;
    var core_3;
    var LongPress;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            }],
        execute: function() {
            LongPress = (function () {
                function LongPress() {
                    this.duration = 500;
                    this.onLongPress = new core_3.EventEmitter();
                    this.onLongPressing = new core_3.EventEmitter();
                    this.onLongPressEnd = new core_3.EventEmitter();
                }
                Object.defineProperty(LongPress.prototype, "press", {
                    get: function () { return this._pressing; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(LongPress.prototype, "longPress", {
                    get: function () { return this._longPressing; },
                    enumerable: true,
                    configurable: true
                });
                LongPress.prototype.onMouseDown = function (event) {
                    var _this = this;
                    this._pressing = true;
                    this._longPressing = false;
                    this._timeout = setTimeout(function () {
                        _this._longPressing = true;
                        _this.onLongPress.emit(event);
                        _this._interval = setInterval(function () {
                            _this.onLongPressing.emit(event);
                        }, 50);
                    }, this.duration);
                };
                LongPress.prototype.endPress = function () {
                    clearTimeout(this._timeout);
                    clearInterval(this._interval);
                    this._longPressing = false;
                    this._pressing = false;
                    this.onLongPressEnd.emit();
                };
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Number)
                ], LongPress.prototype, "duration", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', Object)
                ], LongPress.prototype, "onLongPress", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', Object)
                ], LongPress.prototype, "onLongPressing", void 0);
                __decorate([
                    core_3.Output(), 
                    __metadata('design:type', Object)
                ], LongPress.prototype, "onLongPressEnd", void 0);
                __decorate([
                    core_3.HostBinding('class.press'), 
                    __metadata('design:type', Object)
                ], LongPress.prototype, "press", null);
                __decorate([
                    core_3.HostBinding('class.longpress'), 
                    __metadata('design:type', Object)
                ], LongPress.prototype, "longPress", null);
                __decorate([
                    core_3.HostListener('mousedown', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], LongPress.prototype, "onMouseDown", null);
                __decorate([
                    core_3.HostListener('mouseup'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], LongPress.prototype, "endPress", null);
                LongPress = __decorate([
                    core_3.Directive({ selector: '[long-press]' }), 
                    __metadata('design:paramtypes', [])
                ], LongPress);
                return LongPress;
            }());
            exports_18("LongPress", LongPress);
        }
    }
});
System.register("directives/Draggable", ['@angular/core', 'rxjs'], function(exports_19, context_19) {
    "use strict";
    var __moduleName = context_19 && context_19.id;
    var core_4, rxjs_1;
    var Draggable;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (rxjs_1_1) {
                rxjs_1 = rxjs_1_1;
            }],
        execute: function() {
            Draggable = (function () {
                function Draggable(element) {
                    this.dragX = true;
                    this.dragY = true;
                    this.onDragStart = new core_4.EventEmitter();
                    this.onDragging = new core_4.EventEmitter();
                    this.onDragEnd = new core_4.EventEmitter();
                    this.dragging = false;
                    this.element = element.nativeElement;
                }
                Draggable.prototype.onMouseup = function (event) {
                    this.dragging = false;
                    if (this.subscription) {
                        this.subscription.unsubscribe();
                        this.onDragEnd.emit({
                            event: event,
                            element: this.element,
                            model: this.model
                        });
                    }
                };
                Draggable.prototype.onMousedown = function (event) {
                    var _this = this;
                    if (event.target.classList.contains('draggable')) {
                        event.preventDefault();
                        this.dragging = true;
                        var mouseDownPos_1 = { x: event.clientX, y: event.clientY };
                        this.subscription = rxjs_1.Observable.fromEvent(document, 'mousemove')
                            .subscribe(function (event) { return _this.move(event, mouseDownPos_1); });
                        this.onDragStart.emit({
                            event: event,
                            element: this.element,
                            model: this.model
                        });
                    }
                };
                Draggable.prototype.move = function (event, mouseDownPos) {
                    if (!this.dragging)
                        return;
                    var x = event.clientX - mouseDownPos.x;
                    var y = event.clientY - mouseDownPos.y;
                    if (this.dragX)
                        this.element.style.left = x + "px";
                    if (this.dragY)
                        this.element.style.top = y + "px";
                    if (this.dragX || this.dragY) {
                        this.onDragging.emit({
                            event: event,
                            element: this.element,
                            model: this.model
                        });
                    }
                };
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Object)
                ], Draggable.prototype, "model", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Object)
                ], Draggable.prototype, "dragX", void 0);
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', Object)
                ], Draggable.prototype, "dragY", void 0);
                __decorate([
                    core_4.Output(), 
                    __metadata('design:type', Object)
                ], Draggable.prototype, "onDragStart", void 0);
                __decorate([
                    core_4.Output(), 
                    __metadata('design:type', Object)
                ], Draggable.prototype, "onDragging", void 0);
                __decorate([
                    core_4.Output(), 
                    __metadata('design:type', Object)
                ], Draggable.prototype, "onDragEnd", void 0);
                __decorate([
                    core_4.HostListener('document:mouseup', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Draggable.prototype, "onMouseup", null);
                __decorate([
                    core_4.HostListener('mousedown', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Draggable.prototype, "onMousedown", null);
                Draggable = __decorate([
                    core_4.Directive({ selector: '[draggable]' }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_4.ElementRef !== 'undefined' && core_4.ElementRef) === 'function' && _a) || Object])
                ], Draggable);
                return Draggable;
                var _a;
            }());
            exports_19("Draggable", Draggable);
        }
    }
});
System.register("directives/Resizable", ['@angular/core', 'rxjs'], function(exports_20, context_20) {
    "use strict";
    var __moduleName = context_20 && context_20.id;
    var core_5, rxjs_2;
    var Resizable;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (rxjs_2_1) {
                rxjs_2 = rxjs_2_1;
            }],
        execute: function() {
            Resizable = (function () {
                function Resizable(element) {
                    this.resizeEnabled = true;
                    this.onResize = new core_5.EventEmitter();
                    this.prevScreenX = 0;
                    this.resizing = false;
                    this.element = element.nativeElement;
                    if (this.resizeEnabled) {
                        var node = document.createElement('span');
                        node.classList.add('resize-handle');
                        this.element.appendChild(node);
                    }
                }
                Resizable.prototype.onMouseup = function (event) {
                    this.resizing = false;
                    if (this.subcription) {
                        this.subcription.unsubscribe();
                        this.onResize.emit(this.element.clientWidth);
                    }
                };
                Resizable.prototype.onMousedown = function (event) {
                    var _this = this;
                    var isHandle = event.target.classList.contains('resize-handle');
                    if (isHandle) {
                        event.stopPropagation();
                        this.resizing = true;
                        this.subcription = rxjs_2.Observable.fromEvent(document, 'mousemove')
                            .subscribe(function (event) { return _this.move(event); });
                    }
                };
                Resizable.prototype.move = function (event) {
                    var movementX = event.movementX || event.mozMovementX || (event.screenX - this.prevScreenX);
                    var width = this.element.clientWidth;
                    var newWidth = width + (movementX || 0);
                    this.prevScreenX = event.screenX;
                    var overMinWidth = !this.minWidth || newWidth >= this.minWidth;
                    var underMaxWidth = !this.maxWidth || newWidth <= this.maxWidth;
                    if (overMinWidth && underMaxWidth) {
                        this.element.style.width = newWidth + "px";
                    }
                };
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Object)
                ], Resizable.prototype, "resizeEnabled", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Object)
                ], Resizable.prototype, "minWidth", void 0);
                __decorate([
                    core_5.Input(), 
                    __metadata('design:type', Object)
                ], Resizable.prototype, "maxWidth", void 0);
                __decorate([
                    core_5.Output(), 
                    __metadata('design:type', Object)
                ], Resizable.prototype, "onResize", void 0);
                __decorate([
                    core_5.HostListener('document:mouseup', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Resizable.prototype, "onMouseup", null);
                __decorate([
                    core_5.HostListener('mousedown', ['$event']), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', [Object]), 
                    __metadata('design:returntype', void 0)
                ], Resizable.prototype, "onMousedown", null);
                Resizable = __decorate([
                    core_5.Directive({
                        selector: '[resizable]',
                        host: {
                            '[class.resizable]': 'resizeEnabled'
                        }
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_5.ElementRef !== 'undefined' && core_5.ElementRef) === 'function' && _a) || Object])
                ], Resizable);
                return Resizable;
                var _a;
            }());
            exports_20("Resizable", Resizable);
        }
    }
});
System.register("directives/Orderable", ['@angular/core', "directives/Draggable"], function(exports_21, context_21) {
    "use strict";
    var __moduleName = context_21 && context_21.id;
    var core_6, Draggable_1;
    var Orderable;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (Draggable_1_1) {
                Draggable_1 = Draggable_1_1;
            }],
        execute: function() {
            Orderable = (function () {
                function Orderable() {
                    this.onReorder = new core_6.EventEmitter();
                }
                Orderable.prototype.ngAfterContentInit = function () {
                    var _this = this;
                    this.drags.forEach(function (d) {
                        return d.onDragStart.subscribe(_this.onDragStart.bind(_this)) &&
                            d.onDragEnd.subscribe(_this.onDragEnd.bind(_this));
                    });
                };
                Orderable.prototype.onDragStart = function () {
                    this.positions = {};
                    var i = 0;
                    for (var _i = 0, _a = this.drags.toArray(); _i < _a.length; _i++) {
                        var dragger = _a[_i];
                        var elm = dragger.element;
                        this.positions[dragger.model.prop] = {
                            left: parseInt(elm.offsetLeft),
                            index: i++
                        };
                    }
                };
                Orderable.prototype.onDragEnd = function (_a) {
                    var element = _a.element, model = _a.model;
                    var newPos = parseInt(element.offsetLeft);
                    var prevPos = this.positions[model.prop];
                    var i = 0;
                    for (var prop in this.positions) {
                        var pos = this.positions[prop];
                        var movedLeft = newPos < pos.left && prevPos.left > pos.left;
                        var movedRight = newPos > pos.left && prevPos.left < pos.left;
                        if (movedLeft || movedRight) {
                            this.onReorder.emit({
                                prevIndex: prevPos.index,
                                newIndex: i,
                                model: model
                            });
                        }
                        i++;
                    }
                    element.style.left = 'auto';
                };
                __decorate([
                    core_6.Output(), 
                    __metadata('design:type', Object)
                ], Orderable.prototype, "onReorder", void 0);
                __decorate([
                    core_6.ContentChildren(Draggable_1.Draggable), 
                    __metadata('design:type', Object)
                ], Orderable.prototype, "drags", void 0);
                Orderable = __decorate([
                    core_6.Directive({
                        selector: '[orderable]'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Orderable);
                return Orderable;
            }());
            exports_21("Orderable", Orderable);
        }
    }
});
System.register("components/header/HeaderCell", ['@angular/core', "services/State", "models/TableColumn", "models/SortDirection"], function(exports_22, context_22) {
    "use strict";
    var __moduleName = context_22 && context_22.id;
    var core_7, State_1, TableColumn_1, SortDirection_2;
    var DataTableHeaderCell;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (State_1_1) {
                State_1 = State_1_1;
            },
            function (TableColumn_1_1) {
                TableColumn_1 = TableColumn_1_1;
            },
            function (SortDirection_2_1) {
                SortDirection_2 = SortDirection_2_1;
            }],
        execute: function() {
            DataTableHeaderCell = (function () {
                function DataTableHeaderCell(element, state) {
                    this.element = element;
                    this.state = state;
                    element.nativeElement.classList.add('datatable-header-cell');
                }
                Object.defineProperty(DataTableHeaderCell.prototype, "sortDir", {
                    get: function () {
                        var _this = this;
                        var sort = this.state.options.sorts.find(function (s) {
                            return s.prop === _this.model.prop;
                        });
                        if (sort)
                            return sort.dir;
                    },
                    enumerable: true,
                    configurable: true
                });
                DataTableHeaderCell.prototype.sortClasses = function (sort) {
                    var dir = this.sortDir;
                    return {
                        'sort-asc icon-down': dir === SortDirection_2.SortDirection.asc,
                        'sort-desc icon-up': dir === SortDirection_2.SortDirection.desc
                    };
                };
                DataTableHeaderCell.prototype.onSort = function () {
                    if (this.model.sortable) {
                        this.state.nextSort(this.model);
                    }
                };
                __decorate([
                    core_7.Input(), 
                    __metadata('design:type', TableColumn_1.TableColumn)
                ], DataTableHeaderCell.prototype, "model", void 0);
                DataTableHeaderCell = __decorate([
                    core_7.Component({
                        selector: 'datatable-header-cell',
                        template: "\n  \t<div>\n      <span\n        class=\"datatable-header-cell-label draggable\"\n        (click)=\"onSort()\"\n        [innerHTML]=\"model.name\">\n      </span>\n      <span\n        class=\"sort-btn\"\n        [ngClass]=\"sortClasses()\">\n      </span>\n    </div>\n  ",
                        directives: [],
                        host: {
                            '[class.sortable]': 'model.sortable',
                            '[class.resizable]': 'model.resizable',
                            '[style.width]': 'model.width',
                            '[style.minWidth]': 'model.minWidth',
                            '[style.maxWidth]': 'model.maxWidth',
                            '[style.height]': 'model.height',
                            '[attr.title]': 'model.name'
                        }
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_7.ElementRef !== 'undefined' && core_7.ElementRef) === 'function' && _a) || Object, State_1.StateService])
                ], DataTableHeaderCell);
                return DataTableHeaderCell;
                var _a;
            }());
            exports_22("DataTableHeaderCell", DataTableHeaderCell);
        }
    }
});
System.register("components/header/Header", ['@angular/core', "services/State", "directives/LongPress", "directives/Draggable", "directives/Resizable", "directives/Orderable", "components/header/HeaderCell"], function(exports_23, context_23) {
    "use strict";
    var __moduleName = context_23 && context_23.id;
    var core_8, State_2, LongPress_1, Draggable_2, Resizable_1, Orderable_1, HeaderCell_1;
    var DataTableHeader;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (State_2_1) {
                State_2 = State_2_1;
            },
            function (LongPress_1_1) {
                LongPress_1 = LongPress_1_1;
            },
            function (Draggable_2_1) {
                Draggable_2 = Draggable_2_1;
            },
            function (Resizable_1_1) {
                Resizable_1 = Resizable_1_1;
            },
            function (Orderable_1_1) {
                Orderable_1 = Orderable_1_1;
            },
            function (HeaderCell_1_1) {
                HeaderCell_1 = HeaderCell_1_1;
            }],
        execute: function() {
            DataTableHeader = (function () {
                function DataTableHeader(state, elm) {
                    this.state = state;
                    elm.nativeElement.classList.add('datatable-header');
                }
                DataTableHeader.prototype.columnResized = function (width, column) {
                    column.width = width;
                };
                DataTableHeader.prototype.columnReordered = function (_a) {
                    var prevIndex = _a.prevIndex, newIndex = _a.newIndex, model = _a.model;
                    this.state.options.columns.splice(prevIndex, 1);
                    this.state.options.columns.splice(newIndex, 0, model);
                };
                DataTableHeader = __decorate([
                    core_8.Component({
                        selector: 'datatable-header',
                        template: "\n  \t<div\n      [style.width]=\"state.columnGroupWidths.total\"\n      class=\"datatable-header-inner\"\n      orderable\n      (onReorder)=\"columnReordered($event)\">\n      <div\n        class=\"datatable-row-left\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.left\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"draggable = true\"\n          (onLongPressEnd)=\"draggable = false\"\n          draggable\n          [dragX]=\"column.draggable && draggable\"\n          [dragY]=\"false\"\n          [model]=\"column\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-center\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.center\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"draggable = true\"\n          (onLongPressEnd)=\"draggable = false\"\n          draggable\n          [dragX]=\"column.draggable && draggable\"\n          [dragY]=\"false\"\n          [model]=\"column\">\n        </datatable-header-cell>\n      </div>\n      <div\n        class=\"datatable-row-right\">\n        <datatable-header-cell\n          *ngFor=\"let column of state.columnsByPin.right\"\n          resizable\n          [resizeEnabled]=\"column.resizable\"\n          (onResize)=\"columnResized($event, column)\"\n          long-press\n          (onLongPress)=\"draggable = true\"\n          (onLongPressEnd)=\"draggable = false\"\n          draggable\n          [dragX]=\"column.draggable && draggable\"\n          [dragY]=\"false\"\n          [model]=\"column\">\n        </datatable-header-cell>\n      </div>\n    </div>\n  ",
                        directives: [
                            HeaderCell_1.DataTableHeaderCell,
                            Draggable_2.Draggable,
                            Resizable_1.Resizable,
                            Orderable_1.Orderable,
                            LongPress_1.LongPress
                        ],
                        host: {
                            '[style.width]': 'state.innerWidth',
                            '[style.height]': 'state.options.headerHeight'
                        }
                    }), 
                    __metadata('design:paramtypes', [State_2.StateService, (typeof (_a = typeof core_8.ElementRef !== 'undefined' && core_8.ElementRef) === 'function' && _a) || Object])
                ], DataTableHeader);
                return DataTableHeader;
                var _a;
            }());
            exports_23("DataTableHeader", DataTableHeader);
        }
    }
});
System.register("components/body/ProgressBar", ['@angular/core'], function(exports_24, context_24) {
    "use strict";
    var __moduleName = context_24 && context_24.id;
    var core_9;
    var ProgressBar;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            }],
        execute: function() {
            ProgressBar = (function () {
                function ProgressBar() {
                }
                ProgressBar = __decorate([
                    core_9.Component({
                        selector: 'datatable-progress',
                        template: "\n    <div\n      class=\"progress-linear\"\n      role=\"progressbar\">\n      <div class=\"container\">\n        <div class=\"bar\"></div>\n      </div>\n    </div>\n  ",
                        directives: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProgressBar);
                return ProgressBar;
            }());
            exports_24("ProgressBar", ProgressBar);
        }
    }
});
System.register("utils/deepGetter", [], function(exports_25, context_25) {
    "use strict";
    var __moduleName = context_25 && context_25.id;
    function deepValueGetter(obj, path) {
        if (!obj || !path)
            return obj;
        var current = obj, split = path.split('.');
        if (split.length) {
            for (var i = 0, len = split.length; i < len; i++) {
                current = current[split[i]];
            }
        }
        return current;
    }
    exports_25("deepValueGetter", deepValueGetter);
    return {
        setters:[],
        execute: function() {
            ;
        }
    }
});
System.register("components/body/BodyCell", ['@angular/core', "utils/deepGetter"], function(exports_26, context_26) {
    "use strict";
    var __moduleName = context_26 && context_26.id;
    var core_10, deepGetter_1;
    var DataTableBodyCell;
    return {
        setters:[
            function (core_10_1) {
                core_10 = core_10_1;
            },
            function (deepGetter_1_1) {
                deepGetter_1 = deepGetter_1_1;
            }],
        execute: function() {
            DataTableBodyCell = (function () {
                function DataTableBodyCell(elm) {
                    elm.nativeElement.classList.add('datatable-body-cell');
                }
                Object.defineProperty(DataTableBodyCell.prototype, "rowValue", {
                    get: function () {
                        if (!this.row)
                            return '';
                        return deepGetter_1.deepValueGetter(this.row, this.column.prop);
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_10.Input(), 
                    __metadata('design:type', Object)
                ], DataTableBodyCell.prototype, "column", void 0);
                __decorate([
                    core_10.Input(), 
                    __metadata('design:type', Object)
                ], DataTableBodyCell.prototype, "row", void 0);
                DataTableBodyCell = __decorate([
                    core_10.Component({
                        selector: 'datatable-body-cell',
                        template: "\n  \t<div class=\"datatable-body-cell-label\">\n      <span [innerHTML]=\"rowValue\"></span>\n    </div>\n  ",
                        directives: [],
                        host: {
                            '[style.width]': 'column.width',
                            '[style.height]': 'column.height'
                        }
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_10.ElementRef !== 'undefined' && core_10.ElementRef) === 'function' && _a) || Object])
                ], DataTableBodyCell);
                return DataTableBodyCell;
                var _a;
            }());
            exports_26("DataTableBodyCell", DataTableBodyCell);
        }
    }
});
System.register("components/body/BodyRow", ['@angular/core', "services/State", "components/body/BodyCell"], function(exports_27, context_27) {
    "use strict";
    var __moduleName = context_27 && context_27.id;
    var core_11, State_3, BodyCell_1;
    var DataTableBodyRow;
    return {
        setters:[
            function (core_11_1) {
                core_11 = core_11_1;
            },
            function (State_3_1) {
                State_3 = State_3_1;
            },
            function (BodyCell_1_1) {
                BodyCell_1 = BodyCell_1_1;
            }],
        execute: function() {
            DataTableBodyRow = (function () {
                function DataTableBodyRow(state, elm) {
                    this.state = state;
                    elm.nativeElement.classList.add('datatable-body-row');
                }
                __decorate([
                    core_11.Input(), 
                    __metadata('design:type', Object)
                ], DataTableBodyRow.prototype, "row", void 0);
                DataTableBodyRow = __decorate([
                    core_11.Component({
                        selector: 'datatable-body-row',
                        template: "\n  \t<div>\n      <div class=\"datatable-row-left\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.left\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div class=\"datatable-row-center\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.center\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n      <div class=\"datatable-row-right\">\n        <datatable-body-cell\n          *ngFor=\"let column of state.columnsByPin.right\"\n          [row]=\"row\"\n          [column]=\"column\">\n        </datatable-body-cell>\n      </div>\n    </div>\n  ",
                        directives: [BodyCell_1.DataTableBodyCell]
                    }), 
                    __metadata('design:paramtypes', [State_3.StateService, (typeof (_a = typeof core_11.ElementRef !== 'undefined' && core_11.ElementRef) === 'function' && _a) || Object])
                ], DataTableBodyRow);
                return DataTableBodyRow;
                var _a;
            }());
            exports_27("DataTableBodyRow", DataTableBodyRow);
        }
    }
});
System.register("components/body/Scroll", ['@angular/core'], function(exports_28, context_28) {
    "use strict";
    var __moduleName = context_28 && context_28.id;
    var core_12;
    var DataTableScroll;
    return {
        setters:[
            function (core_12_1) {
                core_12 = core_12_1;
            }],
        execute: function() {
            DataTableScroll = (function () {
                function DataTableScroll(elm) {
                    elm.nativeElement.classList.add('datatable-scroll');
                }
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Number)
                ], DataTableScroll.prototype, "rowHeight", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Number)
                ], DataTableScroll.prototype, "count", void 0);
                __decorate([
                    core_12.Input(), 
                    __metadata('design:type', Number)
                ], DataTableScroll.prototype, "scrollWidth", void 0);
                DataTableScroll = __decorate([
                    core_12.Component({
                        selector: 'datatable-scroll',
                        template: "\n    <ng-content></ng-content>\n  ",
                        host: {
                            '[style.height]': 'count * rowHeight',
                            '[style.width]': 'scrollWidth'
                        }
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_12.ElementRef !== 'undefined' && core_12.ElementRef) === 'function' && _a) || Object])
                ], DataTableScroll);
                return DataTableScroll;
                var _a;
            }());
            exports_28("DataTableScroll", DataTableScroll);
        }
    }
});
System.register("utils/keys", [], function(exports_29, context_29) {
    "use strict";
    var __moduleName = context_29 && context_29.id;
    var Keys;
    return {
        setters:[],
        execute: function() {
            (function (Keys) {
                Keys[Keys["up"] = 38] = "up";
                Keys[Keys["down"] = 40] = "down";
                Keys[Keys["return"] = 13] = "return";
                Keys[Keys["escape"] = 27] = "escape";
            })(Keys || (Keys = {}));
            exports_29("Keys", Keys);
        }
    }
});
System.register("utils/selection", [], function(exports_30, context_30) {
    "use strict";
    var __moduleName = context_30 && context_30.id;
    function selectRows(selected, row) {
        var selectedIndex = selected.indexOf(row);
        if (selectedIndex > -1) {
            selected.splice(selectedIndex, 1);
        }
        else {
            selected.push(row);
        }
        return selected;
    }
    exports_30("selectRows", selectRows);
    function selectRowsBetween(selected, rows, index, prevIndex) {
        var reverse = index < prevIndex;
        for (var i = 0, len = rows.length; i < len; i++) {
            var row = rows[i];
            var greater = i >= prevIndex && i <= index;
            var lesser = i <= prevIndex && i >= index;
            var range = {};
            if (reverse) {
                range = {
                    start: index,
                    end: (prevIndex - index)
                };
            }
            else {
                range = {
                    start: prevIndex,
                    end: index + 1
                };
            }
            if ((reverse && lesser) || (!reverse && greater)) {
                var idx = selected.indexOf(row);
                if (reverse && idx > -1) {
                    selected.splice(idx, 1);
                    continue;
                }
                if (i >= range.start && i < range.end) {
                    if (idx === -1) {
                        selected.push(row);
                    }
                }
            }
        }
        return selected;
    }
    exports_30("selectRowsBetween", selectRowsBetween);
    return {
        setters:[],
        execute: function() {
        }
    }
});
System.register("components/body/Body", ['@angular/core', "components/body/ProgressBar", "components/body/BodyRow", "components/body/Scroll", "services/State", "models/SelectionType", "utils/keys", "utils/selection"], function(exports_31, context_31) {
    "use strict";
    var __moduleName = context_31 && context_31.id;
    var core_13, ProgressBar_1, BodyRow_1, Scroll_1, State_4, SelectionType_1, Keys_1, selection_1;
    var DataTableBody;
    return {
        setters:[
            function (core_13_1) {
                core_13 = core_13_1;
            },
            function (ProgressBar_1_1) {
                ProgressBar_1 = ProgressBar_1_1;
            },
            function (BodyRow_1_1) {
                BodyRow_1 = BodyRow_1_1;
            },
            function (Scroll_1_1) {
                Scroll_1 = Scroll_1_1;
            },
            function (State_4_1) {
                State_4 = State_4_1;
            },
            function (SelectionType_1_1) {
                SelectionType_1 = SelectionType_1_1;
            },
            function (Keys_1_1) {
                Keys_1 = Keys_1_1;
            },
            function (selection_1_1) {
                selection_1 = selection_1_1;
            }],
        execute: function() {
            DataTableBody = (function () {
                function DataTableBody(state, elm) {
                    this.state = state;
                    this.onRowClick = new core_13.EventEmitter();
                    this.onRowSelect = new core_13.EventEmitter();
                    this.showProgress = true;
                    elm.nativeElement.classList.add('datatable-body');
                }
                Object.defineProperty(DataTableBody.prototype, "selectEnabled", {
                    get: function () {
                        return this.state.options.selectionType !== undefined;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataTableBody.prototype, "bodyHeight", {
                    get: function () {
                        if (this.state.options.scrollbarV)
                            return this.state.bodyHeight;
                        return 'auto';
                    },
                    enumerable: true,
                    configurable: true
                });
                DataTableBody.prototype.ngOnInit = function () {
                    var _this = this;
                    this.rows = this.state.rows.slice();
                    this.state.onPageChange.subscribe(function (page) {
                        var _a = _this.state.indexes, first = _a.first, last = _a.last;
                        _this.rows = _this.state.rows.slice(first, last);
                        setTimeout(function () { return _this.showProgress = false; }, 500);
                    });
                    this.state.onRowsUpdate.subscribe(function (rows) {
                        var _a = _this.state.indexes, first = _a.first, last = _a.last;
                        _this.rows = rows.slice(first, last);
                        setTimeout(function () { return _this.showProgress = false; }, 500);
                    });
                };
                DataTableBody.prototype.rowClicked = function (event, index, row) {
                    this.onRowClick.emit({ event: event, row: row });
                    this.selectRow(event, index, row);
                };
                DataTableBody.prototype.rowKeydown = function (event, index, row) {
                    if (event.keyCode === Keys_1.Keys.return && this.selectEnabled) {
                        this.selectRow(event, index, row);
                    }
                    else if (event.keyCode === Keys_1.Keys.up || event.keyCode === Keys_1.Keys.down) {
                        var dom = event.keyCode === Keys_1.Keys.up ?
                            event.target.previousElementSibling :
                            event.target.nextElementSibling;
                        if (dom)
                            dom.focus();
                    }
                };
                DataTableBody.prototype.selectRow = function (event, index, row) {
                    if (!this.selectEnabled)
                        return;
                    var multiShift = this.state.options.selectionType === SelectionType_1.SelectionType.multiShift;
                    var multiClick = this.state.options.selectionType === SelectionType_1.SelectionType.multi;
                    var selections = [];
                    if (multiShift || multiClick) {
                        if (multiShift && event.shiftKey) {
                            var selected = this.state.selected.slice();
                            selections = selection_1.selectRowsBetween(selected, this.rows, index, this.prevIndex);
                        }
                        else if (multiShift && !event.shiftKey) {
                            selections.push(row);
                        }
                        else {
                            var selected = this.state.selected.slice();
                            selections = selection_1.selectRows(selected, row);
                        }
                    }
                    else {
                        selections.push(row);
                    }
                    this.prevIndex = index;
                    this.onRowSelect.emit(selections);
                };
                __decorate([
                    core_13.Output(), 
                    __metadata('design:type', Object)
                ], DataTableBody.prototype, "onRowClick", void 0);
                __decorate([
                    core_13.Output(), 
                    __metadata('design:type', Object)
                ], DataTableBody.prototype, "onRowSelect", void 0);
                DataTableBody = __decorate([
                    core_13.Component({
                        selector: 'datatable-body',
                        template: "\n    <div>\n      <datatable-progress></datatable-progress>\n      <datatable-scroll\n        [rowHeight]=\"state.options.rowHeight\"\n        [count]=\"state.rowCount\"\n        [scrollWidth]=\"state.columnGroupWidths.total\">\n        <datatable-body-row\n          *ngFor=\"let row of rows; let i = index;\"\n          [attr.tabindex]=\"i\"\n          [class.active]=\"state.selected.includes(row)\"\n          (click)=\"rowClicked($event, i, row)\"\n          (keydown)=\"rowKeydown($event, i, row)\"\n          [row]=\"row\">\n        </datatable-body-row>\n        <div\n          class=\"empty\"\n          *ngIf=\"!rows.length\"\n          [innerHTML]=\"state.options.emptyMessage\">\n        </div>\n      </datatable-scroll>\n    </div>\n  ",
                        directives: [
                            ProgressBar_1.ProgressBar,
                            BodyRow_1.DataTableBodyRow,
                            Scroll_1.DataTableScroll
                        ],
                        host: {
                            '[style.width]': 'state.innerWidth',
                            '[style.height]': 'bodyHeight',
                            '[class.loading]': 'showProgress'
                        }
                    }), 
                    __metadata('design:paramtypes', [State_4.StateService, (typeof (_a = typeof core_13.ElementRef !== 'undefined' && core_13.ElementRef) === 'function' && _a) || Object])
                ], DataTableBody);
                return DataTableBody;
                var _a;
            }());
            exports_31("DataTableBody", DataTableBody);
        }
    }
});
System.register("components/footer/Pager", ['@angular/core'], function(exports_32, context_32) {
    "use strict";
    var __moduleName = context_32 && context_32.id;
    var core_14;
    var DataTablePager;
    return {
        setters:[
            function (core_14_1) {
                core_14 = core_14_1;
            }],
        execute: function() {
            DataTablePager = (function () {
                function DataTablePager(elm) {
                    this.page = 1;
                    this.size = 0;
                    this.count = 0;
                    this.onPaged = new core_14.EventEmitter();
                    elm.nativeElement.classList.add('datatable-pager');
                }
                Object.defineProperty(DataTablePager.prototype, "totalPages", {
                    get: function () {
                        var count = this.size < 1 ? 1 : Math.ceil(this.count / this.size);
                        return Math.max(count || 0, 1);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataTablePager.prototype, "count", {
                    get: function () {
                        return this._count;
                    },
                    set: function (val) {
                        this._count = val;
                        this.pages = this.calcPages();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataTablePager.prototype, "page", {
                    get: function () {
                        return this._page;
                    },
                    set: function (val) {
                        this._page = val;
                        this.pages = this.calcPages();
                    },
                    enumerable: true,
                    configurable: true
                });
                DataTablePager.prototype.canPrevious = function () {
                    return this.page > 1;
                };
                DataTablePager.prototype.canNext = function () {
                    return this.page < this.totalPages;
                };
                DataTablePager.prototype.prevPage = function () {
                    if (this.page > 1) {
                        this.selectPage(--this.page);
                    }
                };
                DataTablePager.prototype.nextPage = function () {
                    this.selectPage(++this.page);
                };
                DataTablePager.prototype.selectPage = function (page) {
                    if (page > 0 && page <= this.totalPages) {
                        this.page = page;
                        this.onPaged.emit(page);
                    }
                };
                DataTablePager.prototype.calcPages = function (page) {
                    var pages = [], startPage = 1, endPage = this.totalPages, maxSize = 5, isMaxSized = maxSize < this.totalPages;
                    page = page || this.page;
                    if (isMaxSized) {
                        startPage = ((Math.ceil(page / maxSize) - 1) * maxSize) + 1;
                        endPage = Math.min(startPage + maxSize - 1, this.totalPages);
                    }
                    for (var number = startPage; number <= endPage; number++) {
                        pages.push({
                            number: number,
                            text: number
                        });
                    }
                    return pages;
                };
                __decorate([
                    core_14.Input(), 
                    __metadata('design:type', Number)
                ], DataTablePager.prototype, "page", void 0);
                __decorate([
                    core_14.Input(), 
                    __metadata('design:type', Number)
                ], DataTablePager.prototype, "size", void 0);
                __decorate([
                    core_14.Input(), 
                    __metadata('design:type', Number)
                ], DataTablePager.prototype, "count", void 0);
                __decorate([
                    core_14.Output(), 
                    __metadata('design:type', (typeof (_a = typeof core_14.EventEmitter !== 'undefined' && core_14.EventEmitter) === 'function' && _a) || Object)
                ], DataTablePager.prototype, "onPaged", void 0);
                DataTablePager = __decorate([
                    core_14.Component({
                        selector: 'datatable-pager',
                        template: "\n    <ul class=\"pager\">\n      <li [attr.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(1)\"\n          class=\"icon-prev\">\n        </a>\n      </li>\n      <li [attr.disabled]=\"!canPrevious()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"prevPage()\"\n          class=\"icon-left\">\n        </a>\n      </li>\n      <li\n        *ngFor=\"let pg of pages\"\n        [class.active]=\"pg.number === page\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(pg.number)\">\n          {{pg.text}}\n        </a>\n      </li>\n      <li [attr.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"nextPage()\"\n          class=\"icon-right\">\n        </a>\n      </li>\n      <li [attr.disabled]=\"!canNext()\">\n        <a\n          href=\"javascript:void(0)\"\n          (click)=\"selectPage(totalPages)\"\n          class=\"icon-skip\">\n        </a>\n      </li>\n    </ul>\n  "
                    }), 
                    __metadata('design:paramtypes', [(typeof (_b = typeof core_14.ElementRef !== 'undefined' && core_14.ElementRef) === 'function' && _b) || Object])
                ], DataTablePager);
                return DataTablePager;
                var _a, _b;
            }());
            exports_32("DataTablePager", DataTablePager);
        }
    }
});
System.register("components/footer/Footer", ['@angular/core', "services/State", "components/footer/Pager"], function(exports_33, context_33) {
    "use strict";
    var __moduleName = context_33 && context_33.id;
    var core_15, State_5, Pager_1;
    var DataTableFooter;
    return {
        setters:[
            function (core_15_1) {
                core_15 = core_15_1;
            },
            function (State_5_1) {
                State_5 = State_5_1;
            },
            function (Pager_1_1) {
                Pager_1 = Pager_1_1;
            }],
        execute: function() {
            DataTableFooter = (function () {
                function DataTableFooter(elm, state) {
                    this.state = state;
                    this.onPageChange = new core_15.EventEmitter();
                    elm.nativeElement.classList.add('datatable-footer');
                }
                Object.defineProperty(DataTableFooter.prototype, "visible", {
                    get: function () {
                        return (this.state.pageCount / this.state.pageSize) > 1;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(DataTableFooter.prototype, "curPage", {
                    get: function () {
                        return this.state.options.offset + 1;
                    },
                    enumerable: true,
                    configurable: true
                });
                __decorate([
                    core_15.Output(), 
                    __metadata('design:type', Object)
                ], DataTableFooter.prototype, "onPageChange", void 0);
                DataTableFooter = __decorate([
                    core_15.Component({
                        selector: 'datatable-footer',
                        template: "\n    <div\n      *ngIf=\"state.options.footerHeight\"\n      [style.height]=\"state.options.footerHeight\">\n      <div class=\"page-count\">{{state.pageCount}} total</div>\n      <datatable-pager\n        [page]=\"curPage\"\n        [size]=\"state.pageSize\"\n        (onPaged)=\"onPageChange.emit($event)\"\n        [count]=\"state.pageCount\"\n        [hidden]=\"!visible\">\n       </datatable-pager>\n     </div>\n  ",
                        directives: [Pager_1.DataTablePager]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_15.ElementRef !== 'undefined' && core_15.ElementRef) === 'function' && _a) || Object, State_5.StateService])
                ], DataTableFooter);
                return DataTableFooter;
                var _a;
            }());
            exports_33("DataTableFooter", DataTableFooter);
        }
    }
});
System.register("components/DataTable", ['@angular/core', "utils/debounce", "services/State", "directives/Visibility", "utils/math", "models/TableOptions", "components/header/Header", "components/body/Body", "components/footer/Footer"], function(exports_34, context_34) {
    "use strict";
    var __moduleName = context_34 && context_34.id;
    var core_16, debounce_1, State_6, Visibility_1, math_1, TableOptions_1, Header_1, Body_1, Footer_1;
    var DataTable;
    return {
        setters:[
            function (core_16_1) {
                core_16 = core_16_1;
            },
            function (debounce_1_1) {
                debounce_1 = debounce_1_1;
            },
            function (State_6_1) {
                State_6 = State_6_1;
            },
            function (Visibility_1_1) {
                Visibility_1 = Visibility_1_1;
            },
            function (math_1_1) {
                math_1 = math_1_1;
            },
            function (TableOptions_1_1) {
                TableOptions_1 = TableOptions_1_1;
            },
            function (Header_1_1) {
                Header_1 = Header_1_1;
            },
            function (Body_1_1) {
                Body_1 = Body_1_1;
            },
            function (Footer_1_1) {
                Footer_1 = Footer_1_1;
            }],
        execute: function() {
            DataTable = (function () {
                function DataTable(element, state, differs) {
                    this.state = state;
                    this.onPageChange = new core_16.EventEmitter();
                    this.onRowsUpdate = new core_16.EventEmitter();
                    this.onRowClick = new core_16.EventEmitter();
                    this.onSelectionChange = new core_16.EventEmitter();
                    this.element = element.nativeElement;
                    this.element.classList.add('datatable');
                    this.differ = differs.find({}).create(null);
                }
                DataTable.prototype.ngOnInit = function () {
                    var _this = this;
                    var _a = this, options = _a.options, rows = _a.rows, selected = _a.selected;
                    this.state
                        .setOptions(options)
                        .setRows(rows)
                        .setSelected(selected);
                    this.state.onRowsUpdate.subscribe(function (e) { return _this.onRowsUpdate.emit(e); });
                };
                DataTable.prototype.ngDoCheck = function () {
                    if (this.differ.diff(this.rows)) {
                        this.state.setRows(this.rows);
                    }
                };
                DataTable.prototype.adjustSizes = function () {
                    var _a = this.element.getBoundingClientRect(), height = _a.height, width = _a.width;
                    this.state.innerWidth = Math.floor(width);
                    if (this.options.scrollbarV) {
                        if (this.options.headerHeight)
                            height = -this.options.headerHeight;
                        if (this.options.footerHeight)
                            height = -this.options.footerHeight;
                        this.state.bodyHeight = height;
                    }
                    this.adjustColumns();
                };
                DataTable.prototype.resize = function () { this.adjustSizes(); };
                DataTable.prototype.adjustColumns = function (forceIdx) {
                    var width = this.state.innerWidth;
                    if (this.options.scrollbarV) {
                        width = -this.state.scrollbarWidth;
                    }
                    if (this.options.columnMode === 'force') {
                        math_1.forceFillColumnWidths(this.options.columns, width, forceIdx);
                    }
                    else if (this.options.columnMode === 'flex') {
                        math_1.adjustColumnWidths(this.options.columns, width);
                    }
                };
                DataTable.prototype.onPageChanged = function (event) {
                    this.state.setPage(event);
                    this.onPageChange.emit(event);
                };
                __decorate([
                    core_16.Input(), 
                    __metadata('design:type', TableOptions_1.TableOptions)
                ], DataTable.prototype, "options", void 0);
                __decorate([
                    core_16.Input(), 
                    __metadata('design:type', Array)
                ], DataTable.prototype, "rows", void 0);
                __decorate([
                    core_16.Input(), 
                    __metadata('design:type', Array)
                ], DataTable.prototype, "selected", void 0);
                __decorate([
                    core_16.Output(), 
                    __metadata('design:type', Object)
                ], DataTable.prototype, "onPageChange", void 0);
                __decorate([
                    core_16.Output(), 
                    __metadata('design:type', Object)
                ], DataTable.prototype, "onRowsUpdate", void 0);
                __decorate([
                    core_16.Output(), 
                    __metadata('design:type', Object)
                ], DataTable.prototype, "onRowClick", void 0);
                __decorate([
                    core_16.Output(), 
                    __metadata('design:type', Object)
                ], DataTable.prototype, "onSelectionChange", void 0);
                __decorate([
                    debounce_1.debounceable(10),
                    core_16.HostListener('window:resize'), 
                    __metadata('design:type', Function), 
                    __metadata('design:paramtypes', []), 
                    __metadata('design:returntype', void 0)
                ], DataTable.prototype, "resize", null);
                DataTable = __decorate([
                    core_16.Component({
                        selector: 'datatable',
                        template: "\n  \t<div\n      visibility-observer\n      (onVisibilityChange)=\"adjustSizes()\">\n      <datatable-header></datatable-header>\n      <datatable-body\n        (onRowClick)=\"onRowClick.emit($event)\"\n        (onRowSelect)=\"state.setSelected($event)\">\n      </datatable-body>\n      <datatable-footer\n        (onPageChange)=\"onPageChanged($event)\">\n      </datatable-footer>\n    </div>\n  ",
                        directives: [
                            Header_1.DataTableHeader,
                            Body_1.DataTableBody,
                            Footer_1.DataTableFooter,
                            Visibility_1.Visibility
                        ],
                        host: {
                            '[class.fixed-header]': 'options.headerHeight !== "auto"',
                            '[class.fixed-row]': 'options.rowHeight !== "auto"',
                            '[class.scroll-vertical]': 'options.scrollbarV',
                            '[class.scroll-horz]': 'options.scrollbarH',
                            '[class.selectable]': 'options.selectable',
                            '[class.checkboxable]': 'options.checkboxable'
                        },
                        providers: [State_6.StateService]
                    }), 
                    __metadata('design:paramtypes', [(typeof (_a = typeof core_16.ElementRef !== 'undefined' && core_16.ElementRef) === 'function' && _a) || Object, State_6.StateService, (typeof (_b = typeof core_16.KeyValueDiffers !== 'undefined' && core_16.KeyValueDiffers) === 'function' && _b) || Object])
                ], DataTable);
                return DataTable;
                var _a, _b;
            }());
            exports_34("DataTable", DataTable);
        }
    }
});
System.register("main", ["components/DataTable", "models/TableOptions", "models/TableColumn", "models/SelectionType", "models/ColumnMode", "models/SortDirection", "models/SortType"], function(exports_35, context_35) {
    "use strict";
    var __moduleName = context_35 && context_35.id;
    var DataTable_1;
    var A2DT_DIRECTIVES;
    return {
        setters:[
            function (DataTable_1_1) {
                DataTable_1 = DataTable_1_1;
            },
            function (TableOptions_2_1) {
                exports_35({
                    "TableOptions": TableOptions_2_1["TableOptions"]
                });
            },
            function (TableColumn_2_1) {
                exports_35({
                    "TableColumn": TableColumn_2_1["TableColumn"]
                });
            },
            function (SelectionType_2_1) {
                exports_35({
                    "SelectionType": SelectionType_2_1["SelectionType"]
                });
            },
            function (ColumnMode_2_1) {
                exports_35({
                    "ColumnMode": ColumnMode_2_1["ColumnMode"]
                });
            },
            function (SortDirection_3_1) {
                exports_35({
                    "SortDirection": SortDirection_3_1["SortDirection"]
                });
            },
            function (SortType_4_1) {
                exports_35({
                    "SortType": SortType_4_1["SortType"]
                });
            }],
        execute: function() {
            exports_35("A2DT_DIRECTIVES", A2DT_DIRECTIVES = [
                DataTable_1.DataTable
            ]);
        }
    }
});
//# sourceMappingURL=angular2-data-table.js.map