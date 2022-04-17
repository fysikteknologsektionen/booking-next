import Link from 'next/link';
import { useRouter } from 'next/router';

const TableCreateButton: React.VFC = () => {
  const { pathname } = useRouter();
  return (
    <Link href={`${pathname}/create`} passHref>
      <button className="btn btn-outline-primary" type="button">
        + New
      </button>
    </Link>
  );
};

export default TableCreateButton;
