import StoryCard from "@/components/StoryCard";
// import { mockStories } from "@/data/mock"; // 预置的名人故事

export default function Page() {
    const mockStories = [{id: '1', title: '邵雍aaaaaaaaaa', bazi: '132', content: '123'}]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 max-w-6xl mx-auto">
      {mockStories.map(story => (
        <StoryCard 
          key={story.id}
          title={story.title}
          bazi={story.bazi}
          content={story.content}
        />
      ))}
    </div>
  )
}