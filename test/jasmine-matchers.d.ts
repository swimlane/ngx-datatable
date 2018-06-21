declare namespace jasmine {
  interface Matchers<T> {
    toHaveText(actual: any, expectationFailOutput?: any): jasmine.CustomMatcher;
    toHaveCssClass(expected: any): boolean;
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
