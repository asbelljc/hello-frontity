import React from "react";
import { connect, styled } from "frontity";
import Link from "@frontity/components/link";

const List = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);

  const Html2React = libraries.html2react.Component;

  return (
    <Items>
      {data.items.map((item) => {
        const post = state.source[item.type][item.id];
        const linkTagRegex = /<a[^>]*>([^<]+)<\/a>/g;

        return (
          <React.Fragment key={item.id}>
            <Link link={post.link}>
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
  & > a {
    display: block;
    margin: 6px 0;
    font-size: 1.2em;
    font-weight: 500;
    color: steelblue;
    text-decoration: none;
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
