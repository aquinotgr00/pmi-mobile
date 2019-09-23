import React from 'react'
import CommentAttachment from './CommentAttachment'
import CommentText from './CommentText'

export default function CommentAndAttachment(props) {
  return (
    <>
      { props.attachment && <CommentAttachment attachment={props.attachment} />}
      <CommentText text={props.text} />
    </>
  )
}
