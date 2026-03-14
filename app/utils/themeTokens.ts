export const Tokens = {
  Colors: {
    primary: 'primary',
    secondary: 'secondary',
    success: 'success',
    greyDark: 'grey-darken-2',
    white: 'white',
    surface: 'surface',
    background: 'background',
    textHighlight: '#2d4a22', // Used explicitly in styles if a Vuetify class isn't enough, per cursorrules (no raw magic numbers in .vue files).
  },
  Spacing: {
    paddingTopCard: 'pt-8',
    marginResultsText: 'mt-3 mb-1',
    marginAlert: 'mt-6 mb-4',
    paddingActions: 'px-6 pt-6 pb-6',
    flexGrowSmallMarginRight: 'mr-3',
    flexGrowSmallMarginLeft: 'ml-3',
    pagePadding: 'pa-4 md-pa-8',
  },
  Typography: {
    titleSize: 'text-h4',
    titleWeight: 'font-weight-black',
    subtitleSize: 'text-subtitle-1',
    bodyText: 'text-body-1',
  },
  Elevation: {
    card: 0, // In the mockup, cards are flat with soft colors, no heavy dropshadows
    toolbar: 0,
  },
  Shape: {
    cardRounding: 'rounded-xl',
    buttonRounding: 'rounded-pill', // Mockups use very rounded pill buttons
    inputRounding: 'rounded-xl',
  }
} as const
