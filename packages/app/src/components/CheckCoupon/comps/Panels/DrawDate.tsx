/**
 * CheckCoupon->Panels->DrawDate component.
 */
import React, { useEffect, useState } from 'react';
import {
  DateFormat,
  DrawDataType,
  DrawDate,
  Game,
  ProcessDraw,
} from '@caglarturali/piyango-common';
import { DateUtils } from '@caglarturali/piyango-utils';
import { makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Panel, { PanelProps } from './Panel';
import API from '../../../../services/API';
import styles from '../../styles';

const useStyles = makeStyles(styles);

export interface DrawDatePanelProps {
  game: Game;
  selectedDate: DrawDate;
  onDateChange: (e: any) => void;
  drawData?: DrawDataType;
}

export const DrawDatePanel: React.FunctionComponent<
  PanelProps & DrawDatePanelProps
> = ({ game, selectedDate, onDateChange, drawData, ...props }) => {
  const classes = useStyles();
  const [drawDates, setDrawDates] = useState<DrawDate[]>([]);

  useEffect(() => {
    const getData = async () => {
      // Use 25 records for now.
      const data = await API.getDrawDates(game.id);
      setDrawDates(data);
    };
    getData();
  }, [game]);

  const dateFriendly = (date: DrawDate) => {
    return DateUtils.convert(date, DateFormat.API, DateFormat.FRIENDLY);
  };

  const summary = drawData ? new ProcessDraw(game.id, drawData).summary() : '';

  return (
    <Panel {...props} secondaryHeading={dateFriendly(selectedDate)}>
      <form className={classes.dateForm} autoComplete="off">
        <FormControl className={classes.formControl}>
          <Select
            value={selectedDate}
            onChange={(e) => {
              onDateChange(e.target.value);
            }}
            input={<Input name="draw-date" id="draw-date" />}
          >
            {drawDates.map((date: DrawDate) => (
              <MenuItem key={`${game.id}-${date}-draw`} value={date}>
                {dateFriendly(date)}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{summary}</FormHelperText>
        </FormControl>
      </form>
    </Panel>
  );
};
