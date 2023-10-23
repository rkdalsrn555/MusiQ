import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    :root {
        /* --font-color-yellow: #AAAAAA; */
    }
    ${reset}
    // 적용시킬 css 입력
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 14px;
        vertical-align: baseline;
    }
    body{
        line-height: 1;
        font-family: "Galmuri14", sans-serif;
        background-color: #F6F9F0;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
        font-family: "Galmuri14", sans-serif;
    }
`;

export default GlobalStyles;
