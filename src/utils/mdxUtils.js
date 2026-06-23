import matter from 'gray-matter';

// Utilizamos import.meta.glob com 'raw' para ler o conteúdo textual dos arquivos .md
const mdFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export function getAllPosts() {
  const posts = Object.entries(mdFiles).map(([path, content]) => {
    // O nome do arquivo vira o slug (URL) do post
    const slug = path.split('/').pop().replace('.md', '');

    // Extrai o frontmatter (dados) e o content (corpo) do markdown
    const { data, content: body } = matter(content);

    return {
      slug,
      title: data.title || 'Untitled',
      category: data.category || 'Uncategorized',
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      image: data.image || '',
      body
    };
  });

  // Ordena por data (ISO YYYY-MM-DD) do mais recente para o mais antigo.
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  return posts;
}

export function getPostBySlug(slug) {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}

// Lista única de categorias presentes nos posts.
export function getAllCategories() {
  return [...new Set(getAllPosts().map(p => p.category))];
}

// Lista única de tags presentes nos posts.
export function getAllTags() {
  return [...new Set(getAllPosts().flatMap(p => p.tags))];
}

// Formata uma data ISO (YYYY-MM-DD) para "mês ano" no locale informado.
export function formatPostDate(iso, locale = 'pt-BR') {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(locale, { month: 'short', year: 'numeric' });
}
