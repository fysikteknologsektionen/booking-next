import { Prisma } from '@prisma/client';
import DashboardLayout from 'components/DashboardLayout';
import TableCreateButton from 'components/TableCreateButton';
import TableOptionsButton from 'components/TableOptionsButton';
import parseUrlQuery from 'lib/parseUrlQuery';
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { getVenuesWithManagers } from 'services/venue';

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { orderby, order } = parseUrlQuery(query, ['orderby', 'order']);

  const venues = await getVenuesWithManagers(orderByObject);

  return { props: { venues } };
};

const ViewVenues: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ venues }) => {
  const names: Record<keyof typeof venues[number], string> = {
    id: 'Id',
    name: 'Name',
    description: 'Description',
    managers: 'Managers',
    enabled: 'Status',
    createdAt: 'Created',
    updatedAt: 'Updated',
  };

  return (
    <DashboardLayout>
      <table className="table table-sm">
        <thead>
          {Object.entries(names).map(([key, name]) => (
            <th key={key} scope="col">
              {name}
            </th>
          ))}
          <th scope="col" aria-label="Options" />
        </thead>
        <tbody>
          {venues.map((venue) => (
            <tr key={venue.id}>
              <td>{venue.id}</td>
              <td>{venue.name}</td>
              <td style={{ maxWidth: '300px' }}>{venue.description}</td>
              <td>{venue.managers.map((user) => user.email).join(', ')}</td>
              <td>
                {venue.enabled ? (
                  <span className="text-success">Enabled</span>
                ) : (
                  <span className="text-danger">Disabled</span>
                )}
              </td>
              <td>{venue.createdAt.toLocaleDateString()}</td>
              <td>{venue.updatedAt.toLocaleDateString()}</td>
              <td style={{ width: 0 }}>
                <TableOptionsButton
                  resourceId={venue.id}
                  resourceType="venue"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableCreateButton />
    </DashboardLayout>
  );
};

export default ViewVenues;
