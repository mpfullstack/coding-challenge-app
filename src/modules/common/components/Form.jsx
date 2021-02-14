import * as React from "react";
import { useFormState } from "react-use-form-state";

const Form = ({ onSubmit, formData, renderForm, errors = [] }) => {
  const [formState, input] = useFormState(formData);

  React.useEffect(() => {
    errors.forEach(error => {
      formState.setFieldError(error.field, error.error);
    })
  }, [errors, formState]);

  function handleSubmit(e) {
    if (typeof onSubmit === 'function') {
      onSubmit(e, formState.values);
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {renderForm(formState, input)}
    </form>
  );
};

export default Form;