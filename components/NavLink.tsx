import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  href: string;
  exact?: boolean;
  children: React.ReactNode;
  className: string;
  [key: string]: any;
}

const NavLink: React.VFC<Props> = ({
  href, exact = false, children, className, ...props
}) => {
  const { pathname } = useRouter();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link href={href}>
      {isActive ? (
        <a {...props} className={`${className} active`} aria-current="page">
          {children}
        </a>
      ) : (
        <a {...props} className={className}>
          {children}
        </a>
      )}
    </Link>
  );
};

export default NavLink;
