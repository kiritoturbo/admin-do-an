import React from "react";
import { connect } from "react-redux";
import { Button, FormLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Field, reduxForm } from "redux-form";
import { fetchHotels, editHotel } from "../../action";
import { useEffect } from "react";
import "./editHotel.css";
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
        disableFuture
        style={{ width: "100%", marginTop: 10 }}
        {...inputProps}
        {...others}
        format="dd/MM/yyyy"
        value={value ? new Date(value) : null}
        onBlur={() => onBlur(value ? new Date(value).toISOString() : null)}
        error={error && touched}
        // disabled={submitting}
        onChange={onChange}
      />
    </LocalizationProvider>
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

function EditHotel(props) {
  useEffect(() => {
    // props.fetchAirliner(props.match.params.id);
    props.fetchHotels(props.idss);
  }, []);

  const onSubmit = (formValues) => {
    // props.editAirliner(props.airliner._id, {
    props.editHotel(props.idss, {
      ...formValues,
      // passengerCapacity: [
      //   { seatType: "Eco", amount: formValues.Eco },
      //   { seatType: "Deluxe", amount: formValues.Deluxe },
      //   { seatType: "SkyBOSS", amount: formValues.SkyBOSS },
      // ],
    });
  };

  if (!props.hotel) return <div>Loading...</div>;

  return (
    <div className="newAirliner">
      <div className="newAirlinerTitleContainer">
        <h1 className="newAirlinerTitile">Edit hotel</h1>
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
            Update
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
    "distance",
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

const EditHotelForm = reduxForm({
  form: "EditHotelForm",
  validate: validate,
})(EditHotel);

const mapStateToProps = (state, ownProps) => {
  // const airliner = state.airliners[ownProps.match.params.id];
  const hotel = state.hotels[ownProps.idss];
  return {
    hotel: hotel,
    initialValues: {
      name: hotel?.name,
      type: hotel?.type,
      city: hotel?.city,
      address: hotel?.address,
      desc: hotel?.desc,
      distance: hotel?.distance,
      rating: hotel?.rating,
      cheapestPrice: hotel?.cheapestPrice,
      featured: hotel?.featured,
    },
  };
};

export default connect(mapStateToProps, { fetchHotels, editHotel })(
  EditHotelForm
);
