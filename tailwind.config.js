module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDelay: {
        '8': '8ms',
      },
      textColor: {
        'custom-color': '#b28a58',
      },
      height: {
        '96': '96%',
      },
      height: {
        '96': '96%',
        '50': '50px',
        '150': '150px',
      },
      width: {
        '84': '84%',
        '100': '100px',
        '112': '112px',
        '500': '500px',
        '230': '230px',
        '300': '300px',
        '155': '155px',
        '33': '33px'
      },
      inset: {
        '8r': '8%',
        '5b': '5px',
        '150b': '150px',
      },
      fontSize: {
        '23': '23px !important',
        '64': '64px !important',
        '20': '20px !important',
        '18': '18px !important',
        '14': '14px !important',
        '16': '16px !important',
        '30': '30px !important',
      },
    },
    screens: {
      'max-md': {'max': '768px'},
      'max-3xl': {'max': '991px'},
      'max-min-3xl': {'max': '991px', 'min':'769px'},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.custom-padding': {
          padding: '0 15px',
        },
        '.custom-top': {
          top: '100px',
        },
        '.transform768' : {
          transform: 'translate3d(0, 26px, 0)',
        },
        '.transform991' : {
          transform: 'translate3d(0, 44px, 0)',
        },
        '.logo':{
          bottom: '0',
          left: '0',
          margin: ' auto',
          right: '0',
          top: '50px',
          transform: 'none !important',
        },
        '.padding-48':{
          padding: '48px 0 80px 0',
        },
        '.padding-12':{
          padding: '12px 0 0 0',
        },
        
        '.header': {
          gap: '10px',
        },
        '.gap-24': {
          gap: '24px',
        }
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
