import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BugReportIcon from '@material-ui/icons/BugReport';
import {
  CategoryProvider,
  CategoryTitle,
  CategoryItem,
} from '@mui-treasury/components/menu/category';
import { useMagCategoryMenuStyles } from '@mui-treasury/styles/categoryMenu/mag';

const Footer = React.memo(function MagCategoryMenu() {
  return (
    <Box minWidth={'100%'} id="footer-container">
        <Grid container id="grid-container">
          <Grid item xs="auto">
            <CategoryProvider className="footer-category">
              <CategoryTitle>
                Quick Links
              </CategoryTitle>
              <CategoryItem>
                Home
              </CategoryItem>
              <CategoryItem>
                Activity
              </CategoryItem>
              <CategoryItem>
                Challenges
              </CategoryItem>
              <CategoryItem>
                Account
              </CategoryItem>
            </CategoryProvider>
          </Grid>
          
          <Grid item xs="auto">
            <CategoryProvider className="footer-category">
              <CategoryTitle>
                Troubleshooting
              </CategoryTitle>
              <CategoryItem>
                Help Center
              </CategoryItem>
              <CategoryItem>
                Report a bug
              </CategoryItem>
            </CategoryProvider>
          </Grid>

          <Grid item xs="auto">
            <CategoryProvider className="footer-category">
              <CategoryTitle>
                Connect
              </CategoryTitle>
              <CategoryItem id="icon-category">
                <InstagramIcon />
                <a>Instagram</a>
              </CategoryItem>
              <CategoryItem id="icon-category">
                <MailOutlineIcon />
                <a>Email us</a>
              </CategoryItem>
            </CategoryProvider>
          </Grid>
        </Grid>
    </Box>
  );
});

const mapState = state => {
  return {
    user: state.user,
    workouts: state.activity.userWorkouts,
    activityTableData: state.activity.activityHistoryTableData
  };
};

export default connect(mapState)(Footer);