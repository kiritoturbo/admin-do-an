import React from "react";
import { connect } from "react-redux";
import { TextField, Button, FormLabel } from "@mui/material";
import "./newHotel.css";
import { Field, reduxForm } from "redux-form";
import { createHotel } from "../../action";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
const renderTextField = ({ input, label, meta }) => {
  return (
    <TextField
      {...input}
      label={label}
      error={meta.touched && meta.invalid}
      style={{ width: "100%", marginTop: "20px" }}
    />
  );
};
const renderRadio = ({ input, label, meta }) => {
  return (
    <FormControl
      component="fieldset"
      style={{ width: "100%", marginTop: "20px" }}
    >
      <RadioGroup {...input} row>
        <FormControlLabel value={true} control={<Radio />} label="True" />
        <FormControlLabel value={false} control={<Radio />} label="False" />
      </RadioGroup>
      {label && <FormLabel component="legend">{label}</FormLabel>}
    </FormControl>
  );
};

const DateField = (props) => {
  const {
    meta: { submitting, error, touched },
    input: { onBlur, value, ...inputProps },
    ...others
  } = props;

  const onChange = (date) => {
    Date.parse(date)
      ? inputProps.onChange(date.toISOString())
      : inputProps.onChange(null);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        style={{ width: "100%", marginTop: 10 }}
        {...inputProps}
        {...others}
        format="dd/MM/yyyy"
        value={value ? new Date(value) : null}
        onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
        error={error && touched}
        disabled={submitting}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};
function NewHotel(props) {
  const onSubmit = (formValues) => {
    props.createHotel({
      ...formValues,
      // passengerCapacity: [
      //   { seatType: "Eco", amount: formValues.Eco },
      //   { seatType: "Deluxe", amount: formValues.Deluxe },
      //   { seatType: "SkyBOSS", amount: formValues.SkyBOSS },
      // ],
    });
  };

  return (
    <div className="newAirliner">
      <div className="newAirlinerTitleContainer">
        <h1 className="newAirlinerTitile">New hotels</h1>
      </div>
      <div className="newAirlinerWrapper">
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Field name="name" component={renderTextField} label="Name" />
          <Field name="type" component={renderTextField} label="Type" />
          <Field name="city" component={renderTextField} label="City" />
          <Field name="address" component={renderTextField} label="Address" />
          <Field name="desc" component={renderTextField} label="Desc" />
          <Field name="distance" component={renderTextField} label="Distance" />
          <Field name="rating" component={renderTextField} label="Rating" />
          <Field name="featured" component={renderRadio} label="Featured" />

          <Field
            name="cheapestPrice"
            component={renderTextField}
            label="Cheapest Price"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "30px" }}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}

const validate = (formValues) => {
  const error = {};
  const requiredFields = [
    "name",
    "type",
    "city",
    "address",
    "Distance",
    "desc",
    "rating",
    "cheapestPrice",
  ];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      error[field] = "Không bỏ trống";
    }
  });

  return error;
};

const newHotelForm = reduxForm({
  form: "newHotelForm",
  validate: validate,
})(NewHotel);

export default connect(null, { createHotel })(newHotelForm);
