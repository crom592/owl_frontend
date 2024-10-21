
const textLight = {
  primary: 'rgba(52, 49, 76, 1)',
  secondary: 'rgba(52, 49, 76, 0.54)',
  disabled: 'rgba(52, 49, 76, 0.38)',
  hint: 'rgba(52, 49, 76, 0.38)',
};

const textDark = {
  primary: '#fff',
  secondary: 'rgba(255, 255, 255, 0.7)',
  disabled: 'rgba(255, 255, 255, 0.64)',
  hint: 'rgba(255, 255, 255, 0.64)',
};

const errorColor = { main: '#FF3D57' };

const Owlcolor = {
  brandColors: {
    primary: '#FC9C14',
    secondary: '#4E531B',
  },
  stateColors: {
    info: '#0063F7',
    success: '#27AE60',
    warning: '#FFCC00',
    error: '#EB5757',
  },
  textColors: {
    text: '#454545',
    sub1: '#969696',
    sub2: '#828282',
    menusBg: '#FFF1B5',
    textBg: '#FFFDF6',
  },
  iconColors: {
    ic: '#FCC914',
    icGray: '#666666',
    icWhite: '#FFFFFF',
  },
  greyColors: {
    line: '#E8E8E8',
    bg: '#FBFBFB',
  },
};
export const themeColors = {
  whiteBlue: {
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
        contrastText: textLight.secondary,
      },
      secondary: {
        main: '#1976d2',
        contrastText: '#ffffff',
      },
      background: {
        paper: '#fff',
        default: '#fafafa',
      },
      text: textLight,
    },
  },
  slateDark1: {
    palette: {
      type: 'dark',
      primary: {
        main: '#222A45',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ff9e43',
        contrastText: textLight.primary,
      },
      error: errorColor,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
      text: textDark,
    },
  },
  slateDark2: {
    palette: {
      type: 'dark',
      primary: {
        main: '#1a2038',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#ff9e43',
        contrastText: textLight.primary,
      },
      error: errorColor,
      background: {
        paper: '#222A45',
        default: '#1a2038',
      },
      text: textDark,
    },
  },

  owl: {
    palette: {
      primary: {
        main: Owlcolor.brandColors.primary,
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: Owlcolor.brandColors.secondary,
        contrastText: '#FFFFFF',
      },
      info: { main: Owlcolor.stateColors.info },
      success: { main: Owlcolor.stateColors.success },
      warning: { main: Owlcolor.stateColors.warning },
      error: { main: Owlcolor.stateColors.error },
      gray: {
        main: Owlcolor.greyColors.line,
        contrastText: '#000000',
      },
      text: {
        primary: Owlcolor.textColors.text,
        secondary: Owlcolor.textColors.sub1,
        disabled: Owlcolor.textColors.sub2,
        tags: {
          blue: '#0085FF',
          orange: '#FF9F2D',
          gray: '#585757',
        },
      },
      background: {
        paper: '#fff',
        gradient: 'linear-gradient(to right bottom, #FC9C14, #FEC23D)',
        default: '#fafafa',
        tags: {
          blue: 'rgba(0, 133, 255, 0.1)',
          orange: '#FFF2E2',
          gray: '#F0F0F0',
        },
      },
    },
  },
};

export const themeShadows = ['none', '0px 2px 1px -1px rgba(0, 0, 0, 0.06),0px 1px 1px 0px rgba(0, 0, 0, 0.042),0px 1px 3px 0px rgba(0, 0, 0, 0.036)', '0px 3px 1px -2px rgba(0, 0, 0, 0.06),0px 2px 2px 0px rgba(0, 0, 0, 0.042),0px 1px 5px 0px rgba(0, 0, 0, 0.036)', '0px 3px 3px -2px rgba(0, 0, 0, 0.06),0px 3px 4px 0px rgba(0, 0, 0, 0.042),0px 1px 8px 0px rgba(0, 0, 0, 0.036)', '0px 2px 4px -1px rgba(0, 0, 0, 0.06),0px 4px 5px 0px rgba(0, 0, 0, 0.042),0px 1px 10px 0px rgba(0, 0, 0, 0.036)', '0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 5px 8px 0px rgba(0, 0, 0, 0.042),0px 1px 14px 0px rgba(0, 0, 0, 0.036)', '0px 3px 5px -1px rgba(0, 0, 0, 0.06),0px 6px 10px 0px rgba(0, 0, 0, 0.042),0px 1px 18px 0px rgba(0, 0, 0, 0.036)', '0px 4px 5px -2px rgba(0, 0, 0, 0.06),0px 7px 10px 1px rgba(0, 0, 0, 0.042),0px 2px 16px 1px rgba(0, 0, 0, 0.036)', '0px 5px 5px -3px rgba(0, 0, 0, 0.06),0px 8px 10px 1px rgba(0, 0, 0, 0.042),0px 3px 14px 2px rgba(0, 0, 0, 0.036)', '0px 5px 6px -3px rgba(0, 0, 0, 0.06),0px 9px 12px 1px rgba(0, 0, 0, 0.042),0px 3px 16px 2px rgba(0, 0, 0, 0.036)', '0px 6px 6px -3px rgba(0, 0, 0, 0.06),0px 10px 14px 1px rgba(0, 0, 0, 0.042),0px 4px 18px 3px rgba(0, 0, 0, 0.036)', '0px 6px 7px -4px rgba(0, 0, 0, 0.06),0px 11px 15px 1px rgba(0, 0, 0, 0.042),0px 4px 20px 3px rgba(0, 0, 0, 0.036)', '0px 7px 8px -4px rgba(0, 0, 0, 0.06),0px 12px 17px 2px rgba(0, 0, 0, 0.042),0px 5px 22px 4px rgba(0, 0, 0, 0.036)', '0px 7px 8px -4px rgba(0, 0, 0, 0.06),0px 13px 19px 2px rgba(0, 0, 0, 0.042),0px 5px 24px 4px rgba(0, 0, 0, 0.036)', '0px 7px 9px -4px rgba(0, 0, 0, 0.06),0px 14px 21px 2px rgba(0, 0, 0, 0.042),0px 5px 26px 4px rgba(0, 0, 0, 0.036)', '0px 8px 9px -5px rgba(0, 0, 0, 0.06),0px 15px 22px 2px rgba(0, 0, 0, 0.042),0px 6px 28px 5px rgba(0, 0, 0, 0.036)', '0px 8px 10px -5px rgba(0, 0, 0, 0.06),0px 16px 24px 2px rgba(0, 0, 0, 0.042),0px 6px 30px 5px rgba(0, 0, 0, 0.036)', '0px 8px 11px -5px rgba(0, 0, 0, 0.06),0px 17px 26px 2px rgba(0, 0, 0, 0.042),0px 6px 32px 5px rgba(0, 0, 0, 0.036)', '0px 9px 11px -5px rgba(0, 0, 0, 0.06),0px 18px 28px 2px rgba(0, 0, 0, 0.042),0px 7px 34px 6px rgba(0, 0, 0, 0.036)', '0px 9px 12px -6px rgba(0, 0, 0, 0.06),0px 19px 29px 2px rgba(0, 0, 0, 0.042),0px 7px 36px 6px rgba(0, 0, 0, 0.036)', '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)', '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)', '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)', '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)', '0px 10px 13px -6px rgba(0, 0, 0, 0.06),0px 20px 31px 3px rgba(0, 0, 0, 0.042),0px 8px 38px 7px rgba(0, 0, 0, 0.036)'];
