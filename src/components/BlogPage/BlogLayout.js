import BlogLayout from "../../components/blog/BlogLayout";
import Hero from "./components/Hero";
import CategoriesSection from "./components/CategoriesSection";
import RecentArticles from "./components/RecentArticles";
import ContinueExploring from "./components/ContinueExploring";
import TagsCloud from "./components/TagsCloud";
import NewsletterCTA from "./components/NewsletterCTA";

export default function BlogHome() {
  return (
    <BlogLayout>
      <Hero />

      <CategoriesSection />

      <RecentArticles />

      <ContinueExploring title="Continue explorando" />

      <TagsCloud />

      <NewsletterCTA />
    </BlogLayout>
  );
}
