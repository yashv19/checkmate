import './App.css';
import theme from './components/base_components/Theme';
import { ThemeProvider } from '@mui/material/styles';
import Layout from './components/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotesPage from './pages/NotesPage';
import TodoListPage from './pages/TodoListPage';
import NotFound from './pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: "/", element: <TodoListPage />},
      { path: "/notes/:noteId", element: <NotesPage /> },
      { path: "*", element: <NotFound /> }
    ]
  },
  // {
  //   path: '*',
  //   element: <NotFound />
  // }
])

function App() {

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
  // const [tabValue, setTabValue] = useState(0);

  // const tabChangeHandler = (e, newTabValue) => {
  //   setTabValue(newTabValue)
  // }

  // return (
  //     <div className="wrapper">
  //         <div className="sidebar">
  //           <Sidebar />
  //         </div>
  //         <div className="content">
  //           <Header />
  //           <div className='vertical-spacer' />
  //           <Card className="tab-card">
  //             <Tabs
  //               value={tabValue}
  //               onChange={tabChangeHandler}
  //               variant="fullWidth"
  //             >
  //               <Tab label="Todo List" />
  //               <Tab label="Notepad" />
  //             </Tabs>
  //           </Card>
  //           <div className="vertical-spacer" />
  //           <TabPanel value={tabValue} index={0}>
  //             <ListContainer />
  //           </TabPanel>
  //           <TabPanel value={tabValue} index={1}>
  //             <NotesContainer />
  //           </TabPanel>
  //         </div>
  //     </div>
  // );
}

export default App;
