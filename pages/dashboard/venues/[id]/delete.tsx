import DashboardLayout from 'components/DashboardLayout';
import type { VenueDocument } from 'models/VenueModel';
import VenueController from 'controllers/VenueController';
import type { LeanDocument } from 'mongoose';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';

interface Props {
  venue: LeanDocument<VenueDocument>;
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
      return {
        props: {
          venue: JSON.parse(JSON.stringify(venue)),
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

const DeleteVenue: NextPage<Props> = ({ venue }) => {
  const router = useRouter();
  const deleteVenue = async () => {
    const res = await fetch(`/api/venues/${venue._id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Network error: ${res.status} ${res.statusText}`);
    }

    router.push('/dashboard/venues');
  };

  return (
    <DashboardLayout>
      <p>
        Are you absolutely sure you want to want to delete the venue &quot;
        {venue.name}
        &quot;?
      </p>
      <p className="fw-bold">This action cannot be undone.</p>
      <button className="btn btn-danger" type="button" onClick={deleteVenue}>
        Delete
      </button>
    </DashboardLayout>
  );
};

export default DeleteVenue;
