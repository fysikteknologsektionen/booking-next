import DashboardLayout from '@components/DashboardLayout';
import type { VenueDocument } from '@models/VenueModel';
import type { LeanDocument } from 'mongoose';
import type { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { indexVenues } from 'pages/api/venues';

interface Props {
  venues: LeanDocument<VenueDocument>[] & { id: any };
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const venues = await indexVenues({});

  return {
    props: {
      venues: JSON.parse(
        JSON.stringify(venues),
      ),
    },
  };
};

const ViewVenues: NextPage<Props> = ({ venues }) => (
  <DashboardLayout>
    <table className="table table-hover">
      <thead>
        <th scope="col">Name</th>
        <th scope="col">Managers</th>
        <th scope="col">Status</th>
      </thead>
      <tbody>
        {venues.map((venue) => (
          <Link key={venue._id} href={`/dashboard/venues/${venue._id}`} passHref>
            <tr style={{ cursor: 'pointer' }}>
              <td>{venue.name}</td>
              <td>{venue.managers}</td>
              <td>
                {venue.enabled ? (
                  <span className="text-success">Enabled</span>
                ) : (
                  <span className="text-danger">Disabled</span>
                )}
              </td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
    <Link href="/dashboard/venues/create" passHref>
      <button className="btn btn-outline-primary" type="button">
        + Create new venue
      </button>
    </Link>
  </DashboardLayout>
);

export default ViewVenues;
