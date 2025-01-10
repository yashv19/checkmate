import { Typography } from '@mui/material'
import Page from '../components/base_components/Page'

const NotFound = () => {

  return (
    <Page>
      <Typography
        variant='h4'
        sx={{
          fontWeight: 'bold',
          alignSelf: 'center'
        }}
      >
        😢 Oh no! Page not found :(
      </Typography>
    </Page>
  )
}

export default NotFound
