import React from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar-edit';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import SaveIcon from '@material-ui/icons/Save';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

class ProfileImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: null,
      imageSelected: false,
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
    this.handleSaveImage = this.handleSaveImage.bind(this)
  }

  onClose() {
    this.setState({ base64: null });
  }

  onCrop(base64) {
    console.log('preview', base64);
    this.setState({ base64 });
  }

  onBeforeFileLoad(elem) {
    if (elem.target.files[0].size > 71680) {
      alert('File is too big!');
      elem.target.value = '';
    }
  }

  handleSaveImage() {

  }

  render() {
    return (
      <div>
        <div className="avatar-container">
          <Avatar
            width={90}
            height={90}
            onCrop={this.onCrop}
            onClose={this.onClose}
            onBeforeFileLoad={this.onBeforeFileLoad}
            src={this.state.src}
            label={<AddAPhotoIcon />}
            labelStyle={{
              height: '50px',
              width: '50px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: 'unset',
            }}
            borderStyle={{
              border: '2px dashed rgb(151, 151, 151)',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              lineHeight: 'unset',
              width: '100%'
            }}
          />
          {/* {this.state.base64 ? <img src={this.state.base64} alt="Preview" /> : null } */}
        </div>
        <div className="avatar-options">
          {/* <span>Save</span> */}
          {this.state.base64 ? <SaveIcon onClick={this.handleSaveImage} /> : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    activity: {
      currentUser: state.activity.currentUser,
      allUsers: state.activity.allUsers,
    },
    tableData: {
      activityHistory: state.activity.tableData.activityHistory,
    },
    chartData: {
      leaderboard: state.activity.chartData.leaderboard,
      monthlyPerformance: state.activity.chartData.monthlyPerformance,
    },
    loaders: {
      activityDeleted: state.activity.loaders.activityDeleted,
    },
  };
};

export default connect(mapState)(ProfileImage);
