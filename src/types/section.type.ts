export type SectionProp = string|number;

export interface Section {

  /**
   * Value of the section property to include in this section.
   *
   * @type {any}
   * @memberOf Section
   */
  propValue?: any;

  /**
   * Section title
   *
   * @type {string}
   * @memberOf Section
   */
  title?: string;

  /**
   * True if section is expanded displaying
   */
  expanded?: boolean;
}


