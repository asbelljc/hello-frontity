import React from "react";
import { connect, styled, css } from "frontity";
import Link from "@frontity/components/link";

const List = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);

  const Html2React = libraries.html2react.Component;

  return (
    <Items isDestinations={data.isDestinationsArchive}>
      {data.items.map((item, index) => {
        const post = state.source[item.type][item.id];
        // const linkStyle = { "animation-delay": index * 200 + "ms" };

        return (
          <React.Fragment key={item.id}>
            <Link
              link={post.link}
              // Offset 'shimmer' animation according to link index
              css={css`
                animation-delay: ${index * 200}ms;
              `}
            >
              {post.title.rendered}
              <br />
            </Link>
            <Html2React html={post.excerpt.rendered} />
            <span>
              <Link link={post.link}>READ MORE</Link>
            </span>
            {item !== data.items[data.items.length - 1] ? <hr /> : null}
          </React.Fragment>
        );
      })}
      <PrevNextNav>
        {data.previous && (
          <button
            onClick={() => {
              actions.router.set(data.previous);
            }}
          >
            &#171; Prev
          </button>
        )}
        {data.next && (
          <button
            onClick={() => {
              actions.router.set(data.next);
            }}
          >
            Next &#187;
          </button>
        )}
      </PrevNextNav>
    </Items>
  );
};

export default connect(List);

const Items = styled.div`
  @keyframes shimmer {
    0% {
      color: steelblue;
    }
    50% {
      color: salmon;
    }
    100% {
      color: steelblue;
    }
  }

  & > a {
    display: block;
    margin: 6px 0;
    font-size: 1.2em;
    font-weight: 500;
    color: steelblue;
    text-decoration: none;

    ${(props) =>
      props.isDestinations &&
      `
      animation-name: shimmer;
      animation-duration: 3s;
      animation-iteration-count: infinite;
    `}
  }

  hr {
    border: 0;
    height: 1px;
    margin: 20px 0;
    background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.2),
      rgba(0, 0, 0, 0)
    );
  }

  p {
    font-size: 14px;
    font-style: italic;
  }
`;

const PrevNextNav = styled.div`
  padding-top: 1.5em;

  & > button {
    background: #eee;
    text-decoration: none;
    padding: 0.5em 1em;
    color: #888;
    border: 1px solid #aaa;
    font-size: 0.8em;
    margin-right: 2em;
  }

  & > button:hover {
    cursor: pointer;
  }
`;
