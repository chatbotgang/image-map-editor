import { SVGProps } from "react";

export default function Eraser(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M216 207.8h-85.7l34.8-34.7l56.6-56.6a24.1 24.1 0 0 0 0-33.9l-45.3-45.3a24 24 0 0 0-33.9 0L85.9 93.9l-56.6 56.6a24 24 0 0 0 0 33.9l37.1 37.1a7.9 7.9 0 0 0 5.7 2.3H216a8 8 0 0 0 0-16ZM153.8 48.6a8.1 8.1 0 0 1 11.3 0l45.2 45.3a7.9 7.9 0 0 1 0 11.3l-50.9 50.9l-56.5-56.6ZM75.4 207.8l-34.8-34.7a8.1 8.1 0 0 1 0-11.3l51-50.9l56.5 56.5l-40.4 40.4Z"
      ></path>
    </svg>
  );
}
