import React, { ReactElement } from "react";

interface Props {
  data: any;
}

function PostCard({ data }: Props): ReactElement {
  return (
    <div key={data.created} className="post-card-wrapper">
      <p>{data.title}</p>
      <a href={data.url_overridden_by_dest} target="_blank" rel="noreferrer">
        <img src={data.thumbnail} alt="thumb" />
      </a>
    </div>
  );
}

export default PostCard;
