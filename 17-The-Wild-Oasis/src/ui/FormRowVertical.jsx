import FormRow from "./FormRow";

function FormRowVertical({ label, error, children }) {
  return <FormRow label={label} error={error} children={children} />;
}

export default FormRowVertical;
