import DashboardLayout from 'components/DashboardLayout';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import type { Venue } from 'src/models/VenueModel';
import VenueService from 'src/services/VenueService';

interface Props {
  venue: Venue & { _id: string };
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
  const service = new VenueService();
  const venue = await service.getVenue(params.id);

  return {
    props: {
      venue: JSON.parse(JSON.stringify(venue)),
    },
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
