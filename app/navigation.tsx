"use client";

import Link from "next/link";

interface Props {
  onNavigate?: () => void;
}
const Navigation = (props: Props) => {
  const { onNavigate } = props;
  const onClick = () => onNavigate && onNavigate();
  return (
    <nav>
      <div className="navContent">
        <Link href="/" onClick={onClick}>
          21W8Y
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
