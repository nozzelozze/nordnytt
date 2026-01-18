import { getComment, getStory, getTopStories } from "@/services/hn";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import ArticlePageNav from "./articlePageNav";

export default async function Home({ params }: { params: { id: number } }) {
  const story = await getStory(params.id);

  if (!story)
    return notFound();

  const url = story.url ? new URL(story.url) : null;
  const comments = story.kids ? await Promise.all(story.kids?.map(getComment)) : await Promise.resolve([]);


  const id = Number(params.id)
  const top = await getTopStories()
  const ids = top.map(s => s.id)
  const i = ids.indexOf(id)

  const currentIndex = ids.indexOf(id)
  let nextId = null
  let prevId = null
  if (currentIndex > 0) 
  {
    prevId = ids[currentIndex - 1]
  }
  if (currentIndex < ids.length - 1) 
  {
    nextId = ids[currentIndex + 1]
  }

  return (
    <main>
      <ArticlePageNav nextId={nextId} prevId={prevId} />
      <div className="leading-none mb-10">
        <h1 className="block font-bold visited:text-slate-500 text-2xl">{story.title}</h1>
        <div className="text-xs text-slate-700">{url?.host ? `${url?.host} - ` : ''} <Link href={`/${story.id}`}>{story.score} poäng</Link> - <Link href={`/${story.id}`}>{story.descendants || 'Inga'} kommentarer</Link> - {Math.floor(Date.now() / 1000 - story.time)} sekunder sedan</div>
      </div>
      {story.text && <div className="mb-10" dangerouslySetInnerHTML={{ __html: story.text }} />}
      <div className="text-lg font-bold">Kommentarer ({comments.length})</div>
      <ul className="mb-10">
        {comments.map(comment => (
          <li className="mb-10" key={comment?.id}>
            <div className="text-sm text-slate-700 italic">{comment?.by} - {Math.floor(Date.now() / 1000 - comment?.time)} sekunder sedan</div>
            <div dangerouslySetInnerHTML={{ __html: comment?.text || '' }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
