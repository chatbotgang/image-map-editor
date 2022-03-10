import { SVGProps } from "react";

export default function Image(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 256 256" {...props}>
      <path
        fill="currentColor"
        d="M232 184V56a16 16 0 0 0-16-16H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16v-16ZM216 56v108.7L187.3 136a16.1 16.1 0 0 0-22.6 0L144 156.7L99.3 112a16.1 16.1 0 0 0-22.6 0L40 148.7V56Zm0 144H40v-28.7l48-48l44.7 44.7a15.9 15.9 0 0 0 22.6 0l20.7-20.7l40 40V200Zm-68.5-91.5a11.9 11.9 0 0 1-3.5-8.5a12 12 0 0 1 24 0a12 12 0 0 1-12 12a12.3 12.3 0 0 1-8.5-3.5Z"
      ></path>
    </svg>
  );
}
