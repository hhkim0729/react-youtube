import { useLayoutEffect, useRef, useState } from 'react';
import { decode } from 'html-entities';
import { formatDate } from 'utils';

export default function CommentList({ comments }) {
  return (
    <div>
      <h2 className="my-4">댓글 {comments.length}개</h2>
      <ul>
        {comments.map(({ id, snippet }) => (
          <CommentItem key={id} comment={snippet.topLevelComment} />
        ))}
      </ul>
    </div>
  );
}

function CommentItem({ comment }) {
  const formattedText = decode(comment.snippet.textDisplay);
  const textRef = useRef(null);
  const [isTextMore, setIsTextMore] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useLayoutEffect(() => {
    if (
      textRef.current &&
      textRef.current.clientHeight < textRef.current.scrollHeight
    ) {
      setIsTextMore(true);
    }
  }, [textRef]);

  const handleClickShowMoreLess = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };

  return (
    <li className="flex mb-6 gap-4">
      <div className="min-w-[3rem] pt-1">
        <img
          src={comment.snippet.authorProfileImageUrl}
          alt={`${comment.snippet.authorDisplayName} profile`}
          className="rounded-full"
        />
      </div>
      <div>
        <div>
          <span className="text-sm font-semibold inline-block mr-1">
            {comment.snippet.authorDisplayName}
          </span>
          <span className="text-xs text-gray-500">
            {formatDate(comment.snippet.publishedAt)}
          </span>
        </div>
        <p
          className={`leading-5 whitespace-pre-line text-sm comment-text ${
            isHidden ? 'line-clamp-3' : ''
          }`}
          ref={textRef}
          dangerouslySetInnerHTML={{ __html: formattedText }}
        ></p>
        {isTextMore && (
          <button
            className="text-sm text-gray-500 cursor-pointer hover:underline mt-1"
            onClick={handleClickShowMoreLess}
          >
            {isHidden ? '자세히 보기' : '간략히'}
          </button>
        )}
      </div>
    </li>
  );
}
