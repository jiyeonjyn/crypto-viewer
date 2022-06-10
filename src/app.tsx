import React, { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import CoinList from './pages/coin_list';
import Coin from './pages/coin';
import PriceChart from './components/price_chart';
import PriceTable from './components/price_table';
import { darkTheme, lightTheme } from './theme';
// import { ReactQueryDevtools } from 'react-query/devtools';

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}
a {
  text-decoration:none;
  color:inherit;
}
`;

function App() {
  const [isLightTheme, setIsLightTheme] = useState(
    window.localStorage.getItem('theme') === 'light'
  );
  const switchTheme = useCallback(() => {
    if (isLightTheme) {
      setIsLightTheme(false);
      window.localStorage.setItem('theme', 'dark');
    } else {
      setIsLightTheme(true);
      window.localStorage.setItem('theme', 'light');
    }
  }, [isLightTheme]);

  return (
    <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<CoinList switchTheme={switchTheme} />} />
        <Route path="/:coinId/*" element={<Coin switchTheme={switchTheme} />}>
          <Route
            path="chart"
            element={<PriceChart isLightTheme={isLightTheme} />}
          />
          <Route path="price" element={<PriceTable />} />
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </ThemeProvider>
  );
}

export default App;
