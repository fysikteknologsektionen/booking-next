import { Formik } from 'formik';
import type { GetServerSideProps, NextPage } from 'next';
import type { VenueDocument } from 'models/VenueModel';
import type { UserDocument } from 'models/UserModel';
import UserModel from 'models/UserModel';
import DashboardLayout from 'components/DashboardLayout';
import { useRouter } from 'next/router';
import type { LeanDocument } from 'mongoose';
import VenueForm from 'components/VenueForm';
import type { ParsedUrlQuery } from 'querystring';
import VenueController from 'controllers/VenueController';

interface Props {
  venue: LeanDocument<VenueDocument>;
  managers: LeanDocument<UserDocument>[];
}

interface Query extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  params,
}) => {
  try {
    if (params?.id) {
      const venueController = new VenueController();
      const venue = await venueController.get(params.id);

      const managers = await UserModel.find()
        .where('role')
        .in(['manager', 'admin'])
        .lean()
        .exec();

      return {
        props: {
          venue: JSON.parse(JSON.stringify(venue)),
          managers: JSON.parse(JSON.stringify(managers)),
        },
      };
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
  }
  return {
    notFound: true,
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
