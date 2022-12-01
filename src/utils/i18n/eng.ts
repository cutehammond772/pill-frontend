import { I18N, I18NMapper } from ".";

const ENGTexts: I18NMapper = {

  [I18N.HEADER_01]: "Undefined",

  [I18N.HEADER_EMPTY_01]: "Home",
  [I18N.HEADER_EMPTY_02]: "Default",

  [I18N.HEADER_DEFAULT_01]: "Home",
  [I18N.HEADER_DEFAULT_02]: "My Pill",
  [I18N.HEADER_DEFAULT_03]: "Explore",
  [I18N.HEADER_DEFAULT_04]: "About",

  [I18N.HEADER_CREATE_01]: "Editor",
  [I18N.HEADER_CREATE_02]: "Preview",
  [I18N.HEADER_CREATE_03]: "Save",
  [I18N.HEADER_CREATE_04]: "You must fill all contents to look at the preview.",
  [I18N.HEADER_CREATE_05]: "You must fill all contents to save pill.",
  [I18N.HEADER_CREATE_06]: "Warning",
  [I18N.HEADER_CREATE_07]: "If you leave the create page, everything you've written so far will disappear. Would you like to go on?",
  [I18N.HEADER_CREATE_08]: "Leave",
  [I18N.HEADER_CREATE_09]: "Back to Editor",

  [I18N.PAGE_USER_01]: "What do you want to do now?",
  [I18N.PAGE_USER_02]: "Pill: Latest",
  [I18N.PAGE_USER_03]: "Pill: Most Viewed",
  [I18N.PAGE_USER_04]: "Create New Pill",
  [I18N.PAGE_USER_05]: "'Pill' with your own knowledges and thoughts in your own way!",
  [I18N.PAGE_USER_06]: "Explore Pill",
  [I18N.PAGE_USER_07]: "Are you hungry for knowledge? There is a feast here.",

  [I18N.PAGE_GUEST_01]: "Pill makes it easy to get knowledge. Sign up with just one button and enjoy it!",
  [I18N.PAGE_GUEST_02]: "Sign in with Google",

  [I18N.PAGE_CREATE_01]: "First impression is always important.",
  [I18N.PAGE_CREATE_02]: "Title",
  [I18N.PAGE_CREATE_03]: "Please enter a title.",
  [I18N.PAGE_CREATE_04]: "Category",
  [I18N.PAGE_CREATE_05]: "Add",
  [I18N.PAGE_CREATE_06]: "Enter to Add",
  [I18N.PAGE_CREATE_07]: "Let's fill your Pill.",
  [I18N.PAGE_CREATE_08]: "Add an index",
  [I18N.PAGE_CREATE_09]: "~40 characters",
  [I18N.PAGE_CREATE_10]: "Add a content",
  [I18N.PAGE_CREATE_11]: "Image",
  [I18N.PAGE_CREATE_12]: "Add an image to the end of the index.",
  [I18N.PAGE_CREATE_13]: "Text",
  [I18N.PAGE_CREATE_14]: "Add a text to the end of the index.",
  [I18N.PAGE_CREATE_15]: "Add Image",
  [I18N.PAGE_CREATE_16]: "Enter the image link and press Confirm to check the image in advance.",
  [I18N.PAGE_CREATE_17]: "Image Link",
  [I18N.PAGE_CREATE_18]: "Description",
  [I18N.PAGE_CREATE_19]: "Confirm",
  [I18N.PAGE_CREATE_20]: "Edit",
  [I18N.PAGE_CREATE_21]: "Edit Image",
  [I18N.PAGE_CREATE_22]: "~40 characters",
  [I18N.PAGE_CREATE_23]: "Invalid Image Link.",
  [I18N.PAGE_CREATE_24]: "Done",
  [I18N.PAGE_CREATE_25]: "Image",
  [I18N.PAGE_CREATE_26]: "Text",
  [I18N.PAGE_CREATE_27]: "Up",
  [I18N.PAGE_CREATE_28]: "Down",
  [I18N.PAGE_CREATE_29]: "Edit",
  [I18N.PAGE_CREATE_30]: "Remove",
  [I18N.PAGE_CREATE_31]: "A blank exists.",
  [I18N.PAGE_CREATE_32]: "Great!",

  [I18N.PAGE_EXPLORE_01]: "Look for the Pill you want.",
  [I18N.PAGE_EXPLORE_02]: "If you don't remember the content, try typing the author.",
  [I18N.PAGE_EXPLORE_03]: "All",
  [I18N.PAGE_EXPLORE_04]: "Title",
  [I18N.PAGE_EXPLORE_05]: "Index",
  [I18N.PAGE_EXPLORE_06]: "Content",
  [I18N.PAGE_EXPLORE_07]: "Author",
  [I18N.PAGE_EXPLORE_08]: "{0} Pill(s), {1} Comment(s)",
  [I18N.PAGE_EXPLORE_09]: "{0} elements / page",

  [I18N.PAGE_PREVIEW_01]: "by {0}",
  [I18N.PAGE_PREVIEW_02]: "Indexes",
  [I18N.PAGE_PREVIEW_03]: "Untitled",
  [I18N.PAGE_PREVIEW_04]: "Unknown",

  [I18N.PAGE_NOT_FOUND_01]: "404 - Not Found.",
  [I18N.PAGE_NOT_FOUND_02]: "Back to Home",
  [I18N.PAGE_NOT_FOUND_03]: "Back to Previous Page",

  [I18N.AUTH_01]: "Login",
  [I18N.AUTH_02]: "Logout",

  [I18N.PROFILE_01]: "Guest",

  [I18N.TAB_01]: "Welcome, Guest!",
  [I18N.TAB_02]: "Sign up with just one button without complicated registration process, and enjoy a variety of pills!",
  [I18N.TAB_03]: "Menu",
  [I18N.TAB_04]: "Recent Comments",
  [I18N.TAB_05]: "Recent {0} (+{1})",

  [I18N.TABLET_01]: "Untitled",
  [I18N.TABLET_02]: "Unknown",
} as const;

export default ENGTexts;
