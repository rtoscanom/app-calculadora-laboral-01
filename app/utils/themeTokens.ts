export const Tokens = {
  Colors: {
    primary: 'primary', // Reference to the Vuetify default (or overridden) primary
    success: 'success', // Reference to the Vuetify success color
    greyDark: 'grey-darken-1',
    white: 'white',
    // We avoid magic colors directly in the UI. If a specific hex is needed, define it here.
    appBackgroundGradient: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  Spacing: {
    paddingTopCard: 'pt-6', // Vuetify pt-6 spacing token
    marginResultsText: 'mt-2', // Vuetify mt-2 spacing token
    marginAlert: 'mt-4 mb-2', // Vuetify spacing tokens
    paddingActions: 'px-0 pt-4 pb-0',
    flexGrowSmallMarginRight: 'mr-2',
    flexGrowSmallMarginLeft: 'ml-2',
  },
  Typography: {
    titleSize: 'text-h5',
    titleWeight: 'font-weight-bold',
    bodyText: 'text-body-1',
  },
  Elevation: {
    card: 12,
    toolbar: 4,
  },
  Shape: {
    cardRounding: 'rounded-xl',
  }
} as const
