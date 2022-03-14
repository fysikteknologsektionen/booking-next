import { Formik } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import type { Venue } from 'models/VenueModel';
import type { UserDocument } from 'models/UserModel';
import UserModel from 'models/UserModel';
import DashboardLayout from 'components/DashboardLayout';
import { useRouter } from 'next/router';
import type { LeanDocument } from 'mongoose';
import VenueForm from 'components/VenueForm';

interface Props {
  managers: LeanDocument<UserDocument>[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
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

const CreateVenue: NextPage<Props> = ({ managers }) => {
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

            router.push('/dashboard/venues');
          } catch (error) {
            setStatus({ error });
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <VenueForm
            isSubmitting={isSubmitting}
            status={status}
            managers={managers}
            submitButtonText="Create"
          />
        )}
      </Formik>
    </DashboardLayout>
  );
};

export default CreateVenue;
