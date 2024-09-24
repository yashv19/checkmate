import { Tabs, Tab } from '@mui/material';
import './App.css';
import Header from './components/Header';
import ListContainer from './components/List/ListContainer';
import theme from './components/base_components/Theme';
import { ThemeProvider } from '@emotion/react';
import TabPanel from './components/base_components/TabPanel';
import { useState } from 'react';
import Card from './components/base_components/Card';
import NotesContainer from './components/Notes/NotesContainer';

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
            <Tabs
              value={tabValue}
              onChange={tabChangeHandler}
              variant="fullWidth"
            >
              <Tab label="Todo List" />
              <Tab label="Notepad" />
            </Tabs>
          </Card>
          <div className="vertical-spacer" />
          <Card className="content-card">
            <TabPanel value={tabValue} index={0}>
              <ListContainer />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <NotesContainer />
            </TabPanel>

          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
