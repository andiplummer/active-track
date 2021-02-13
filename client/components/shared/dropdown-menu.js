import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDownloadMenuStyles } from '@mui-treasury/styles/menu/download';
import { useGithubBtnStyles } from '@mui-treasury/styles/button/github';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {
  getUserActivityData,
  deleteActivity,
  updateActivityHistoryTable,
} from '../../store';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  customWidth: {
    '& div': {
      // this is just an example, you can use vw, etc.
      width: '350px',
    },
  },
});

const DropdownMenu = ({ rowId, user, deleteUserActivity }) => {
  const [deleted, setDeleted] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const downloadMenuClasses = useDownloadMenuStyles();
  const buttonStyles = useGithubBtnStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="dropdown-menu-container">
      <Button
        // className={downloadMenuClasses.button}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
        {/* <ExpandMoreIcon className={anchorEl ? downloadMenuClasses.upIcon : downloadMenuClasses.downIcon}/> */}
      </Button>
      <Menu
        id="simple-menu"
        classes={{ paper: downloadMenuClasses.paper }}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleClose}
      >
        <MenuItem
          onClick={() => {
            deleteUserActivity(rowId, user.id);
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
};

const mapState = state => {
  return {
    user: state.user,
    workouts: state.activity.userWorkouts,
    activityTableData: state.activity.activityHistoryTableData,
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData(userId) {
      await dispatch(getUserActivityData(userId));
    },
    async deleteUserActivity(id, userId) {
      await dispatch(deleteActivity(id, userId));
    },
    async updateActivityHistoryTable(data) {
      await dispatch(updateActivityHistoryTable(data));
    },
  };
};

export default connect(mapState, mapDispatch)(DropdownMenu);
