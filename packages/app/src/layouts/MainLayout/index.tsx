/**
 * MainLayout component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import styles from './styles';
import DocumentHead from '../DocumentHead';
import PSnackbar from '../../components/PSnackbar';
import MainMenu from './MainMenu';

const useStyles = makeStyles(styles);

export interface MainLayoutProps {
  pageTitle?: string;
  contentTitle: string;
}

const MainLayout: React.FunctionComponent<MainLayoutProps> = ({
  pageTitle,
  contentTitle,
  children,
}) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <DocumentHead title={pageTitle} />
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {contentTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <MainMenu
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>{children}</div>
        <PSnackbar />
      </main>
    </div>
  );
};

MainLayout.propTypes = {
  pageTitle: PropTypes.string,
  contentTitle: PropTypes.string.isRequired,
};

export default MainLayout;
