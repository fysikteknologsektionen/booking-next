import { Formik } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import DashboardLayout from 'components/DashboardLayout';
import { useRouter } from 'next/router';
import VenueForm from 'components/VenueForm';
import type { Venue } from 'src/models/VenueModel';
import type { User } from 'src/models/UserModel';
import UserService from 'src/services/UserService';

interface Props {
  managers: (User & { _id: string })[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const service = new UserService();

  // TODO: Update with query filtering
  const managers = await service.listUsers();

  return {
    props: {
      managers: JSON.parse(JSON.stringify(managers)),
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
