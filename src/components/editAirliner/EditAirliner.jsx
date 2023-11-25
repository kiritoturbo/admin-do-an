import React from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Field, reduxForm } from "redux-form";
import { editAirliner, fetchAirliner } from "../../action";
import { useEffect } from "react";
import "./editAirliner.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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

function EditAirliner(props) {
  useEffect(() => {
    // props.fetchAirliner(props.match.params.id);
    props.fetchAirliner(props.idss);
  }, []);

  const onSubmit = (formValues) => {
    // props.editAirliner(props.airliner._id, {
    props.editAirliner(props.idss, {
      ...formValues,
      passengerCapacity: [
        { seatType: "Eco", amount: formValues.Eco },
        { seatType: "Deluxe", amount: formValues.Deluxe },
        { seatType: "SkyBOSS", amount: formValues.SkyBOSS },
      ],
    });
  };

  if (!props.airliner) return <div>Loading...</div>;

  return (
    <div className="newAirliner">
      <div className="newAirlinerTitleContainer">
        <h1 className="newAirlinerTitile">Edit airliner</h1>
      </div>
      <div className="newAirlinerWrapper">
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Field name="model" component={renderTextField} label="Model" />
          <Field
            name="manufacturer"
            component={renderTextField}
            label="Manufacturer"
          />
          <Field
            name="dateOfCommissioning"
            component={DateField}
            label="Date of Commissioning"
            className="w-full mt-5"
          />
          <Field name="Eco" component={renderTextField} label="ECO capacity" />
          <Field
            name="Deluxe"
            component={renderTextField}
            label="Deluxe capacity"
          />
          <Field
            name="SkyBOSS"
            component={renderTextField}
            label="SkyBOSS capacity"
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
    "model",
    "manufacturer",
    "dateOfCommissioning",
    "Eco",
    "Deluxe",
    "SkyBOSS",
  ];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      error[field] = "Không bỏ trống";
    }
  });

  return error;
};

const EditAirlinerForm = reduxForm({
  form: "editAirlinerForm",
  validate: validate,
})(EditAirliner);

const mapStateToProps = (state, ownProps) => {
  // const airliner = state.airliners[ownProps.match.params.id];
  const airliner = state.airliners[ownProps.idss];
  console.log("state airliner" + airliner?.dateOfCommissioning);
  return {
    airliner: airliner,
    initialValues: {
      model: airliner?.model,
      manufacturer: airliner?.manufacturer,
      dateOfCommissioning: airliner?.dateOfCommissioning,
      Eco: airliner?.passengerCapacity[0].amount,
      Deluxe: airliner?.passengerCapacity[1].amount,
      SkyBOSS: airliner?.passengerCapacity[2].amount,
    },
  };
};

export default connect(mapStateToProps, { fetchAirliner, editAirliner })(
  EditAirlinerForm
);
