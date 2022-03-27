import { Formik } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import DashboardLayout from 'components/DashboardLayout';
import { useRouter } from 'next/router';
import VenueForm from 'components/VenueForm';
import type { ParsedUrlQuery } from 'querystring';
import type { Venue } from 'src/models/VenueModel';
import type { User } from 'src/models/UserModel';
import VenueService from 'src/services/VenueService';
import UserService from 'src/services/UserService';

interface Props {
  venue: Venue & { _id: string };
  managers: (User & { _id: string })[];
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  params,
}) => {
  if (!params?.id) {
    return {
      notFound: true,
    };
  }

  // TODO: Handle 404 errors
  const venueService = new VenueService();
  const venue = await venueService.getVenue(params.id);

  // TODO: Update with query filtering
  const userService = new UserService();
  const managers = await userService.listUsers();

  return {
    props: {
      venue: JSON.parse(JSON.stringify(venue)),
      managers: JSON.parse(JSON.stringify(managers)),
    },
  };
};

const EditVenue: NextPage<Props> = ({ venue, managers }) => {
  const router = useRouter();
  return (
    <DashboardLayout>
      <Formik
        initialValues={venue}
        onSubmit={async (values, { setStatus }) => {
          try {
            const res = await fetch(`/api/venues/${venue._id}`, {
              method: 'PUT',
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
            submitButtonText="Update"
          />
        )}
      </Formik>
    </DashboardLayout>
  );
};

export default EditVenue;
