'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import AdminLayout from '@/components/AdminLayout';
import { fetchAdminContent, updateAdminContent } from '@/services/adminApi';
import ImageUploadInput from '@/components/ImageUploadInput';

interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  readTime: string;
  publishedDate: string;
  coverImage: string;
  excerpt: string;
  content: string;
  published: boolean;
}

const DEFAULT_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    slug: 'art-of-hydro-distillation',
    title: 'The Alchemy of Deg-Bapka: Hydro-Distillation in Kannauj',
    category: 'Fragrance Rituals',
    author: 'Master Distiller Ram Narain',
    readTime: '6 min read',
    publishedDate: 'October 4, 2026',
    coverImage: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Exploring the 400-year-old copper alembic stills capturing the first rain fragrance on parched earth.',
    content: 'Hydro-distillation remains the soul of traditional Indian attars. Copper cauldrons (Degs) sealed with clay (Bapka) boil floral petals at precise atmospheric pressures...',
    published: true,
  },
  {
    id: 'art-2',
    slug: 'kashmiri-saffron-monograph',
    title: 'Botanical Monograph: Kashmiri Mongra Saffron in High Skincare',
    category: 'Botanical Sourcing',
    author: 'Dr. Ananya Roy, Cosmetic Biochemist',
    readTime: '4 min read',
    publishedDate: 'September 28, 2026',
    coverImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'How crocin and safranal flavonoids restore cellular radiance and counteract oxidative urban stressors.',
    content: 'Hand-picked in Pamposh, Kashmir, Mongra saffron stigmata yield unparalleled antioxidant concentrations. Cold extraction preserves delicate bio-active compounds...',
    published: true,
  },
  {
    id: 'art-3',
    slug: 'layering-attars-parfums',
    title: 'Olfactory Layering: Combining Pure Attars with Eau de Parfum',
    category: 'Olfactory Notes',
    author: 'VĀNYA Scent Atelier',
    readTime: '5 min read',
    publishedDate: 'September 15, 2026',
    coverImage: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'A masterclass in anchoring top citrus notes with concentrated sandalwood and agarwood oil bases.',
    content: 'Attars apply with warmth to pulse points, forming a subtle base layer. Spraying Eau de Parfum over attars elevates sillage while extending longevity to over 14 hours...',
    published: true,
  },
];

function JournalManagerContent() {
  const { showToast } = useAdmin();
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<JournalArticle[]>(DEFAULT_ARTICLES);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>('art-1');
  const [editingArticle, setEditingArticle] = useState<JournalArticle | null>(DEFAULT_ARTICLES[0]);

  useEffect(() => {
    fetchAdminContent().then((res) => {
      if (res.success && Array.isArray(res.data?.journalArticles) && res.data.journalArticles.length > 0) {
        setArticles(res.data.journalArticles);
        setSelectedArticleId(res.data.journalArticles[0].id);
        setEditingArticle(res.data.journalArticles[0]);
      }
      setLoading(false);
    });
  }, []);

  const handleSelectArticle = (art: JournalArticle) => {
    setSelectedArticleId(art.id);
    setEditingArticle({ ...art });
  };

  const handleCreateNew = () => {
    const newArt: JournalArticle = {
      id: `art-${Date.now()}`,
      slug: 'new-journal-entry',
      title: 'Untitled Editorial Entry',
      category: 'Fragrance Rituals',
      author: 'VĀNYA Editorial Team',
      readTime: '3 min read',
      publishedDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      coverImage: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Brief overview of the article entry...',
      content: 'Write editorial article narrative here...',
      published: false,
    };

    setArticles([newArt, ...articles]);
    setSelectedArticleId(newArt.id);
    setEditingArticle(newArt);
    showToast('New article draft created.', 'info');
  };

  const handleDeleteArticle = (id: string) => {
    if (!confirm('Are you sure you want to delete this journal article?')) return;
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    if (selectedArticleId === id) {
      if (updated.length > 0) {
        setSelectedArticleId(updated[0].id);
        setEditingArticle({ ...updated[0] });
      } else {
        setSelectedArticleId(null);
        setEditingArticle(null);
      }
    }
    showToast('Article deleted.', 'info');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    setLoading(true);
    const updatedList = articles.map((a) => (a.id === editingArticle.id ? editingArticle : a));
    setArticles(updatedList);

    const res = await updateAdminContent({ journalArticles: updatedList });
    setLoading(false);

    if (res.success) {
      showToast(`Article "${editingArticle.title}" saved successfully!`, 'success');
    } else {
      showToast(res.message || 'Failed to save article.', 'error');
    }
  };

  return (
    <div className="space-y-space-xl">
      <div className="flex items-center justify-between pb-space-md border-b border-surface-container-high">
        <div>
          <div className="flex items-center gap-2 font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">
            <Link href="/content" className="hover:text-primary">Content</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Journal & Monographs</span>
          </div>
          <h1 className="font-display text-3xl text-primary font-medium">
            VĀNYA Gazette & Journal Editor
          </h1>
        </div>

        <button
          onClick={handleCreateNew}
          className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-4 py-2 hover:bg-tertiary-container transition-colors"
        >
          + NEW ARTICLE DRAFT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
        
        {/* Left: Article Directory List */}
        <div className="lg:col-span-4 bg-surface-container-lowest border border-surface-container-high p-space-md space-y-3 max-h-[750px] overflow-y-auto no-scrollbar">
          <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-2 px-2">
            ARTICLES DIRECTORY ({articles.length})
          </span>

          {articles.map((art) => {
            const isSelected = selectedArticleId === art.id;
            return (
              <div
                key={art.id}
                onClick={() => handleSelectArticle(art)}
                className={`p-3 border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-primary bg-surface-container-low shadow-sm'
                    : 'border-surface-container-high bg-surface-container-lowest hover:border-outline-variant'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-label-caps text-[0.625rem] uppercase tracking-wider text-secondary font-semibold">
                    {art.category}
                  </span>
                  <span
                    className={`font-label-caps text-[0.55rem] uppercase tracking-wider px-1.5 py-0.5 border ${
                      art.published
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {art.published ? 'Published' : 'Draft'}
                  </span>
                </div>

                <h3 className="font-display text-sm text-primary font-medium line-clamp-1 mb-1">
                  {art.title}
                </h3>
                <p className="font-body text-xs text-on-surface-variant line-clamp-2 mb-2">
                  {art.excerpt}
                </p>

                <div className="flex items-center justify-between text-[0.65rem] text-on-surface-variant font-mono border-t border-surface-container-high pt-1.5">
                  <span>{art.publishedDate}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteArticle(art.id);
                    }}
                    className="text-error hover:underline font-label-caps text-[0.6rem] uppercase tracking-wider"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Article Form & Live Preview */}
        <div className="lg:col-span-8">
          {editingArticle ? (
            <form onSubmit={handleSave} className="space-y-space-xl">
              <div className="bg-surface-container-lowest p-space-xl border border-surface-container-high space-y-space-md">
                <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
                  <h2 className="font-display text-xl text-primary font-medium">
                    Edit Article
                  </h2>
                  <label className="flex items-center gap-2 cursor-pointer font-label-caps text-xs uppercase tracking-wider text-primary">
                    <input
                      type="checkbox"
                      checked={editingArticle.published}
                      onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.checked })}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>Article Published</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="md:col-span-2">
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                      Article Headline / Title
                    </label>
                    <input
                      type="text"
                      value={editingArticle.title}
                      onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-display text-sm text-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={editingArticle.slug}
                      onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-mono text-xs text-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                      Category
                    </label>
                    <select
                      value={editingArticle.category}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
                    >
                      <option value="Fragrance Rituals">Fragrance Rituals</option>
                      <option value="Botanical Sourcing">Botanical Sourcing</option>
                      <option value="Olfactory Notes">Olfactory Notes</option>
                      <option value="Skincare Monographs">Skincare Monographs</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                      Author Name & Title
                    </label>
                    <input
                      type="text"
                      value={editingArticle.author}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                      Read Time (e.g. 5 min read)
                    </label>
                    <input
                      type="text"
                      value={editingArticle.readTime}
                      onChange={(e) => setEditingArticle({ ...editingArticle, readTime: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high px-3 py-2 font-body text-xs text-primary focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <ImageUploadInput
                      label="Cover Image"
                      value={editingArticle.coverImage || ''}
                      onChange={(url) => setEditingArticle({ ...editingArticle, coverImage: url })}
                      placeholder="Paste cover image URL or click Upload Image..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                      Summary Excerpt
                    </label>
                    <textarea
                      rows={2}
                      value={editingArticle.excerpt}
                      onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-3 font-body text-xs text-primary focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-label-caps text-[0.6875rem] uppercase tracking-wider text-primary font-semibold block mb-1">
                      Full Article Body Content
                    </label>
                    <textarea
                      rows={6}
                      value={editingArticle.content}
                      onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                      className="w-full bg-surface-container-low border border-surface-container-high p-3 font-editorial-serif text-xs text-primary leading-relaxed focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="bg-surface-container-low p-space-xl border border-surface-container-high">
                <span className="font-label-caps text-xs uppercase tracking-[0.2em] text-secondary font-bold block mb-3">
                  GAZETTE ARTICLE STOREFRONT PREVIEW
                </span>
                <div className="bg-surface border border-surface-container-high p-6 space-y-4 max-w-xl mx-auto">
                  {editingArticle.coverImage && (
                    <img
                      src={editingArticle.coverImage}
                      alt={editingArticle.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-3 font-label-caps text-[0.625rem] text-secondary uppercase tracking-widest mb-1">
                      <span>{editingArticle.category}</span>
                      <span>•</span>
                      <span>{editingArticle.readTime}</span>
                    </div>
                    <h3 className="font-display text-2xl text-primary font-medium mb-2">
                      {editingArticle.title}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-[0.65rem] text-on-surface-variant mb-4 pb-2 border-b border-surface-container-high">
                      <span>By {editingArticle.author}</span>
                      <span>—</span>
                      <span>{editingArticle.publishedDate}</span>
                    </div>
                    <p className="font-editorial-serif text-xs text-on-surface-variant leading-relaxed">
                      {editingArticle.content}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-space-md border-t border-surface-container-high">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-on-primary font-label-caps text-xs uppercase tracking-[0.2em] px-space-2xl py-3 hover:bg-tertiary-container transition-colors disabled:opacity-50"
                >
                  SAVE JOURNAL ARTICLE
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-surface-container-lowest p-space-2xl border border-surface-container-high text-center">
              <p className="font-editorial-serif text-sm text-on-surface-variant">Select an article from the directory or create a new draft.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function AdminJournalManagerPage() {
  return (
    <AdminProvider>
      <AdminLayout>
        <JournalManagerContent />
      </AdminLayout>
    </AdminProvider>
  );
}
