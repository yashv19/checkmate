import { Tabs, Tab } from '@mui/material';
import './App.css';
// import coverPhotoSrc from './coverphoto.avif';
import Header from './components/Header';
import ListContainer from './components/List/ListContainer';
import theme from './components/UI/Theme';
import { ThemeProvider } from '@emotion/react';
import TabPanel from './components/UI/TabPanel';
import { useState } from 'react';
import Card from './components/Card';

function App() {

  const [tabValue, setTabValue] = useState(0);

  const tabChangeHandler = (e, newTabValue) => {
    setTabValue(newTabValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="wrapper">
        <div className="maincontent">
          <Header />
          <div className='vertical-spacer' />
          <Card className="tab-card">
            <Tabs value={tabValue} onChange={tabChangeHandler} variant="fullWidth">
              <Tab label="Todo List" />
              <Tab label="Notepad" />
            </Tabs>
            <TabPanel value={tabValue} index={0}>
              <ListContainer />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <div>
                Notes
              </div>
            </TabPanel>

          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
