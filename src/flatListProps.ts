import {
  array,
  arrayOf,
  bool,
  element,
  func,
  node,
  number,
  object,
  oneOf,
  oneOfType,
  Requireable,
  shape,
  string,
} from "prop-types";
import { ReactNode } from "react";
import warning from "warning";
import {
  DisplayHandlerProps,
  DisplayInterface,
} from "./___subComponents/DisplayHandler";
import { InfiniteLoaderInterface } from "./___subComponents/InfiniteLoader";
import { renderFunc } from "./___subComponents/uiFunctions";
import { GroupOptionsInterface } from "./___utils/groupList";
import { SearchOptionsInterface } from "./___utils/searchList";
import { SortOptionsInterface } from "./___utils/sortList";

function deprecated(
  propType: Requireable<unknown>,
  defaultVal: unknown,
  alternative: string
) {
  // the rest at the end is need to silence props warning => https://reactjs.org/warnings/dont-call-proptypes.html
  return (
    props: { [key: string]: unknown },
    propName: string,
    componentName: string,
    ...rest: any
  ) => {
    if (
      props[propName] !== null &&
      props[propName] !== undefined &&
      props[propName] !== defaultVal
    ) {
      const message = `"${propName}" prop of "${componentName}" has been deprecated. Please use "${alternative}" instead.`;
      warning(false, message);
    }

    // @ts-ignore
    return propType(props, propName, componentName, ...rest);
  };
}

export type List<T> = Array<T> | Set<T> | Map<any, T> | { [key: string]: T };

export interface GroupInterface<ListItem>
  extends GroupOptionsInterface<ListItem> {
  limit?: number;
  of?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  separator?:
    | ReactNode
    | ((g: ListItem[], idx: number, label: string) => ReactNode | null)
    | null;
  separatorAtTheBottom?: boolean;
  sortBy?: SortOptionsInterface["by"];
  sortedBy?: SortOptionsInterface["by"];
  sortDescending?: boolean;
  sortedDescending?: boolean;
  sortCaseInsensitive?: boolean;
  sortedCaseInsensitive?: boolean;
}

export interface ScrollToTopInterface {
  button?: ReactNode | (() => JSX.Element);
  offset?: number;
  padding?: number;
  position?:
    | "top"
    | "bottom"
    | "top right"
    | "top left"
    | "bottom left"
    | "bottom right";
}

export interface SortInterface<ListItem> extends SortOptionsInterface {
  groupBy?: GroupInterface<ListItem>["sortBy"];
  groupDescending?: GroupInterface<ListItem>["sortDescending"];
  groupCaseInsensitive?: GroupInterface<ListItem>["sortCaseInsensitive"];
}

export interface FlatListProps<ListItem> {
  // RENDER
  list: List<ListItem>;
  renderItem: renderFunc<ListItem>;
  renderWhenEmpty?: ReactNode | (() => JSX.Element);
  renderOnScroll?: boolean;
  limit?: number | string;
  reversed?: boolean;
  wrapperHtmlTag?: string;
  // sorting
  sort?: boolean | SortInterface<ListItem>;
  sortBy?: SortInterface<ListItem>["by"];
  sortCaseInsensitive?: SortInterface<ListItem>["caseInsensitive"];
  sortDesc?: SortInterface<ListItem>["descending"];
  sortDescending?: SortInterface<ListItem>["descending"];
  sortGroupBy?: GroupInterface<ListItem>["sortBy"]; // deprecated
  sortGroupDesc?: GroupInterface<ListItem>["sortDescending"]; // deprecated
  sortGroupDescending?: GroupInterface<ListItem>["sortDescending"];
  sortGroupCaseInsensitive?: GroupInterface<ListItem>["sortCaseInsensitive"]; // deprecated
  // grouping
  group?: GroupInterface<ListItem>;
  showGroupSeparatorAtTheBottom?: GroupInterface<ListItem>["separatorAtTheBottom"]; // deprecated
  groupSeparatorAtTheBottom?: GroupInterface<ListItem>["separatorAtTheBottom"];
  groupReversed?: GroupInterface<ListItem>["reversed"];
  groupSeparator?: GroupInterface<ListItem>["separator"];
  groupBy?: GroupInterface<ListItem>["by"];
  groupOf?: GroupInterface<ListItem>["limit"];
  groupSorted?: boolean;
  groupSortedDescending?: GroupInterface<ListItem>["sortDescending"];
  groupSortedCaseInsensitive?: GroupInterface<ListItem>["sortCaseInsensitive"];
  // display
  display?: DisplayInterface;
  displayRow?: DisplayHandlerProps["displayRow"];
  rowGap?: DisplayHandlerProps["rowGap"];
  displayGrid?: DisplayHandlerProps["displayGrid"];
  gridGap?: DisplayHandlerProps["gridGap"];
  minColumnWidth?: DisplayHandlerProps["minColumnWidth"];
  // filtering
  filterBy?: string | ((item: ListItem, idx: number) => boolean);
  // searching
  search?: SearchOptionsInterface<ListItem>;
  searchTerm?: SearchOptionsInterface<ListItem>["term"];
  searchBy?: SearchOptionsInterface<ListItem>["by"];
  searchOnEveryWord?: SearchOptionsInterface<ListItem>["everyWord"];
  searchCaseInsensitive?: SearchOptionsInterface<ListItem>["caseInsensitive"];
  searchableMinCharactersCount?: SearchOptionsInterface<ListItem>["minCharactersCount"]; // deprecated
  // pagination
  pagination?: InfiniteLoaderInterface;
  hasMoreItems?: InfiniteLoaderInterface["hasMore"];
  loadMoreItems?: null | InfiniteLoaderInterface["loadMore"];
  paginationLoadingIndicator?: InfiniteLoaderInterface["loadingIndicator"];
  paginationLoadingIndicatorPosition?: InfiniteLoaderInterface["loadingIndicatorPosition"];
  // scrollToTop
  scrollToTop?: boolean | ScrollToTopInterface;
  scrollToTopButton?: ReactNode | (() => ReactNode);
  scrollToTopOffset?: number;
  scrollToTopPadding?: number;
  scrollToTopPosition?: string;
  // others
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const defaultProps: FlatListProps<any> = {
  __forwarededRef: { current: null },
  // RENDER
  list: [],
  renderItem: () => null,
  limit: 0,
  renderWhenEmpty: null,
  reversed: false,
  renderOnScroll: false,
  wrapperHtmlTag: "",
  // DISPLAY
  display: {
    grid: false,
    gridGap: "",
    gridMinColumnWidth: "",
    row: false,
    rowGap: "",
  },
  displayGrid: false,
  displayRow: false,
  gridGap: "",
  rowGap: "",
  minColumnWidth: "",
  // FILTER
  filterBy: "",
  // GROUPS
  group: {
    by: "",
    limit: 0, // deprecated
    of: 0,
    reversed: false,
    separator: null,
    separatorAtTheBottom: false,
    sortedBy: "",
    sortBy: "", // deprecated
    sortedCaseInsensitive: false,
    sortCaseInsensitive: false, // deprecated
    sortedDescending: false,
    sortDescending: false, // deprecated
  },
  groupBy: "",
  groupOf: 0,
  groupReversed: false,
  groupSeparator: null,
  groupSeparatorAtTheBottom: false,
  groupSorted: false,
  groupSortedBy: "",
  groupSortedDescending: false,
  groupSortedCaseInsensitive: false,
  showGroupSeparatorAtTheBottom: false, // deprecated
  // PAGINATION
  pagination: {
    hasMore: false,
    loadMore: null,
    loadingIndicator: null,
    loadingIndicatorPosition: "",
  },
  hasMoreItems: false,
  loadMoreItems: null,
  paginationLoadingIndicator: null,
  paginationLoadingIndicatorPosition: "",
  // SCROLL TO TOP
  scrollToTop: {
    button: null,
    offset: undefined,
    padding: undefined,
    position: undefined,
  },
  scrollToTopButton: null,
  scrollToTopOffset: undefined,
  scrollToTopPadding: undefined,
  scrollToTopPosition: undefined,
  // SEARCH
  search: {
    by: "",
    caseInsensitive: false,
    everyWord: false, // deprecated
    onEveryWord: false,
    minCharactersCount: 0,
    term: "",
  },
  searchBy: "",
  searchCaseInsensitive: false,
  searchOnEveryWord: false,
  searchTerm: "",
  searchMinCharactersCount: 0,
  searchableMinCharactersCount: 0, // deprecated
  // SORT
  sort: {
    by: "",
    caseInsensitive: false,
    descending: false,
    groupBy: "", // deprecated
    groupCaseInsensitive: false, // deprecated
    groupDescending: false, // deprecated
  },
  sortBy: "",
  sortCaseInsensitive: false,
  sortDesc: false, // deprecated
  sortDescending: false,
  sortGroupBy: "", // deprecated
  sortGroupDesc: false, // deprecated
  sortGroupCaseInsensitive: false, // deprecated
};

export const propTypes = {
  __forwarededRef: object,
  // RENDER
  list: oneOfType([array, object]).isRequired,
  renderItem: oneOfType([func, node]).isRequired,
  limit: oneOfType([number, string]),
  renderWhenEmpty: func,
  reversed: bool,
  renderOnScroll: bool,
  wrapperHtmlTag: string,
  // DISPLAY
  display: shape({
    grid: bool,
    gridColumnWidth: string,
    gridGap: string,
    row: bool,
    rowGap: string,
  }),
  displayGrid: bool,
  displayRow: bool,
  gridGap: string,
  rowGap: string,
  minColumnWidth: string,
  // FILTER
  filterBy: oneOfType([func, string]),
  // GROUPS
  group: shape({
    by: oneOfType([func, string]),
    limit: deprecated(number, defaultProps.group?.limit, "group.of"), // deprecated
    of: number,
    reversed: bool,
    separator: oneOfType([node, func, element]),
    separatorAtTheBottom: bool,
    sortedBy: oneOfType([
      string,
      arrayOf(
        oneOfType([
          string,
          shape({ by: string, caseInsensitive: bool, descending: bool }),
        ])
      ),
    ]),
    sortBy: deprecated(
      oneOfType([
        string,
        arrayOf(
          oneOfType([
            string,
            shape({ by: string, caseInsensitive: bool, descending: bool }),
          ])
        ),
      ]),
      defaultProps?.group?.sortBy,
      "sortedBy"
    ), // deprecated
    sortedCaseInsensitive: bool,
    sortCaseInsensitive: deprecated(
      bool,
      defaultProps.group?.sortCaseInsensitive,
      "sortedCaseInsensitive"
    ), // deprecated
    sortedDescending: bool,
    sortDescending: deprecated(
      bool,
      defaultProps.group?.sortDescending,
      "sortedDescending"
    ), // deprecated
  }),
  groupBy: oneOfType([func, string]),
  groupOf: number,
  groupReversed: bool,
  groupSeparator: oneOfType([node, func, element]),
  groupSeparatorAtTheBottom: bool,
  showGroupSeparatorAtTheBottom: deprecated(
    bool,
    defaultProps.showGroupSeparatorAtTheBottom,
    "groupSeparatorAtTheBottom"
  ), // deprecated
  groupSorted: bool,
  groupSortedBy: oneOfType([
    string,
    arrayOf(
      oneOfType([
        string,
        shape({ by: string, caseInsensitive: bool, descending: bool }),
      ])
    ),
  ]),
  groupSortedDescending: bool,
  groupSortedCaseInsensitive: bool,
  // PAGINATION
  // PAGINATE
  pagination: shape({
    hasMore: bool,
    loadMore: func,
    loadingIndicator: oneOfType([node, func, element]),
    loadingIndicatorPosition: string,
  }),
  hasMoreItems: bool,
  loadMoreItems: func,
  paginationLoadingIndicator: oneOfType([node, func, element]),
  paginationLoadingIndicatorPosition: oneOf(["left", "center", "right", ""]),
  // SCROLL TO TOP
  scrollToTop: oneOfType([
    bool,
    shape({
      button: oneOfType([node, element, func]),
      offset: number,
      padding: number,
      position: oneOf(["top right", "top left", "bottom right", "bottom left"]),
    }),
  ]),
  scrollToTopButton: oneOfType([node, element, func]),
  scrollToTopOffset: number,
  scrollToTopPadding: number,
  scrollToTopPosition: oneOf([
    "top right",
    "top left",
    "bottom right",
    "bottom left",
  ]),
  // SEARCH
  search: shape({
    by: oneOfType([
      func,
      string,
      arrayOf(
        oneOfType([string, shape({ by: string, caseInsensitive: bool })])
      ),
    ]),
    caseInsensitive: bool,
    everyWord: deprecated(
      bool,
      defaultProps.search?.everyWord,
      "search.onEveryWord"
    ), // deprecated
    onEveryWord: bool,
    minCharactersCount: number,
    term: string,
  }),
  searchBy: oneOfType([
    func,
    string,
    arrayOf(oneOfType([string, shape({ by: string, caseInsensitive: bool })])),
  ]),
  searchCaseInsensitive: bool,
  searchOnEveryWord: bool,
  searchableMinCharactersCount: deprecated(
    number,
    defaultProps.searchableMinCharactersCount,
    "searchMinCharactersCount"
  ), // deprecated
  searchMinCharactersCount: number,
  searchTerm: string,
  // SORT
  sort: oneOfType([
    bool,
    shape({
      by: oneOfType([
        string,
        arrayOf(
          oneOfType([
            string,
            shape({ by: string, caseInsensitive: bool, descending: bool }),
          ])
        ),
      ]),
      caseInsensitive: bool,
      descending: bool,
      groupBy: string,
      groupCaseInsensitive: bool,
      groupDescending: bool,
    }),
  ]),
  sortBy: oneOfType([
    string,
    arrayOf(
      oneOfType([
        string,
        shape({ by: string, caseInsensitive: bool, descending: bool }),
      ])
    ),
  ]),
  sortCaseInsensitive: bool,
  sortDesc: bool,
  sortDescending: bool,
  sortGroupBy: deprecated(
    oneOfType([
      string,
      arrayOf(
        oneOfType([
          string,
          shape({ by: string, caseInsensitive: bool, descending: bool }),
        ])
      ),
    ]),
    defaultProps.sortGroupBy,
    "groupSortedBy"
  ), // deprecated
  sortGroupDesc: deprecated(
    bool,
    defaultProps.sortGroupDesc,
    "groupSortedDescending"
  ), // deprecated
  sortGroupCaseInsensitive: deprecated(
    bool,
    defaultProps.sortGroupCaseInsensitive,
    'Use "groupSeparatorAtTheBottom"'
  ), // deprecated
};
