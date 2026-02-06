export function getArticleProgress() {
  const article = document.getElementById("article")
  if (!article) {
    return 0
  }

  const scrollTop = window.scrollY

  const rect = article.getBoundingClientRect()
  const articleTop = scrollTop + rect.top
  const articleHeight = rect.height

  const scrollTotal = articleHeight - window.innerHeight

  if (scrollTotal <= 0) {
    return 100
  }

  const p = ((scrollTop - articleTop) / scrollTotal) * 100

  return Math.min(100, Math.max(0, p))
}
