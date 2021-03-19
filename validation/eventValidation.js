const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateEventInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator functions
  data.EMail = !isEmpty(data.EMail) ? data.EMail : "";
  data.EventName = !isEmpty(data.EventName) ? data.EventName : "";
  data.EventType = !isEmpty(data.EventType) ? data.EventType : "";
  data.EventStart = !isEmpty(data.EventStart) ? data.EventStart : "";
  data.EventEnd = !isEmpty(data.EventEnd) ? data.EventEnd : "";
  data.NoPeople = !isEmpty(data.NoPeople) ? data.NoPeople : "";
  data.EventPlace = !isEmpty(data.EventPlace) ? data.EventPlace : "";

// Email checks
if (Validator.isEmpty(data.EMail)) {
    errors.EMail = "Email field is required";
  } else if (!Validator.isEmail(data.EMail)) {
    errors.EMail = "Email is invalid";
  }
// Event Name checks
  if (Validator.isEmpty(data.EventName)) {
    errors.EventName = "Event Name field is required";
  }
// Event Type checks
  if (Validator.isEmpty(data.EventType)) {
    errors.EventType = "Event Type field is required";
  } 
// Event Date checks
  if (Validator.isEmpty(data.EventStart)) {
    errors.EventStart = "Event start field is required";
  }
if (Validator.isEmpty(data.EventEnd)) {
    errors.EventEnd = "Evenet End field is required";
  }
if (Validator.equals(data.EventStart, data.EventEnd)) {
    errors.EventEnd = "Event must be 1 day long";
  }
  // Number of People Check
  if (Validator.isEmpty(data.NoPeople)) {
    errors.NoPeople = "Number of People Place field is required";
  }
  var number = Validator.toInt(data.NoPeople);
  if (!number > 0 && number <= 20) {
    errors.NoPeople= "Number of people must be between 1 and 20";
 }
 // Event place Check
 if (Validator.isEmpty(data.EventPlace)) {
    errors.EventPlace = "Event Place field is required";
  }
  
return {
    errors,
    isValid: isEmpty(errors)
  };
};