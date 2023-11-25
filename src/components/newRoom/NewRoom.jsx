import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Button,
  FormLabel,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import "./newRoom.css";
import { Field, reduxForm } from "redux-form";
import { createRoom, fetchHotels } from "../../action";
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

const renderSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  console.log(input);
  return (
    <FormControl
      error={touched && error}
      style={{ width: "100%", marginTop: 15 }}
    >
      <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        inputProps={{
          name: "age",
          id: "age-native-simple",
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};
const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

function NewRoom(props) {
  useEffect(() => {
    props.fetchHotels();
  }, []);
  const onSubmit = (formValues) => {
    const hotelId = formValues["hotelId"];
    if (hotelId) {
      props.createRoom({
        hotelId,
        ...formValues,
        roomNumbers: { value: formValues.roomNumbers },
      });
    }
  };
  if (!props.hotels) return <div>Loading...</div>;
  return (
    <div className="newAirliner">
      <div className="newAirlinerTitleContainer">
        <h1 className="newAirlinerTitile">New rooms</h1>
      </div>
      <div className="newAirlinerWrapper">
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Field name="title" component={renderTextField} label="Title" />
          <Field name="desc" component={renderTextField} label="Desc" />
          <Field name="price" component={renderTextField} label="Price" />
          <Field
            name="maxPeople"
            component={renderTextField}
            label="Max People"
          />
          <Field name="hotelId" component={renderSelect} label="Hotel id">
            <option value=""></option>
            {props.hotels.map((hotel) => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.name}
              </option>
            ))}
          </Field>
          <Field
            name="roomNumbers"
            component={renderTextField}
            label="Room Number"
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
  const requiredFields = ["title", "desc", "price", "maxPeople", "roomNumbers"];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      error[field] = "Không bỏ trống";
    }
  });

  return error;
};

const newRoomForm = reduxForm({
  form: "newRoomForm",
  validate: validate,
})(NewRoom);
const mapStateToProps = (state) => {
  return {
    hotels: Object.values(state.hotels),
    alert: state.alert,
  };
};

export default connect(mapStateToProps, {
  fetchHotels,
  createRoom,
})(newRoomForm);
