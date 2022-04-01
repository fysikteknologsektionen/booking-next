import { Formik } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import DashboardLayout from 'components/DashboardLayout';
import { useRouter } from 'next/router';
import VenueForm from 'components/VenueForm';
import type { Venue } from 'src/models/VenueModel';
import type { User } from 'src/models/UserModel';
import { listManagers } from 'src/services/UserService';
import defineAbility from 'src/lib/defineAbility';

interface Props {
  managers: (User & { _id: string })[];
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const ability = await defineAbility(req);
  const managers = await listManagers(ability);
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
