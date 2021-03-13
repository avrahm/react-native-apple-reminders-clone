// https://medium.com/eightshapes-llc/light-dark-9f8ea42c9081

function appTheme(mode) {
    let colors = {};
    switch (mode) {
        case 'dark':
            colors = {
                bgPrimary: '#374744',
                bgSecondary: '#262328',
                inputBgPrimary: '#ECEFF1',
                inputFocus: '#FFFFFF',
                inputText: '#262328',
                fontMPrimary: '#FFFFFF',
                fontSecondary: '#ECEFF1',
                fontDisabled: '',
                buttonPrimary: '',
                buttonSecondary: '',
            };
            break;
        default:
            colors = {
                bgPrimary: '#ECEFF1',
                bgSecondary: '#FFFFFF',
                inputBgPrimary: '#374744',
                inputFocus: '#262328',
                inputText: '#FFFFFF',
                fontMPrimary: '#262328',
                fontSecondary: '#374744',
                fontDisabled: '',
                buttonPrimary: '#ECEFF1',
                buttonSecondary: '',
            };
            break;
    }
    return colors;
}
export default appTheme;
