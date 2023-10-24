import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import cursorIcon from '../assets/img/cursor.png';
import backgroundGif1 from '../assets/img/background/backgroundGif1.gif';

const GlobalStyles = createGlobalStyle`
    :root {
        /* --font-color-yellow: #AAAAAA; */
    }
    ${reset}
    // 적용시킬 css 입력
    a{
        text-decoration: none;
        color: inherit;
        font-family: "Galmuri14", sans-serif;
    }
    *{
        box-sizing: border-box;
        font-family: "Galmuri14", sans-serif;
        cursor: url(${cursorIcon}) 2 2, auto;
    }
    *:hover{
    cursor: url(${cursorIcon}) 2 2, auto;
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 14px;
        vertical-align: baseline;
        font-family: "Galmuri14", sans-serif;
    }
    body{
        width: 100vw;
        height: 100vh;
        line-height: 1;
        overflow: hidden;
        background-image: url(${backgroundGif1});
        background-size: cover;
        object-fit: cover;
        object-position: 50% 50%;
    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyles;
