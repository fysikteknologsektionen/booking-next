import { Formik } from 'formik';
import type { InferGetServerSidePropsType, NextPage } from 'next';
import DashboardLayout from 'components/DashboardLayout';
import { useRouter } from 'next/router';
import VenueForm from 'components/VenueForm';
import { getManagers } from 'services/user';
import type { Prisma } from '@prisma/client';

export const getServerSideProps = async () => {
  const managers = await getManagers();
  return { props: { managers } };
};

const initialValues: Prisma.VenueCreateInput = {
  name: '',
  description: undefined,
  managers: undefined,
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
