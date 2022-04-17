import type { User } from '@prisma/client';
import { Field, Form } from 'formik';

interface Props {
  isSubmitting: boolean;
  status: any;
  managers: Pick<User, 'id' | 'name' | 'email'>[];
  submitButtonText: string;
}

const VenueForm: React.VFC<Props> = ({
  isSubmitting,
  status,
  managers,
  submitButtonText,
}) => (
  <Form className="d-flex flex-column">
    <label htmlFor="name" className="form-label">
      Name*
    </label>
    <Field type="text" id="name" name="name" required />
    <label htmlFor="description" className="form-label mt-3">
      Description
    </label>
    <Field type="text" id="description" name="description" />
    <label htmlFor="managers" className="form-label mt-3">
      Managers
    </label>
    <Field as="select" multiple id="managers" name="managers">
      {managers.map((manager) => (
        <option key={manager.id} value={manager.id}>
          {manager.email}
        </option>
      ))}
    </Field>
    <div className="form-check form-switch mt-3">
      <Field
        type="checkbox"
        id="enabled"
        name="enabled"
        className="form-check-input"
      />
      <label htmlFor="enabled" className="form-check-label">
        Enabled
      </label>
    </div>
    <span className="text-muted mt-3">*Mandatory fields</span>
    <button
      type="submit"
      className="btn btn-primary mt-3"
      disabled={isSubmitting}
    >
      {submitButtonText}
    </button>
    {status?.error && (
      <div className="alert alert-danger mt-3">{status.error.message}</div>
    )}
  </Form>
);

export default VenueForm;
