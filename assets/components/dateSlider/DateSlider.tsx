import React, { Component, useEffect, useState } from 'react';

// Date a Material UI
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider,KeyboardDatePicker } from '@material-ui/pickers';
import { Grid, makeStyles, Typography } from '@material-ui/core';


// Props
interface Props {
	filterByDates: (beginDate: Date, endDate: Date) => void
}


// Styles
// h3 + datumy niesu najlepsie vycentrovane do stredu
const useStyles = makeStyles((theme) => ({
  h3: {
    ...theme.typography.button,
    backgroundColor: "#e8dccc",
    padding: theme.spacing(1),
		maxWidth: "60%",
		marginTop: 5,
		marginBottom: 5,
		fontSize: 15,
		textAlign: "center",
		borderRadius: "5px",
  },
	grid: {
		marginTop: 20,
		marginBottom: 20
	}, 
	datePicker: {
		width: "75%"
	}
}));



const DateSlider = (props: Props) => {
	// Constants
  const [begginingDate, setBegginingDate] = useState<Date | null>()
	const [endingDate, setEndingDate] = useState<Date | null>()
	const classes = useStyles();
	const setDates = props.filterByDates


	// Odchytenie zaciatku datumu
	const handleBegginingDate = (date: Date | null) => {
		setBegginingDate(date);
	};


	// Odchytenie koncovehao datumu
	const handleEndingDate = (date: Date | null) => {
		setEndingDate(date);
	}


	// Poslanie datumu do OrdersPage
	useEffect(() => {
		if(begginingDate && endingDate) {
			setDates(begginingDate, endingDate)
		}
	}, [begginingDate, endingDate])


	// Render
  return (
		<Grid 
			container 
			justify = "center" 
			alignItems = "center"
		>
			<Grid item className={classes.grid} >
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Typography variant="h3" align="center" className={classes.h3}>
						Pociatocny datum
					</Typography>
					<KeyboardDatePicker
						className = {classes.datePicker}
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						id="date-picker"
						value={begginingDate}
						onChange={handleBegginingDate}
						disableFuture = {true}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
			<Grid item className={classes.grid} >
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<Typography variant="h3" align="center" className={classes.h3}>
						Koncovy datum
					</Typography>
					<KeyboardDatePicker
						className = {classes.datePicker}
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="normal"
						id="date-picker"
						value={endingDate}
						onChange={handleEndingDate}
						disableFuture = {true}
					/>
				</MuiPickersUtilsProvider>
			</Grid>
		</Grid>
  );
}

export default DateSlider