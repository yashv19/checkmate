import './App.css';
// import coverPhotoSrc from './coverphoto.avif';
import Header from './components/Header';
import ListContainer from './components/List/ListContainer';
import theme from './components/UI/Theme';
import { ThemeProvider } from '@emotion/react';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* <img className="coverphoto" src={coverPhotoSrc} alt="cover" /> */}
      {/* <div className='vertical-spacer' /> */}
      <div className="wrapper">
        <div className="maincontent">
          <Header />
          <div className='vertical-spacer' />
          <ListContainer />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
