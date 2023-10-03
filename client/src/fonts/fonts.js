import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @font-face {
        font-family: 'KCC-DodamdodamR';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-DodamdodamR.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;
