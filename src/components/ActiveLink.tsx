import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  let isActive = false;
  const { asPath } = useRouter();

  //Raiz
  isActive =
    shouldMatchExactHref && (asPath === rest.href || asPath === rest.as);

  //Paginas Internas
  isActive =
    (!shouldMatchExactHref && asPath.startsWith(String(rest.href))) ||
    asPath.startsWith(String(rest.as));

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </Link>
  );
}
