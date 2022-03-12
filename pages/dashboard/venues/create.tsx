import { Field, Form, Formik } from 'formik';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import type { Venue, VenueDocument } from '@models/VenueModel';
import UserModel from '@models/UserModel';
import DashboardLayout from '@components/DashboardLayout';
import { useRouter } from 'next/router';
import type { LeanDocument } from 'mongoose';

export const getServerSideProps = async () => {
  const managers = await UserModel.find()
    .where('role')
    .in(['manager', 'admin'])
    .lean()
    .exec();

  return {
    props: {
      managers,
    },
  };
};

const initialValues: Venue = {
  name: '',
  description: '',
  managers: [],
  enabled: false,
};

const CreateVenue: NextPage<
InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ managers }) => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, { setStatus }) => {
          try {
            const res = await fetch('/api/venues', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            });
            if (!res.ok) {
              throw new Error(`Network error: ${res.status} ${res.statusText}`);
            }
            const venue: LeanDocument<VenueDocument> = await res.json();
            router.push(`/dashboard/venues/${venue._id}`);
          } catch (error) {
            setStatus({ error });
          }
        }}
      >
        {({ isSubmitting, status }) => (
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
            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
              Create
            </button>
            { status?.error && <div className="alert alert-danger mt-3">{status.error.message}</div> }
          </Form>
        )}
      </Formik>
    </DashboardLayout>
  );
};

export default CreateVenue;
