/**
 * Count Component.
 */
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { DrawDataType, Game } from '@caglarturali/piyango-common';
import { withStyles, WithStyles } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import ModeCommentIcon from '@material-ui/icons/ModeCommentOutlined';
import { CommentCount } from 'disqus-react';
import { disqus } from '../../../config';
import { getDisqusConfig } from '../Disqus';
import styles from './styles';

export interface CountProps {
  game: Game;
  drawData: DrawDataType;
}

export interface CountState {
  loading: boolean;
  count: number | null;
}

class Count extends Component<CountProps & WithStyles, CountState> {
  observer?: MutationObserver;
  countRef?: CommentCount | null;

  state = {
    loading: true,
    count: null,
  };

  componentDidMount() {
    if (this.countRef) {
      const target = ReactDOM.findDOMNode(this.countRef) as Element;

      this.observer = new MutationObserver((mutationRecord) => {
        mutationRecord.forEach((mt) => {
          const [firstNode] = mt.addedNodes;
          const { nodeValue } = firstNode;
          const commentNumber = nodeValue ? Number(nodeValue.split(' ')[0]) : 0;

          this.setCount(commentNumber);
        });
      });

      const config = {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      };

      this.observer.observe(target, config);
    } else {
      this.setCount(0);
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  setCount = (count: number) => {
    this.setState({ count, loading: false });
  };

  render() {
    const { game, drawData, classes } = this.props;
    const { loading, count } = this.state;
    const { shortname } = disqus;

    return (
      <Fragment>
        <span className={classes.originalCount}>
          <CommentCount
            ref={(r) => (this.countRef = r)}
            shortname={shortname}
            config={getDisqusConfig(game, drawData)}
          />
        </span>

        {!loading ? (
          <Badge
            color="secondary"
            badgeContent={count}
            max={999}
            showZero
            classes={{ badge: classes.badge }}
          >
            <ModeCommentIcon />
          </Badge>
        ) : (
          <ModeCommentIcon />
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Count);
