import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    borderRadius: 0,
  }
})

class NavIcon extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      < Tooltip title={this.props.title} enterDelay={500} leaveDelay={200} >
        <IconButton className={classes.button} onClick={this.props.onClick}>
          <img src={this.props.src} alt={this.props.alt}></img>
        </IconButton>
      </Tooltip >
    );
  }
}

NavIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavIcon);