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

  console.log('asPath:', asPath);
  console.log('rest.href :', rest.href );
  console.log('activeClassName:', activeClassName);

  return (
    <Link {...rest}>
      {cloneElement(children, { className })}
    </Link>
  )
}