import { ReactElement, cloneElement, useMemo } from 'react';
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

  const className = useMemo(() => 
    asPath === rest.href ? activeClassName : '', 
    [asPath, rest, activeClassName]
  );

  if (asPath !== '/posts') {
    console.log('asPath:', asPath);
    console.log('rest.href:', rest.href);
    console.log('activeClassName:', activeClassName);
    console.log('asPath === rest.href', asPath === rest.href);
  }

  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}