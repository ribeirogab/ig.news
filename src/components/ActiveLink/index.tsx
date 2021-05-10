import { ReactElement, cloneElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({ 
  children, 
  activeClassName, 
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === rest.href ? activeClassName : '';

  console.log('asPath:', asPath);
  console.log('rest.href:', rest.href);

  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}