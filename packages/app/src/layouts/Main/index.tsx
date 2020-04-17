/**
 * Main layout component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './styles';
import DocumentHead from '../components/DocumentHead';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import PSnackbar from '../../components/PSnackbar';
import CheckCoupon from '../../components/CheckCoupon';
import { useDrawsState, useGlobalState } from '../../contexts';

const useStyles = makeStyles(styles);

export interface MainProps {
  pageTitle?: string;
  contentTitle: string;
}

const Main: React.FC<MainProps> = ({ pageTitle, contentTitle, children }) => {
  const theme = useTheme();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { snackbar } = useGlobalState();
  const { checkcoupon } = useDrawsState();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={clsx(classes.root, { [classes.shiftContent]: isDesktop })}>
      <DocumentHead title={pageTitle} />
      <CssBaseline />
      <Topbar contentTitle={contentTitle} onMenuClick={handleDrawerToggle} />
      <Sidebar
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant={isDesktop ? 'permanent' : 'temporary'}
      />
      <main className={classes.content}>
        <div>{children}</div>
        <Footer />
        {/* Conditional components */}
        {snackbar && <PSnackbar {...snackbar} />}
        {checkcoupon && <CheckCoupon {...checkcoupon} />}
      </main>
    </div>
  );
};

Main.propTypes = {
  pageTitle: PropTypes.string,
  contentTitle: PropTypes.string.isRequired,
};

export default Main;
