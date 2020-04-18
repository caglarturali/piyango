/**
 * DrawDisplay->Details component.
 */
import React, { useMemo } from 'react';
import {
  DrawDataType,
  GameID,
  LotteryReportLine,
  RegularDrawData,
  RegularReportLine,
  ReportLineType,
} from '@caglarturali/piyango-common';
import { MoneyUtils } from '@caglarturali/piyango-utils';
import { makeStyles } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from '../styles';

const useStyles = makeStyles(styles);

export interface DetailsProps {
  gameId: GameID;
  expanded: boolean;
  report: ReportLineType[];
  drawData: DrawDataType;
}

const Details: React.FunctionComponent<DetailsProps> = ({
  gameId,
  expanded,
  report,
  drawData,
}) => {
  const classes = useStyles();

  const winnersText = (count: number) => {
    if (count > 0) return Number(count).toLocaleString();

    const { devirSayisi } = drawData as RegularDrawData;
    if (devirSayisi) return `${devirSayisi}. Devir`;
    return 'Devretti';
  };

  const renderReportRegular = (r: RegularReportLine[]) => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="none" />
            <TableCell align="right">Kişi Sayısı</TableCell>
            <TableCell padding="none" align="right">
              İkramiye
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {r.map(({ type, winnersCount, prize }, i) => (
            <TableRow key={`report-line-${i}`}>
              <TableCell padding="none">{type}</TableCell>
              <TableCell align="right">{winnersText(winnersCount)}</TableCell>
              <TableCell padding="none" align="right">
                {new MoneyUtils(prize).format(2, true)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  const renderReportLottery = (r: LotteryReportLine[]) => {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="default">Tür</TableCell>
            <TableCell padding="default" align="right">
              İkramiye
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {r.map(({ type, winningNumbers, prize }, i) => (
            <React.Fragment key={`report-line-${i}`}>
              <TableRow classes={{ root: classes.piyangoTopRow }}>
                <TableCell
                  classes={{ root: classes.piyangoCell }}
                  padding="none"
                >
                  {i === 0 ? 'Büyük İkramiye' : type}
                </TableCell>
                <TableCell
                  classes={{ root: classes.piyangoCell }}
                  align="right"
                >
                  {new MoneyUtils(prize).format(2, true)}
                </TableCell>
              </TableRow>

              {/* Numbers row */}
              <TableRow classes={{ root: classes.piyangoBottomRow }}>
                <TableCell colSpan={2}>
                  <Grid
                    container
                    spacing={1}
                    className={classes.piyangoNumbers}
                  >
                    {winningNumbers
                      .sort((a, b) => Number(a) - Number(b))
                      .map((num) => (
                        <Grid item xs={4} sm={3} lg={2} key={`piyango-${num}`}>
                          {num}
                        </Grid>
                      ))}
                  </Grid>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    );
  };

  const reportRendered = useMemo(() => {
    return gameId === GameID.piyango
      ? renderReportLottery(report as LotteryReportLine[])
      : renderReportRegular(report as RegularReportLine[]);
  }, [gameId, report]);

  return (
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>{reportRendered}</CardContent>
    </Collapse>
  );
};

export default Details;
