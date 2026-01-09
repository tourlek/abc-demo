import React from "react";
import { Header } from "./Header";

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
      />

      <section className="mx-auto max-w-[600px] px-5 py-12 font-sans text-foreground">
        <h2 className="mb-4 text-3xl font-bold leading-tight">
          Pages in Storybook
        </h2>
        <p className="mb-4 text-base leading-relaxed">
          We recommend building UIs with a{" "}
          <a
            href="https://componentdriven.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-solid hover:no-underline"
          >
            <strong>component-driven</strong>
          </a>{" "}
          process starting with atomic components and ending with pages.
        </p>
        <p className="mb-4 text-base leading-relaxed">
          Render pages with mock data. This makes it easy to build and review
          page states without needing to navigate to them in your app. Here are
          some handy patterns for managing page data in Storybook:
        </p>
        <ul className="mb-4 list-disc pl-8 text-base leading-relaxed">
          <li className="mb-2">
            Use a higher-level connected component. Storybook helps you compose
            such data from the "args" of child component stories
          </li>
          <li className="mb-2">
            Assemble data in the page component from your services. You can mock
            these services out using Storybook.
          </li>
        </ul>
        <p className="mb-4 text-base leading-relaxed">
          Get a guided tutorial on component-driven development at{" "}
          <a
            href="https://storybook.js.org/tutorials/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-solid hover:no-underline"
          >
            Storybook tutorials
          </a>
          . Read more in the{" "}
          <a
            href="https://storybook.js.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline decoration-solid hover:no-underline"
          >
            docs
          </a>
          .
        </p>
        <div className="mt-10 flex items-start text-sm leading-5">
          <span className="mr-2 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-green-800">
            Tip
          </span>
          Adjust the width of the canvas with the{" "}
          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-1 mt-1 inline-block h-3 w-3 align-text-top"
          >
            <g fill="none" fillRule="evenodd">
              <path
                d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
                id="a"
                fill="#999"
              />
            </g>
          </svg>
          Viewports addon in the toolbar
        </div>
      </section>
    </article>
  );
};
